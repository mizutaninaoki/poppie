import { FC } from 'react';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';

const RegistrationCompletePage: FC = () => {
  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded my-8">
          <div className="bg-gray-200 pt-8 pb-16">
            <div className="text-2xl text-center text-gray-600 mb-6">
              入力したメールアドレスに確認メールを送信しました。アドレスを有効化してください。
            </div>
            <Link href="/">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                トップへ戻る
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default RegistrationCompletePage;
