import { FC, useContext } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useCreateItemMutation, useItemsPageQuery } from '@/generated/graphql';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { usePageError } from '@/hooks/usePageError';
import { ItemCardWithEditButton } from '@/components/items/ItemCardWithEditButton';
import { AuthContext } from '@/providers/AuthProvider';
import { PageLoading } from '@/components/PageLoading';

import userLoginRequired from '@/hoc/userLoginRequired';
import { useRouter } from 'next/router';

gql`
  query ItemsPage($companyId: ID!) {
    items(companyId: $companyId) {
      ...ItemDataForItemCard
    }
  }
`;

const ItemsIndexPage: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { setPageError } = usePageError();
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);

  const { data, loading, error } = useItemsPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      companyId: currentUser.company.id,
    },
    onError: setPageFatalError,
  });

  return (
    <PageContainerWithError>
      <div className="grid min-h-screen-except-header">
        <div className="p-8">
          <div className="place-items-start mb-5 border-l-4 border-green-200">
            <h3 className="text-lg font-bold">&nbsp;景品一覧</h3>
          </div>
          <div className="text-center">
            <Link href="/items/new/input/">
              <button className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold my-3 py-2 px-4 rounded-lg">
                新しく景品を登録する
              </button>
            </Link>
          </div>
        </div>
        {loading && <PageLoading />}
        {!loading && data && (
          <>
            {data.items.length > 0 ? (
              <div className="grid grid-cols-3 gap-12 mb-8">
                {data.items.map((item) => (
                  <ItemCardWithEditButton item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 mb-8">
                <p className="font-bold text-center">景品が登録されていません</p>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ItemsIndexPage);

