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
      <div className="grid place-items-center">
        <h1>景品一覧</h1>
        <div className="w-full text-right mb-7">
          <Link href="/items/new/input/">
            <button className="btn btn-primary">新しく景品を登録する</button>
          </Link>
        </div>
        {loading && <PageLoading />}
        {!loading && data && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {data.items.length > 0 ? (
                <>
                  {data.items.map((item) => (
                    <ItemCardWithEditButton item={item} key={item.id} />
                  ))}
                </>
              ) : (
                <p>景品が登録されていません</p>
              )}
            </div>
          </>
        )}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ItemsIndexPage);
