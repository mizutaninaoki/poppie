import { useContext } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useCreatePurchasePointMutation } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageError } from '@/hooks/usePageError';
import { PurchasePointForm } from '@/components/purchase-points/PurchasePointForm';
import userLoginRequired from '@/hoc/userLoginRequired';
import { AuthContext } from '@/providers/AuthProvider';

gql`
  mutation CreatePurchasePoint($input: CreatePurchasePointInput!) {
    createPurchasePoint(input: $input) {
      clientMutationId
    }
  }
`;

const PurchasesNewInputPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { currentUser } = useContext(AuthContext);

  const [createPurchasePoint, { loading: createLoading, error }] =
    useCreatePurchasePointMutation({
      onCompleted: async () => {
        await router.push('/mypage/');
        setFlash('ポイントを購入しました。');
      },
      onError: setPageError,
    });

  const onSubmit = (totalPoint: number, totalPrice: number) => {
    void createPurchasePoint({
      variables: {
        input: {
          companyId: currentUser.company.id,
          point: totalPoint,
          price: totalPrice,
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="grid selection:place-items-center min-h-screen-except-header">
        <h2>ポイント購入</h2>
        <PurchasePointForm onSubmit={onSubmit} />
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(PurchasesNewInputPage);
