import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { useGetDealingsLazyQuery } from '@/generated/graphql';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NextPageWithLayout } from '@/pages/_app';
import userLoginRequired from '@/hoc/userLoginRequired';
import { clearSession } from '@/utils/storage';
import { formatISO8601 } from '@/utils/date';
import { PageLoading } from '@/components/PageLoading';
import { PageContentError } from '@/components/PageContentError';
import { GavePointsChart } from '@/components/charts/GavePointsChart';
import { ReceivedPointsChart } from '@/components/charts/ReceivedPointsChart';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

gql`
  query GetDealings($chartDisplayDate: String!) {
    gaveDealings: userGaveDealings(chartDisplayDate: $chartDisplayDate) {
      ...GaveDealingsForGavePointsChart
    }

    receivedDealings: userReceivedDealings(chartDisplayDate: $chartDisplayDate) {
      ...ReceivedDealingsForReceivedPointsChart
    }
  }
`;

const MypagePage: NextPageWithLayout = () => {
  const router = useRouter();

  // 表示させるチャートの月（デフォルトは今月）
  const today = new Date();
  const [chartDisplayDate, setChartDisplayDate] = useState<Date>(today);

  const [
    GetDealings,
    { data: assignedDealingsData, loading: getDealingsLoading, error: getDealingsError },
  ] = useGetDealingsLazyQuery({
    fetchPolicy: 'network-only',
  });

  const onClick = () => {
    clearSession();
    void router.push('/dealings/new/input/');
  };

  const prevMonth = () => {
    setChartDisplayDate(
      new Date(
        chartDisplayDate.getFullYear(),
        chartDisplayDate.getMonth() - 1,
        chartDisplayDate.getDate(),
      ),
    );
  };

  const nextMonth = () => {
    setChartDisplayDate(
      new Date(
        chartDisplayDate.getFullYear(),
        chartDisplayDate.getMonth() + 1,
        chartDisplayDate.getDate(),
      ),
    );
  };

  useEffect(() => {
    GetDealings({
      variables: {
        chartDisplayDate: formatISO8601(chartDisplayDate),
      },
    });
  }, [chartDisplayDate]);

  if (getDealingsError) {
    return <PageContentError error={{ message: getDealingsError.message }} />;
  }

  return (
    <PageContainerWithError>
      <div className="grid place-items-center">
        <div className="w-full h-64">
          <div className="text-right m-8 mr-12">
            <button
              className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-lg text-xs"
              onClick={onClick}
              data-cy="givePointButton"
            >
              ポイントをあげる
            </button>
          </div>
          {getDealingsLoading && <PageLoading />}
          {!getDealingsLoading && assignedDealingsData && (
            <div className="pb-6 px-5">
              <div className="text-center">
                <IoChevronBack
                  className="text-green-600 inline cursor-pointer hover:opacity-50"
                  onClick={prevMonth}
                ></IoChevronBack>
                <span className="bg-green-50 p-2 rounded-lg font-bold mx-2 text-xs lg:text-sm">
                  {chartDisplayDate.getFullYear()}年{chartDisplayDate.getMonth() + 1}月
                  {/* getMonthは0始まりのため、プラス１する */}
                </span>
                {new Date(
                  chartDisplayDate.getFullYear(),
                  chartDisplayDate.getMonth() + 1,
                  chartDisplayDate.getDay(),
                ) <= today && (
                  <IoChevronForward
                    className="text-green-600 inline cursor-pointer hover:opacity-50"
                    onClick={nextMonth}
                  ></IoChevronForward>
                )}
              </div>
              <h2 className="font-bold mb-2">今月あげたポイント</h2>
              <GavePointsChart chartData={assignedDealingsData.gaveDealings} />
              <div className="mb-12"></div>
              <h2 className="font-bold mb-2">今月もらったポイント</h2>
              <ReceivedPointsChart chartData={assignedDealingsData.receivedDealings} />
            </div>
          )}
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(MypagePage);
