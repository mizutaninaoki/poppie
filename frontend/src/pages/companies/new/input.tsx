import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { NormalLayout } from '@/components/layout/NormalLayout';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import {
  useCompaniesNewInputInputPageQuery,
  useCreateCompanyAndAdminUserMutation,
} from '@/generated/graphql';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { useFlash } from '@/hooks/useFlash';
import { usePageError } from '@/hooks/usePageError';
import { CompanyForm, CompanyFormDataType } from '@/components/companies/CompanyForm';
import { useLogin } from '@/hooks/useLogin';

gql`
  query CompaniesNewInputInputPage {
    plans {
      ...PlanForCompanyForm
    }
  }

  mutation CreateCompanyAndAdminUser($input: CreateCompanyAndAdminUserInput!) {
    createCompanyAndAdminUser(input: $input) {
      adminUser {
        email
        password
      }
    }
  }
`;

const CompaniesNewInputPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError, resetPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { login, loginError } = useLogin();

  const { data, loading } = useCompaniesNewInputInputPageQuery({
    fetchPolicy: 'network-only',
    onError: setPageFatalError,
  });

  const [createCompanyAndAdminUser, { loading: createLoading, error }] =
    useCreateCompanyAndAdminUserMutation({
      onCompleted: async (res) => {
        if (!res?.createCompanyAndAdminUser) return;
        const { email } = res.createCompanyAndAdminUser.adminUser; // ここで返されるpasswordはエンコードされたpassword
        const isLoggedIn = await login({ email, password: 'poppie1234' });
        if (isLoggedIn) {
          await router.push('/mypage/');
          setFlash('会社情報を登録しました。');
        }
      },
      onError: setPageError,
    });

  const onSubmit = (formData: CompanyFormDataType) => {
    void createCompanyAndAdminUser({
      variables: {
        input: {
          planId: formData.planId,
          name: formData.name,
          email: formData.email,
          tel: formData.tel,
        },
      },
    });
  };

  useEffect(() => {
    if (loginError) {
      setPageError(loginError);
    }
  }, [loginError, setPageError]);

  return (
    <PageContainerWithError>
      <div className="grid grid-cols-12 mt-14 selection:place-items-center min-h-screen-except-header">
        {!loading && data?.plans && (
          <CompanyForm plans={data.plans} onSubmit={onSubmit} />
        )}
      </div>
    </PageContainerWithError>
  );
};

export default CompaniesNewInputPage;

CompaniesNewInputPage.getLayout = function getLayout(page: ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
