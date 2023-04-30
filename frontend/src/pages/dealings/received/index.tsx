import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { useGetReceivedDealingsLazyQuery } from '@/generated/graphql';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NextPageWithLayout } from '@/pages/_app';
import userLoginRequired from '@/hoc/userLoginRequired';
import { clearSession } from '@/utils/storage';
import { formatISO8601 } from '@/utils/date';
import { PageLoading } from '@/components/PageLoading';
import { PageContentError } from '@/components/PageContentError';
import { ReceivedPointsChart } from '@/components/charts/ReceivedPointsChart';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { formatDateTimeWithSlash } from '@/utils/date';

gql`
  query GetReceivedDealings($chartDisplayDate: String!) {
    receivedDealings: userReceivedDealings(chartDisplayDate: $chartDisplayDate) {
      ...ReceivedDealingsForReceivedPointsChart
    }
  }
`;

const DealingsReceivedPage: NextPageWithLayout = () => {
  const router = useRouter();

  // 表示させるチャートの月（デフォルトは今月）
  const today = new Date();
  const [chartDisplayDate, setChartDisplayDate] = useState<Date>(today);

  const [
    GetGaveDealings,
    {
      data: assignedReceivedDealingsData,
      loading: getReceivedDealingsLoading,
      error: getReceivedDealingsError,
    },
  ] = useGetReceivedDealingsLazyQuery({
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
    GetGaveDealings({
      variables: {
        chartDisplayDate: formatISO8601(chartDisplayDate),
      },
    });
  }, [chartDisplayDate]);

  if (getReceivedDealingsError) {
    return <PageContentError error={{ message: getReceivedDealingsError.message }} />;
  }

  return (
    <PageContainerWithError>
      <div className="grid min-h-screen-except-header">
        <div className="m-4 sm:m-8">
          <div className="place-items-start mb-10 border-l-4 border-green-200">
            <h3 className="md:text-lg font-bold">&nbsp;もらったポイント一覧</h3>
          </div>

          <div className="grid place-items-center">
            <div className="w-full h-64">
              {getReceivedDealingsLoading && <PageLoading />}
              {!getReceivedDealingsLoading && assignedReceivedDealingsData && (
                <div className="pb-6">
                  <div className="text-center">
                    <IoChevronBack
                      className="text-green-600 inline cursor-pointer hover:opacity-50"
                      onClick={prevMonth}
                    ></IoChevronBack>
                    <span className="bg-green-50 p-2 rounded-lg font-bold mx-2">
                      {chartDisplayDate.getFullYear()}年{chartDisplayDate.getMonth() + 1}
                      月{/* getMonthは0始まりのため、プラス１する */}
                    </span>
                    {new Date(
                      chartDisplayDate.getFullYear(),
                      chartDisplayDate.getMonth() + 1,
                      chartDisplayDate.getDate(),
                    ) <= today && (
                      <IoChevronForward
                        className="text-green-600 inline cursor-pointer hover:opacity-50"
                        onClick={nextMonth}
                      ></IoChevronForward>
                    )}
                  </div>
                  <h2 className="font-bold mb-2">今月もらったポイント</h2>
                  <ReceivedPointsChart
                    chartData={assignedReceivedDealingsData.receivedDealings}
                  />
                  <div className="mb-12"></div>
                  <div className="overflow-x-auto">
                    <table className="z-0 table table-zebra mx-auto w-3/5">
                      <thead>
                        <tr className="text-center">
                          <th>ポイントをくれたユーザー</th>
                          <th>ポイント数</th>
                          <th>コメント</th>
                          <th>日時</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignedReceivedDealingsData.receivedDealings.map(
                          (receivedDealingData) => {
                            return receivedDealingData.dealings.map((dealing) => {
                              return (
                                <tr key={dealing.id}>
                                  <th className="font-medium">
                                    {dealing.receiver.user.name}
                                  </th>
                                  <td>{dealing.amount} ポイント</td>
                                  <td className="whitespace-pre-wrap break-all">
                                    {dealing.message}
                                  </td>
                                  <td>{formatDateTimeWithSlash(dealing.createdAt)}</td>
                                </tr>
                              );
                            });
                          },
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(DealingsReceivedPage);
