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
      <div className="grid grid-cols-10 bg-green-50 py-9 mx-auto">
        <div className="hidden lg:block lg:col-span-1 2xl:col-span-2"></div>
        <div className=" mx-auto text-center sm:text-left sm:ml-8 lg:ml-0 col-span-10 sm:col-span-5 lg:col-span-4 2xl:col-span-3 my-8 sm:my-20 lg:my-40">
          <div className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
            <h2>その「ありがとう」の気持ち、</h2>
            <h2>ポイントを使って伝えよう</h2>
          </div>
          <div className="text-xs md:text-sm font-bold mb-6">
            <p>poppieはオリジナルのポイントを発行して配布ができる</p>
            <p>ポイント交換サービスです</p>
          </div>

          <div className="w-8/12 mx-auto my-7 sm:hidden">
            <img
              src="/images/top_images/top_image_cut_out.png"
              width="w-full"
              alt="top-image"
              className="mx-auto"
            />
          </div>

          <button
            type="button"
            className="px-12 text-white bg-green-600 rounded-full hover:opacity-50 focus:ring-4 focus:ring-green-300 font-bold text-sm py-2.5 text-center md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <Link href="/companies/new/input/">poppieをはじめる</Link>
          </button>
        </div>

        <div className="hidden sm:block col-span-5 xlg:col-span-4 2xl:col-span-3">
          <img
            src="/images/top_images/top_image.png"
            width="550px"
            alt="top-image"
            className="mx-auto"
          />
        </div>
        <div className="hidden lg:block lg:col-span-1 2xl:col-span-2"></div>
      </div>

      <div className="grid grid-cols-6 bg-gray-100 pt-6 pb-16">
        <div className="hidden lg:block col-span-1"></div>
        <div className="col-span-6 mx-6 lg:mx-0 lg:col-span-4">
          <h3 className="font-bold text-3xl md:text-4xl my-6 sm:mt-8 sm:mb-14 text-center">
            poppieの特徴
          </h3>

          <div className="grid grid-cols-2 mb-12 sm:mb-4">
            <div className="col-span-2 sm:col-span-1">
              <img
                src="/images/top_images/money_transfer.png"
                alt="money_transfer"
                className="mx-auto w-7/12 sm:w-9/12 md:w-8/12 xl:w-6/12"
              />
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <div>
                <h4 className="font-bold text-xl sm:text-2xl my-4 text-center">
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

          <div className="grid grid-cols-2 mb-8 sm:mb-4">
            <div className="flex items-center justify-center col-span-2 sm:col-span-1 order-last sm:order-first">
              <div>
                <h4 className="font-bold text-xl sm:text-2xl my-4 text-center">
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
            <div className="col-span-2 sm:col-span-1">
              <img
                src="/images/top_images/online_shopping.png"
                alt="money_transfer"
                className="mx-auto w-7/12 sm:w-9/12 md:w-8/12 xl:w-6/12"
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <img
                src="/images/top_images/user_group.png"
                alt="money_transfer"
                className="mx-auto w-7/12 sm:w-9/12 md:w-8/12 xl:w-6/12"
              />
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <div>
                <h4 className="font-bold text-xl sm:text-2xl mb-4 mt-0 sm:my-4 text-center">
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
        <div className="hidden lg:block col-span-1"></div>
      </div>

      <Footer />
    </PageContainerWithError>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
