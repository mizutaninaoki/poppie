import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useCreateItemMutation } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
import { ItemForm, ItemFormDataType } from '@/components/items/ItemForm';
import { AuthContext } from '@/providers/AuthProvider';

import userLoginRequired from '@/hoc/userLoginRequired';
import { useRouter } from 'next/router';

gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      clientMutationId
    }
  }
`;

const ItemsNewInputPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);

  const [createItem, { loading: createLoading }] = useCreateItemMutation({
    onCompleted: async () => {
      await router.push('/items/');
      setFlash('景品を登録しました。');
    },
    onError: setPageFatalError,
  });

  const onSubmit = (formData: ItemFormDataType) => {
    void createItem({
      variables: {
        input: {
          companyId: currentUser.company.id,
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
        <h1>景品登録</h1>
        <ItemForm onSubmit={onSubmit} />
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ItemsNewInputPage);
