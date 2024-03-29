import { FC } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useCreateOrUpdateExchangeAppliedItemsMutation } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import userLoginRequired from '@/hoc/userLoginRequired';
import { useRouter } from 'next/router';
import { ItemCard } from '@/components/items/ItemCard';
import { useTmpExchangeItemsData, clearSession } from '@/utils/storage';
import { useAccount } from '@/hooks/useAccount';

gql`
  mutation CreateOrUpdateExchangeAppliedItems(
    $input: CreateOrUpdateExchangeAppliedItemsInput!
  ) {
    createOrUpdateExchangeAppliedItems(input: $input) {
      account {
        id
        receivedPoint
      }
    }
  }
`;

/**
 * 景品一覧画面
 */
const ExchangesConfirmPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageFatalError } = usePageFatalError();
  const { data: tmpExchangeItemsData } = useTmpExchangeItemsData();
  const { updateAccountReceivedPoint } = useAccount();

  const [createOrUpdateExchangeAppliedItems, { loading: createLoading }] =
    useCreateOrUpdateExchangeAppliedItemsMutation({
      onCompleted: async (res) => {
        if (!res.createOrUpdateExchangeAppliedItems) return;
        updateAccountReceivedPoint(
          res.createOrUpdateExchangeAppliedItems.account.receivedPoint,
        );

        clearSession();
        await router.push('/exchanges/complete/');
        setFlash('景品の交換予約が完了しました。');
      },
      onError: setPageFatalError,
    });

  const onSubmit = () => {
    // sessionStorageはnullの可能性があるため早期returnを挟んでいる
    if (!tmpExchangeItemsData) return;

    void createOrUpdateExchangeAppliedItems({
      variables: {
        input: {
          // quantityに交換する数量が入力されている景品のみサーバー側に送る
          exchangeItems: tmpExchangeItemsData
            .filter((item) => item.exchangeQuantity > 0)
            .map((item) => {
              return {
                itemId: item.id,
                userId: item.userId,
                exchangeQuantity: item.exchangeQuantity,
              };
            }),
        },
      },
    });
  };

  return (
    <PageContainerWithError>
      <>
        <div className="grid mb-10">
          <div className="m-4 sm:m-8">
            <div className="place-items-start mb-5 border-l-4 border-green-200">
              <h3 className="md:text-lg font-bold">&nbsp;景品確認</h3>
            </div>
            <div className="grid mb-8 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-12">
              {tmpExchangeItemsData && (
                <>
                  {tmpExchangeItemsData
                    .filter((item) => item.exchangeQuantity > 0)
                    .map((item) => (
                      <ItemCard item={item} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full text-center">
          <button
            className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded-lg"
            type="button"
            onClick={onSubmit}
          >
            交換する
          </button>
        </div>
      </>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ExchangesConfirmPage);
