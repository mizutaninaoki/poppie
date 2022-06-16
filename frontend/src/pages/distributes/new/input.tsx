import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import {
  useDistributesNewInputPageQuery,
  useCreateDistributesMutation,
} from '@/generated/graphql';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { useFlash } from '@/hooks/useFlash';
import { usePageError } from '@/hooks/usePageError';
import userLoginRequired from '@/hoc/userLoginRequired';
import {
  DistributeForm,
  DistributeFormDataType,
} from '@/components/distributes/DistributeForm';
import { PageLoading } from '@/components/PageLoading';
import { useCompany } from '@/hooks/useCompany';

gql`
  query DistributesNewInputPage {
    accounts {
      ...DistributeFormData
    }
  }

  mutation CreateDistributes($input: CreateDistributesInput!) {
    createDistributes(input: $input) {
      distributeLog {
        id
        company {
          id
          point
        }
      }
    }
  }
`;

const DistributesNewInputPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { updateCompanyPoint } = useCompany();

  const { data, loading } = useDistributesNewInputPageQuery({
    fetchPolicy: 'network-only',
    onError: setPageFatalError,
  });

  const [createDistributes, { loading: createLoading, error }] =
    useCreateDistributesMutation({
      onCompleted: async (res) => {
        if (!res.createDistributes) return;
        updateCompanyPoint(res.createDistributes.distributeLog.company.point);
        await router.push('/mypage/');
        setFlash('ポイントを配布しました。');
      },
      onError: setPageError,
    });

  const onSubmit = (formDatas: DistributeFormDataType) => {
    void createDistributes({
      variables: {
        input: {
          attributes: formDatas.map((formData) => {
            return {
              accountId: formData.accountId,
              distributePoint: formData.distributePoint,
            };
          }),
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="selection:place-items-center min-h-screen-except-header">
        <h2>ポイント配布</h2>
        {loading && <PageLoading />}
        {!loading && data && (
          <DistributeForm accounts={data.accounts} onSubmit={onSubmit} />
        )}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(DistributesNewInputPage);
