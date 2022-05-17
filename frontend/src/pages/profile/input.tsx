import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useProfileInputPageQuery, useUpdateProfileMutation } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
import { ProfileForm, ProfileFormDataType } from '@/components/profiles/ProfileForm';
import { AuthContext } from '@/providers/AuthProvider';

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
`;

const ProfileInputPage: FC = () => {
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();

  const { currentUser } = useContext(AuthContext);

  const { data, loading, error } = useProfileInputPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      userId: currentUser?.id,
    },
    onError: setPageFatalError,
  });

  const [updateProfile, { loading: updateLoading }] = useUpdateProfileMutation({
    onCompleted: () => {
      setFlash('プロフィールを保存しました。');
    },
    onError: setPageFatalError,
  });

  const onSubmit = (formData: ProfileFormDataType) => {
    void updateProfile({
      variables: {
        input: {
          userId: currentUser?.id,
          name: formData.name,
          department: formData.department,
          comment: formData.comment,
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        {!loading && data && <ProfileForm onSubmit={onSubmit} profile={data.profile} />}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ProfileInputPage);
