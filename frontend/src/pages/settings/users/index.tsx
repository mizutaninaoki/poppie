import { FC, useContext } from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useSettingsUsersPageQuery } from '@/generated/graphql';
import { PageLoading } from '@/components/PageLoading';
import { CompanyUsersCardList } from '@/components/companies/users/CompanyUsersCardList';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { NextPageWithLayout } from '@/pages/_app';
import { AuthContext } from '@/providers/AuthProvider';
import userLoginRequired from '@/hoc/userLoginRequired';

gql`
  query SettingsUsersPage($companyId: ID!) {
    users: companyUsers(companyId: $companyId) {
      ...CompanyUsersListData
    }
  }
`;

const SettingsUsersPage: NextPageWithLayout = () => {
  const { setPageFatalError } = usePageFatalError();

  const { currentUser } = useContext(AuthContext);

  const { data, loading, error } = useSettingsUsersPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      companyId: currentUser.company.id,
    },
    onError: setPageFatalError,
  });

  return (
    <PageContainerWithError>
      <div className="grid">
        <div className="m-4 sm:m-8">
          <div className="place-items-start mb-5 border-l-4 border-green-200">
            <h3 className="md:text-lg font-bold">&nbsp;ユーザー管理</h3>
          </div>
          <div className="text-center">
            <Link href="/settings/users/register/">
              <button className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold mt-3 mb-7 py-2 px-4 rounded-lg">
                ユーザーを追加する
              </button>
            </Link>
          </div>
          {loading && <PageLoading />}
          {!loading && data && <CompanyUsersCardList users={data.users} />}
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(SettingsUsersPage);
