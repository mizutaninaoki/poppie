import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { PageLoading } from '@/components/PageLoading';
import { gql } from '@apollo/client';
import { useVerifyAccountMutation } from '@/generated/graphql';
import router from 'next/router';
import { usePageError } from '@/hooks/usePageError';
import { useLogin } from '@/hooks/useLogin';
import { PageContentError } from '@/components/PageContentError';

gql`
  mutation VerifyAccount($input: VerifyAccountInput!) {
    verifyAccount(input: $input) {
      success
      errors
    }
  }
`;

const ActivatePage: FC = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const { pageError, setPageError, resetPageError } = usePageError();

  const [verifyAccount, { loading: verifyAccountLoading, error: verifyAccountError }] =
    useVerifyAccountMutation();

  const verifyAccountFn = async () => {
    const res = await verifyAccount({
      variables: {
        input: {
          token,
        },
      },
    });
  };

  useEffect(() => {
    if (!token) return;
    verifyAccountFn();
  }, [token]);

  if (verifyAccountLoading) {
    return <div>loading...</div>;
  }

  if (verifyAccountError) {
    return <PageContentError error={{ message: verifyAccountError.message }} />;
  }

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded my-8">
          <div className="bg-gray-200 pt-8 pb-16">
            <div className="text-2xl text-center text-gray-600 mb-6">
              アカウントが有効化されました
            </div>
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default ActivatePage;
