import { useContext } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { useMypagePageQuery } from '@/generated/graphql';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NextPageWithLayout } from '@/pages/_app';
import userLoginRequired from '@/hoc/userLoginRequired';
import { clearSession } from '@/utils/storage';
import { GivePointsChart } from '@/components/charts/GivePointsChart';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

gql`
  query MypagePage {
    receive_dealings: userReceiveDealings {
      id
      amount
      createdAt
    }

    give_dealings: userGiveDealings {
      ...GiveDealingsForGivePointsChart
    }
  }
`;

const MypagePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setPageFatalError } = usePageFatalError();

  // TODO: dealingレコードが１つもないから、手動で作って、receive_dealingsとgive_dealings動くか確認して、グラフ表示を完成させる！！！
  const {
    data: userDealingsData,
    loading,
    error,
  } = useMypagePageQuery({
    fetchPolicy: 'network-only',
    onError: setPageFatalError,
  });

  // if (userDealingsData) {
  //   debugger;
  // }

  const onClick = () => {
    clearSession();
    void router.push('/dealings/new/input/');
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <div className="w-full h-64">
          <h2>今週のあげたポイント</h2>
          {!loading && userDealingsData && (
            <GivePointsChart chartData={userDealingsData.give_dealings} />
          )}
          {/* <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer> */}
        </div>
        <button className="btn btn-primary" onClick={onClick}>
          ポイントをあげる
        </button>
      </div>
    </PageContainerWithError>
  );
};;

export default userLoginRequired(MypagePage);
