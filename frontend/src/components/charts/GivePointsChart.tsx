// import { DailyReportSectionFragment } from '@/generated/graphql';
import { FC, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { formatShortDateWithSlash } from '@/utils/date';
import {
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Line,
} from 'recharts';


gql`
  fragment GiveDealingsForGivePointsChart on DealingType {
    id
    amount
    createdAt
  }
`

interface Data {
  bookingCount: DailyReportSectionFragment;
  prospectedSalesAmount: DailyReportSectionFragment;
}
interface Props {
  chartData: Data;
}

interface ChartData {
  givingPointsPerDay: number;
  givingPeoplePerDay: number;
}

/**
 * あげたポイントのチャートグラフ
 */
export const GivePointsChart: FC<Props> = ({ chartData: initialChartData }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // if (initialChartData) {
  //   debugger;
  // }

  // initialChartData.give_dealings

  useEffect(() => {
    // const dates: string[] = initialChartData.map()
    //   .map((v) => formatShortDateWithSlash(v.date));

    const giveTotalPoint: number[] = initialChartData.map((data) => {
      if (data.length === 0) return 0;
      return data.reduce((prev, current) => prev + current.amount, 0);
    });

    const giveCount: number[] = initialChartData.map((data) => data.length);

    // debugger;

    setChartData(
      initialChartData.map((date, i) => {
        return {
          date
          giveTotalPoint: giveTotalPoint[i],
          giveCount: giveCount[i],
        };
      }),
    );
  }, [initialChartData]);

  return (
    <ResponsiveContainer width="100%" aspect={5.0 / 1.0}>
      <ComposedChart data={chartData} margin={{ top: 30 }}>
        <XAxis
          dataKey="date"
          tick={{ fontSize: '0.8vw' }}
          // interval 0にしないとx軸が消えてしまう
          // see: https://github.com/recharts/recharts/issues/1330
          interval={0}
        />
        <YAxis
          yAxisId={1}
          tick={{ fontSize: '12px' }}
          tickFormatter={(value: number) => value.toLocaleString()}
          width={80}
          interval={0}
          label={{
            dy: -10,
            value: '見込売上（円）',
            position: 'top',
            fontSize: '10px',
          }}
        />
        <YAxis
          yAxisId={2}
          orientation="right"
          tick={{ fontSize: '12px' }}
          tickFormatter={(value: number) => value.toLocaleString()}
          width={80}
          interval={0}
          label={{
            dy: -10,
            value: '予約数（件）',
            position: 'top',
            fontSize: '10px',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '1.0vw' }} iconSize={12} />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar
          yAxisId={1}
          type="monotone"
          dataKey="prospectedSalesAmount"
          name="見込売上"
          fill="#ff638d"
        />
        <Line
          yAxisId={2}
          type="monotone"
          dataKey="bookingCount"
          name="予約数"
          stroke="#8884d8"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
