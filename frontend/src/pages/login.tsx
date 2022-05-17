import { FC, ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NormalLayout } from '@/components/layout/NormalLayout';
import { useLogin } from '@/hooks/useLogin';
import { LoginForm, LoginFormDataType } from '@/components/LoginForm';
import { usePageError } from '@/hooks/usePageError';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { login, loginError } = useLogin();
  const { setPageError, resetPageError } = usePageError();

  const loginButtonClicked = async (formData: LoginFormDataType) => {
    resetPageError();
    const isLoggedIn = await login(formData);
    if (isLoggedIn) {
      await router.push('/mypage/');
    }
  };

  useEffect(() => {
    if (loginError) {
      setPageError(loginError);
    }
  }, [loginError, setPageError]);

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded my-8">
          <div className="bg-gray-200 pt-8 pb-16">
            <div className="text-2xl text-center text-gray-600 mb-6">ログイン</div>
            <LoginForm onSubmit={loginButtonClicked} />
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
