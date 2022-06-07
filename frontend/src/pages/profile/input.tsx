import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import {
  useProfileInputPageQuery,
  useGenerateS3PresignedUrlMutation,
  useUpdateProfileMutation,
} from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
import { ProfileForm, ProfileFormDataType } from '@/components/profiles/ProfileForm';
import { AuthContext } from '@/providers/AuthProvider';
import { scrollTop } from '@/utils/scroll';

import userLoginRequired from '@/hoc/userLoginRequired';

gql`
  query ProfileInputPage($userId: ID!) {
    profile(userId: $userId) {
      ...ProfileData
    }
  }

  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      clientMutationId
    }
  }

  mutation GenerateS3PresignedUrl($input: GenerateS3PresignedUrlInput!) {
    generateS3PresignedUrl(input: $input) {
      presignedUrl
    }
  }
`;

const ProfileInputPage: FC = () => {
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);

  const { data, loading } = useProfileInputPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      userId: currentUser?.id,
    },
    onError: setPageFatalError,
  });

  const [generateS3PresignedUrl, { loading: generateUrlLoading }] =
    useGenerateS3PresignedUrlMutation({
      onError: setPageFatalError,
    });

  const [updateProfile, { loading: updateLoading }] = useUpdateProfileMutation({
    onCompleted: () => {
      setFlash('プロフィールを保存しました。');
      scrollTop();
    },
    onError: setPageFatalError,
  });

  const saveOneImage = async (presignedUrl: string, image: File) => {
    await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': image.type },
      body: image,
    });
  };

  const onSubmit = async (formData: ProfileFormDataType) => {
    let presignedUrl: string | undefined;
    let key: string | undefined;

    try {
      // 画像ファイルが選択されている場合、presignedUrlを発行して、画像をS3に保存する
      if (formData.image) {
        key = formData.image?.name
          ? `profile/${data?.profile?.id}-${formData.image?.name}`
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

      await updateProfile({
        variables: {
          input: {
            userId: currentUser?.id,
            name: formData.name,
            department: formData.department,
            comment: formData.comment,
            imageKey: key,
          },
        },
      });
    } catch (e) {
      console.error(e);
      alert('画像アップロード失敗！');
    }
  };

  const mutationLoading = generateUrlLoading || updateLoading;

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        {!loading && data && (
          <ProfileForm
            onSubmit={onSubmit}
            profile={data.profile}
            loading={mutationLoading}
          />
        )}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ProfileInputPage);
