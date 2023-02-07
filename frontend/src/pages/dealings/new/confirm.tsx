import { FC, useContext } from 'react';
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
import { useAccount } from '@/hooks/useAccount';

gql`
  mutation CreateDealing($input: CreateDealingInput!) {
    createDealing(input: $input) {
      dealing {
        id
        giver {
          id
          givablePoint
          receivedPoint
        }
      }
    }
  }
`;

const DealingsNewConfirmPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { data: tmpDealingCreateData } = useTmpDealingCreateData();
  const { updateAccountGivablePoint } = useAccount();

  const [createDealing, { loading: createLoading }] = useCreateDealingMutation({
    onCompleted: async (res) => {
      if (!res.createDealing?.dealing) return;
      updateAccountGivablePoint(res.createDealing.dealing.giver.givablePoint);

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
      <div className="grid min-h-screen-except-header">
        <div className="m-4 sm:m-8">
          <div className="place-items-start mb-5 border-l-4 border-green-200">
            <h3 className="md:text-lg font-bold">&nbsp;内容確認</h3>
          </div>
          <div className="grid h-full place-items-center">
            <div className="shadow-md p-12 rounded-lg form-box-large bg-green-50">
              <div className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block font-bold mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      贈るユーザー
                    </label>
                  </div>
                  <div className="md:w-2/3">{tmpDealingCreateData.name}さん</div>
                </div>

                <div className="w-full max-w-sm">
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block font-bold mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        贈るポイント数
                      </label>
                    </div>
                    <div className="md:w-2/3">{tmpDealingCreateData.amount}P</div>
                  </div>
                </div>

                <div className="w-full max-w-sm mb-8">
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block font-bold mb-1 md:mb-0 pr-4"
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
                  <div className="mx-auto">
                    {createLoading ? (
                      <PageLoading />
                    ) : (
                      <button
                        className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white w-full font-bold py-2 px-4 rounded-lg"
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
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(DealingsNewConfirmPage);
