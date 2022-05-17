import { FC, useContext } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { SignUpForm, SignUpFormDataType } from '@/components/SignUpForm';
import { gql } from '@apollo/client';
import { useCreateUserMutation } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { usePageError } from '@/hooks/usePageError';
import { AuthContext } from '@/providers/AuthProvider';
import { useFlash } from '@/hooks/useFlash';
import userLoginRequired from '@/hoc/userLoginRequired';

gql`
  # registerではバックエンドで関連テーブルのProfileとAccountが作成されないため、
  # GraphQL-Authを使わずCreateUserというmutationを作成している
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        name
        email
      }
    }
  }
`;

const SettingUserRegisterPage: NextPageWithLayout = () => {
  const { pageError, setPageError, resetPageError } = usePageError();
  const { setFlash } = useFlash();
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [createUser, { loading: createUserloading }] = useCreateUserMutation({
    onCompleted: async () => {
      await router.push('/settings/users/');
      setFlash('新しいユーザーを登録しました');
    },
    onError: setPageError,
  });

  const signUp = (formData: SignUpFormDataType) => {
    resetPageError();
    // 確認用パスワードはユーザーに入力させないため、password1の値をそのまま使用する
    void createUser({
      variables: {
        input: {
          companyId: currentUser.company.id,
          name: formData.name,
          email: formData.email,
          password1: formData.password1,
          password2: formData.password1,
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded my-8">
          <div className="bg-gray-200 pt-8 pb-16">
            <div className="text-2xl text-center text-gray-600 mb-6">
              新規ユーザー登録
            </div>
            <SignUpForm onSubmit={signUp} createUserloading={createUserloading} />
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(SettingUserRegisterPage);
