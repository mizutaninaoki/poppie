import { FC } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useCreateDealingMutation } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageError } from '@/hooks/usePageError';
import { useTmpDealingCreateData, clearSession } from '@/utils/storage';
import userLoginRequired from '@/hoc/userLoginRequired';
import { PageContentError } from '@/components/PageContentError';
import { PageLoading } from '@/components/PageLoading';

gql`
  mutation CreateDealing($input: CreateDealingInput!) {
    createDealing(input: $input) {
      clientMutationId
    }
  }
`;

const DealingsNewConfirmPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { data: tmpDealingCreateData } = useTmpDealingCreateData();

  const [createDealing, { loading: createLoading }] = useCreateDealingMutation({
    onCompleted: async () => {
      clearSession();
      await router.push('/mypage/');
      setFlash('ポイントを贈りました。');
    },
    onError: setPageError,
  });

  if (!tmpDealingCreateData) {
    return (
      <PageContentError
        error={{ message: 'エラーが発生しました。取引情報がありません。' }}
      />
    );
  }

  const onSubmit = () => {
    void createDealing({
      variables: {
        input: {
          userId: tmpDealingCreateData.userId,
          amount: tmpDealingCreateData.amount,
          message: tmpDealingCreateData.message,
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <p>内容確認</p>
        <div className="shadow-md p-12 rounded-xl">
          <div className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  名前
                </label>
              </div>
              <div className="md:w-2/3">{tmpDealingCreateData.name}さん</div>
            </div>

            <div className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    贈るポイント数
                  </label>
                </div>
                <div className="md:w-2/3">{tmpDealingCreateData.amount}P</div>
              </div>
            </div>

            <div className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    コメント
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="whitespace-pre-wrap break-all">
                    {tmpDealingCreateData.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="w-full">
                {createLoading ? (
                  <PageLoading />
                ) : (
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white w-full font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={onSubmit}
                  >
                    ポイントを贈る
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(DealingsNewConfirmPage);
