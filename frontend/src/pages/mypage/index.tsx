import { useContext } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { useMypagePageQuery } from '@/generated/graphql';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NextPageWithLayout } from '@/pages/_app';
import userLoginRequired from '@/hoc/userLoginRequired';
import { clearSession } from '@/utils/storage';
import { GavePointsChart } from '@/components/charts/GavePointsChart';
import { ReceivedPointsChart } from '@/components/charts/ReceivedPointsChart';

gql`
  query MypagePage {
    receivedDealings: userReceivedDealings {
      ...ReceivedDealingsForReceivedPointsChart
    }

    gaveDealings: userGaveDealings {
      ...GaveDealingsForGavePointsChart
    }
  }
`;

const MypagePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setPageFatalError } = usePageFatalError();
  const {
    data: userDealingsData,
    loading,
    error,
  } = useMypagePageQuery({
    fetchPolicy: 'network-only',
    onError: setPageFatalError,
  });

  const onClick = () => {
    clearSession();
    void router.push('/dealings/new/input/');
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center">
        <div className="w-full h-64">
          <div className="text-right m-8 mr-12">
            <button className="btn btn-primary" onClick={onClick}>
              ポイントをあげる
            </button>
          </div>
          {!loading && userDealingsData && (
            <div className="pb-6 px-5">
              <h2>今月の贈与したポイント</h2>
              <GavePointsChart chartData={userDealingsData.gaveDealings} />
              <h2>今月の受領したポイント</h2>
              <ReceivedPointsChart chartData={userDealingsData.receivedDealings} />
            </div>
          )}
        </div>
      </div>
    </PageContainerWithError>
  );
};;

export default userLoginRequired(MypagePage);
