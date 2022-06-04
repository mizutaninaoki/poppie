import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import {
  useCreateOrUpdateOwnItemsMutation,
  useItemsPageQuery,
} from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
// import { ItemCardWithSelectQuantity } from '@/components/items/ItemCardWithSelectQuantity';
import { ItemListExchangeForm } from '@/components/items/ItemListExchangeForm';
import { AuthContext } from '@/providers/AuthProvider';
import { PageLoading } from '@/components/PageLoading';

import userLoginRequired from '@/hoc/userLoginRequired';
import { useRouter } from 'next/router';

import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';

gql`
  query ExchangesIndexPage($companyId: ID!) {
    items(companyId: $companyId) {
      ...ItemDataForItemCard
    }
  }

  mutation CreateOrUpdateOwnItems($input: CreateOrUpdateOwnItemsInput!) {
    createOrUpdateOwnItems(input: $input) {
      clientMutationId
    }
  }
`;

/**
 * 景品一覧画面
 */
const ExchangesIndexPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);

  const { data, loading, error } = useItemsPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      companyId: currentUser.company.id,
    },
    onError: setPageFatalError,
  });

  const [createOrUpdateOwnItems, { loading: createLoading }] =
    useCreateOrUpdateOwnItemsMutation({
      onCompleted: async () => {
        await router.push('/items/');
        setFlash('景品の交換予約が完了しました。');
      },
      onError: setPageFatalError,
    });

  const onSubmit = (listFormData: ItemListFormDataType[]) => {
    void createOrUpdateOwnItems({
      variables: {
        input: {
          // quantityに交換する数量が入力されている景品のみサーバー側に送る
          exchangeItems: listFormData.filter((formData) => formData.quantity > 0),
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center">
        <h1>景品一覧</h1>
        {loading && <PageLoading />}
        {!loading && data && (
          <ItemListExchangeForm items={data.items} onSubmit={onSubmit} />
        )}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ExchangesIndexPage);
