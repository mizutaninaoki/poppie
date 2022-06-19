import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import {
  useCreateItemMutation,
  useGenerateS3PresignedUrlMutation,
} from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { ItemForm, ItemFormDataType } from '@/components/items/ItemForm';
import { AuthContext } from '@/providers/AuthProvider';
import { v4 as uuidv4 } from 'uuid';

import userLoginRequired from '@/hoc/userLoginRequired';
import { useRouter } from 'next/router';

// NOTE: GenerateS3PresignedUrlはProfileのinput.tsxに定義している
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
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);

  const [createItem, { loading: createLoading }] = useCreateItemMutation({
    onCompleted: async () => {
      await router.push('/items/');
      setFlash('景品を登録しました。');
    },
    onError: setPageFatalError,
  });

  const [generateS3PresignedUrl, { loading: generateUrlLoading }] =
    useGenerateS3PresignedUrlMutation({
      onError: setPageFatalError,
    });

  const saveOneImage = async (presignedUrl: string, image: File) => {
    await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': image.type },
      body: image,
    });
  };

  const onSubmit = async (formData: ItemFormDataType) => {
    let presignedUrl: string | undefined;
    let key: string | undefined;

    try {
      // 画像ファイルが選択されている場合、presignedUrlを発行して、画像をS3に保存する
      if (formData.image) {
        key = formData.image?.name
          ? `item/${uuidv4()}-${formData.image?.name}`
          : formData.imageKey;

        const res = await generateS3PresignedUrl({
          variables: {
            input: {
              imageKey: key as string,
            },
          },
        });

        presignedUrl = res.data?.generateS3PresignedUrl?.presignedUrl;
        if (!presignedUrl) throw new Error('PresignedUrl発行エラー');
        await saveOneImage(presignedUrl, formData.image);
      }

      await createItem({
        variables: {
          input: {
            companyId: currentUser.company.id,
            name: formData.name,
            unit: formData.unit,
            exchangablePoint: formData.exchangablePoint,
            quantity: formData.quantity,
            status: formData.status,
            imageKey: key,
          },
        },
      });
    } catch (e) {
      console.error(e);
      alert('画像アップロード失敗！');
    }
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
