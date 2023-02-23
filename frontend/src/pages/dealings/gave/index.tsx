import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { useGetGaveDealingsLazyQuery } from '@/generated/graphql';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NextPageWithLayout } from '@/pages/_app';
import userLoginRequired from '@/hoc/userLoginRequired';
import { clearSession } from '@/utils/storage';
import { formatISO8601 } from '@/utils/date';
import { PageLoading } from '@/components/PageLoading';
import { PageContentError } from '@/components/PageContentError';
import { GavePointsChart } from '@/components/charts/GavePointsChart';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { formatDateTimeWithSlash } from '@/utils/date';

gql`
  query GetGaveDealings($chartDisplayDate: String!) {
    gaveDealings: userGaveDealings(chartDisplayDate: $chartDisplayDate) {
      ...GaveDealingsForGavePointsChart
    }
  }
`;

const DealingsGavePage: NextPageWithLayout = () => {
  const router = useRouter();

  // 表示させるチャートの月（デフォルトは今月）
  const today = new Date();
  const [chartDisplayDate, setChartDisplayDate] = useState<Date>(today);

  const [
    GetGaveDealings,
    {
      data: assignedGaveDealingsData,
      loading: getGaveDealingsLoading,
      error: getGaveDealingsError,
    },
  ] = useGetGaveDealingsLazyQuery({
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

  if (getGaveDealingsError) {
    return <PageContentError error={{ message: getGaveDealingsError.message }} />;
  }

  return (
    <PageContainerWithError>
      <div className="grid min-h-screen-except-header">
        <div className="m-4 sm:m-8">
          <div className="place-items-start mb-10 border-l-4 border-green-200">
            <h3 className="md:text-lg font-bold">&nbsp;あげたポイント一覧</h3>
          </div>

          <div className="grid place-items-center">
            <div className="w-full h-64">
              {getGaveDealingsLoading && <PageLoading />}
              {!getGaveDealingsLoading && assignedGaveDealingsData && (
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
                      chartDisplayDate.getDay(),
                    ) <= today && (
                      <IoChevronForward
                        className="text-green-600 inline cursor-pointer hover:opacity-50"
                        onClick={nextMonth}
                      ></IoChevronForward>
                    )}
                  </div>
                  <h2 className="font-bold mb-2">今月あげたポイント</h2>
                  <GavePointsChart chartData={assignedGaveDealingsData.gaveDealings} />
                  <div className="mb-12"></div>
                  <div className="overflow-x-auto">
                    <table className="z-0 table table-zebra mx-auto">
                      <thead>
                        <tr className="text-center">
                          <th>ポイントをあげたユーザー</th>
                          <th>ポイント数</th>
                          <th>コメント</th>
                          <th>日時</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignedGaveDealingsData.gaveDealings.map((gaveDealingData) => {
                          return gaveDealingData.dealings.map((dealing) => {
                            return (
                              <tr key={dealing.id}>
                                <th className="font-medium">{dealing.giver.user.name}</th>
                                <td>{dealing.amount} ポイント</td>
                                <td className="whitespace-pre-wrap break-all">
                                  {dealing.message}
                                </td>
                                <td>{formatDateTimeWithSlash(dealing.createdAt)}</td>
                              </tr>
                            );
                          });
                        })}
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

export default userLoginRequired(DealingsGavePage);
