import { FC, useContext, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useItemsPageQuery } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
import { ItemListExchangeForm } from '@/components/items/ItemListExchangeForm';
import { AuthContext } from '@/providers/AuthProvider';
import { PageLoading } from '@/components/PageLoading';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';
import { useTmpExchangeItemsData, clearSession } from '@/utils/storage';
import userLoginRequired from '@/hoc/userLoginRequired';

gql`
  query ExchangesIndexPage($companyId: ID!) {
    items(companyId: $companyId) {
      ...ItemDataForItemCard
    }
  }
`;

/**
 * 景品一覧画面
 */
const ExchangesIndexPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);
  const { save: saveTmpExchangeItemsData } = useTmpExchangeItemsData();

  const { data, loading } = useItemsPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      companyId: currentUser.company.id,
    },
    onError: setPageFatalError,
  });

  const onConfirm = (listFormData: ItemListFormDataType[]) => {
    saveTmpExchangeItemsData(listFormData);
    void router.push('/exchanges/confirm/');
  };

  useEffect(() => {
    clearSession();
  }, []);

  return (
    <PageContainerWithError>
      <div className="grid min-h-screen-except-header mb-10">
        <div className="m-4 sm:m-8">
          <div className="place-items-start mb-5 border-l-4 border-green-200">
            <h3 className="md:text-lg font-bold">&nbsp;景品交換</h3>
          </div>
          <div className="grid place-items-center">
            {loading && <PageLoading />}
            {!loading && data && (
              <ItemListExchangeForm items={data.items} onConfirm={onConfirm} />
            )}
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ExchangesIndexPage);
