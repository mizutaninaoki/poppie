import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql } from '@apollo/client';

import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useDealingsNewInputPageQuery } from '@/generated/graphql';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { DealingForm, DealingFormDataType } from '@/components/dealings/DealingForm';
import { AuthContext } from '@/providers/AuthProvider';
import { useTmpDealingCreateData, clearSession } from '@/utils/storage';
import userLoginRequired from '@/hoc/userLoginRequired';

gql`
  query DealingsNewInputPage($companyId: ID!) {
    users: companyUsers(companyId: $companyId) {
      ...CompanyUserForDealingForm
    }
  }
`;

const DealingsNewInputPage: FC = () => {
  const router = useRouter();
  const { setPageFatalError } = usePageFatalError();
  const { currentUser } = useContext(AuthContext);
  const { save: saveTmpDealingCreateData } = useTmpDealingCreateData();

  const { data, loading } = useDealingsNewInputPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      companyId: currentUser.company.id,
    },
    onError: setPageFatalError,
  });

  const onConfirm = (formData: DealingFormDataType) => {
    // TODO: 画面表示した時にclearSessionした方がよい？
    clearSession();
    saveTmpDealingCreateData(formData);
    void router.push('/dealings/new/confirm/');
  };

  return (
    <PageContainerWithError>
      <div className="grid min-h-screen-except-header">
        <div className="p-8">
          <div className="place-items-start mb-5 border-l-4 border-green-200">
            <h3 className="text-lg font-bold">&nbsp;ポイントをあげる</h3>
          </div>

          <div className="grid h-full place-items-center">
            {!loading && data?.users && (
              <DealingForm users={data.users} onSubmit={onConfirm} />
            )}
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(DealingsNewInputPage);
