import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { NormalLayout } from '@/components/layout/NormalLayout';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import {
  useDistributesNewInputPageQuery,
  // useCreateCompanyAndAdminUserMutation,
} from '@/generated/graphql';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { useFlash } from '@/hooks/useFlash';
import { usePageError } from '@/hooks/usePageError';
import userLoginRequired from '@/hoc/userLoginRequired';
import {
  DistributePointForm,
  DistributePointFormDataType,
} from '@/components/distribute-points/DistributePointForm';
import { PageLoading } from '@/components/PageLoading';

gql`
  query DistributesNewInputPage {
    accounts {
      ...DistributePointFormData
    }
  }

  # mutation CreateCompanyAndAdminUser($input: CreateCompanyAndAdminUserInput!) {
  #   createCompanyAndAdminUser(input: $input) {
  #     adminUser {
  #       email
  #       password
  #     }
  #   }
  # }
`;

// TODO: 会社からユーザーへポイントを配布する機能を作成する！

const DistributesNewInputPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError, resetPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();

  const { data, loading } = useDistributesNewInputPageQuery({
    fetchPolicy: 'network-only',
    onError: setPageFatalError,
  });

  // const [createCompanyAndAdminUser, { loading: createLoading, error }] =
  //   useCreateCompanyAndAdminUserMutation({
  //     onCompleted: async (res) => {
  //       if (!res?.createCompanyAndAdminUser) return;
  //       const { email } = res.createCompanyAndAdminUser.adminUser; // ここで返されるpasswordはエンコードされたpassword
  //       const isLoggedIn = await login({ email, password: 'poppie1234' });
  //       if (isLoggedIn) {
  //         await router.push('/mypage/');
  //         setFlash('会社情報を登録しました。');
  //       }
  //     },
  //     onError: setPageError,
  //   });

  const onSubmit = (formData: DistributePointFormDataType) => {
    //   void createCompanyAndAdminUser({
    //     variables: {
    //       input: {
    //         planId: formData.planId,
    //         name: formData.name,
    //         email: formData.email,
    //         tel: formData.tel,
    //       },
    //     },
    //   });
  };

  if (data) {
    debugger;
  }

  return (
    <PageContainerWithError>
      <div className="grid grid-cols-12 selection:place-items-center min-h-screen-except-header">
        <h2>ポイント配布</h2>
        {loading && <PageLoading />}
        {!loading && data && (
          <DistributePointForm accounts={data.accounts} onSubmit={onSubmit} />
        )}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(DistributesNewInputPage);
