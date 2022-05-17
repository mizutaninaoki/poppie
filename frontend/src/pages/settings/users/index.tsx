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
      <div className="grid place-items-center min-h-screen-except-header">
        <Link href="/settings/users/register/">
          <button className="btn btn-primary">ユーザーを追加する</button>
        </Link>
        {loading && <PageLoading />}
        {!loading && data && <CompanyUsersCardList users={data.users} />}
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(SettingsUsersPage);
