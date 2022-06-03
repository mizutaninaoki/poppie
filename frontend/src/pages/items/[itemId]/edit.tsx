import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useItemsEditPageQuery, useUpdateItemMutation } from '@/generated/graphql';
import { PageLoading } from '@/components/PageLoading';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
import { ItemForm, ItemFormDataType } from '@/components/items/ItemForm';

import userLoginRequired from '@/hoc/userLoginRequired';
import { useRouter } from 'next/router';

gql`
  query ItemsEditPage($itemId: ID!) {
    item(itemId: $itemId) {
      ...ItemDataForItemForm
    }
  }

  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      clientMutationId
    }
  }
`;

const ItemEditPage: FC = () => {
  const router = useRouter();
  const { itemId } = router.query as { itemId: string };
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();

  const { data, loading, error } = useItemsEditPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      itemId,
    },
    onError: setPageFatalError,
  });

  const [updateItem, { loading: createLoading }] = useUpdateItemMutation({
    onCompleted: async () => {
      await router.push('/items/');
      setFlash('景品情報を更新しました。');
    },
    onError: setPageFatalError,
  });

  const onSubmit = (formData: ItemFormDataType) => {
    void updateItem({
      variables: {
        input: {
          id: itemId,
          name: formData.name,
          unit: formData.unit,
          exchangablePoint: formData.exchangablePoint,
          quantity: formData.quantity,
          // image: formData.image,
          status: formData.status,
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center">
        <h1>景品編集</h1>
        {loading && <PageLoading />}
        {!loading && data && <ItemForm item={data.item} onSubmit={onSubmit} />}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ItemEditPage);
