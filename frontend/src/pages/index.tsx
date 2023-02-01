import { FC, ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { Footer } from '@/components/Footer';

import { NormalLayout } from '@/components/layout/NormalLayout';
import { AuthContext } from '@/providers/AuthProvider';

const IndexPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if (currentUser.isLoggedIn) {
    void router.push('/mypage/');
  }

  return (
    <PageContainerWithError topPage>
      <div className="min-h-screen-except-header">
        <div className="grid grid-cols-10 bg-green-50 py-9 mx-auto">
          <div className="col-span-2"></div>
          <div className="col-span-3 my-40">
            <div className="font-bold text-4xl mb-4">
              <h2>その「ありがとう」の気持ち、</h2>
              <h2>ポイントを使って伝えよう</h2>
            </div>
            <div className="text-sm font-bold mb-6">
              <p>poppieはオリジナルのポイントを発行して配布ができる</p>
              <p>ポイント交換サービスです</p>
            </div>

            <button
              type="button"
              className="px-12 text-white bg-green-600 rounded-full hover:opacity-50 focus:ring-4 focus:ring-green-300 font-bold text-sm py-2.5 text-center md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <Link href="/companies/new/input/">poppieをはじめる</Link>
            </button>
          </div>

          <div className="col-span-3">
            <img
              src="/images/top_images/top_image.png"
              width="550px"
              alt="top-image"
              className="mx-auto"
            />
          </div>
          <div className="col-span-2"></div>
        </div>

        <div className="container mx-auto"></div>
        <div className="grid grid-cols-6 bg-gray-100 pt-6 pb-16">
          <div className="col-span-1"></div>
          <div className="col-span-4">
            <h3 className="font-bold text-4xl mt-8 mb-14 text-center">poppieの特徴</h3>

            <div className="grid grid-cols-2 mb-4">
              <div>
                <img
                  src="/images/top_images/money_transfer.png"
                  width="270px"
                  alt="money_transfer"
                  className="mx-auto"
                />
              </div>
              <div className="flex items-center justify-center">
                <div>
                  <h4 className="font-bold text-2xl my-4 text-center">
                    ① オリジナルのポイントを発行・配布できる
                  </h4>
                  <p className="text-sm font-bold">
                    オリジナルのポイントを発行して、他のユーザーにポイントをあげることができます。
                  </p>
                  <p className="text-sm font-bold">
                    感謝の気持ちをポイントで伝えましょう。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mb-4">
              <div className="flex items-center justify-center">
                <div>
                  <h4 className="font-bold text-2xl my-4 text-center">
                    ② 受け取ったポイントは景品と交換できる
                  </h4>
                  <p className="text-sm font-bold">
                    他のユーザーからもらったポイントは景品と交換することができる。
                  </p>
                  <p className="text-sm font-bold">
                    ポイントで景品をたくさんゲットしましょう。
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="/images/top_images/online_shopping.png"
                  width="270px"
                  alt="money_transfer"
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <img
                  src="/images/top_images/user_group.png"
                  width="270px"
                  alt="money_transfer"
                  className="mx-auto"
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="mx-auto">
                  <h4 className="font-bold text-2xl my-4 text-center">
                    ③ グループ単位で管理することができる
                  </h4>
                  <p className="text-sm font-bold">
                    会社や学校など、グループ単位で管理者ユーザーがポイントの発行景品登録等を行うことができます。
                  </p>
                  <p className="text-sm font-bold">
                    管理者ユーザーはどのユーザーがポイントを多く貰っているかなど、交換履歴を通じてユーザーを分析することができます。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>

        <Footer />
      </div>
    </PageContainerWithError>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
