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

gql`
  mutation CreateOrUpdateExchangeAppliedItems(
    $input: CreateOrUpdateExchangeAppliedItemsInput!
  ) {
    createOrUpdateExchangeAppliedItems(input: $input) {
      clientMutationId
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

  const [createOrUpdateExchangeAppliedItems, { loading: createLoading }] =
    useCreateOrUpdateExchangeAppliedItemsMutation({
      onCompleted: async () => {
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
        <h1>景品確認</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
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
        <div className="w-full text-center">
          <button className="btn btn-primary" type="button" onClick={onSubmit}>
            交換する
          </button>
        </div>
      </>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ExchangesConfirmPage);
