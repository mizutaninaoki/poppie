// import { DailyReportSectionFragment } from '@/generated/graphql';
import { FC, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { ReceivedDealingsForReceivedPointsChartFragment } from '@/generated/graphql';
import { formatOnlyDate } from '@/utils/date';
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
  fragment ReceivedDealingsForReceivedPointsChart on UserReceivedDealingsType {
    dealings {
      id
      amount
      createdAt
    }
    createdAt
  }
`;

type Props = {
  chartData: ReceivedDealingsForReceivedPointsChartFragment[];
};

type ChartData = {
  date: string;
  receivedTotalPoint: number;
  receivedCount: number;
};

/**
 * あげたポイントのチャートグラフ
 */
export const ReceivedPointsChart: FC<Props> = ({ chartData: initialChartData }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // TODO: とりあえず今月
  useEffect(() => {
    const dates: string[] = initialChartData.map((data, i) =>
      formatOnlyDate(data.createdAt),
    );

    const receivedTotalPoint: number[] = initialChartData.map((data) => {
      if (data.dealings.length === 0) return 0;
      return data.dealings.reduce((prev, current) => prev + (current?.amount ?? 0), 0);
    });

    const receivedCount: number[] = initialChartData.map((data) => {
      return data.dealings.length;
    });

    setChartData(
      dates.map((date, i) => {
        return {
          date,
          receivedTotalPoint: receivedTotalPoint[i],
          receivedCount: receivedCount[i],
        };
      }),
    );
  }, [initialChartData]);

  return (
    <ResponsiveContainer width="100%" aspect={5.0 / 1.0}>
      <ComposedChart data={chartData} margin={{ top: 30 }}>
        <XAxis dataKey="date" tick={{ fontSize: '0.8vw' }} interval={0} />
        <YAxis
          yAxisId={1}
          tick={{ fontSize: '12px' }}
          tickFormatter={(value: number) => value.toLocaleString()}
          width={80}
          interval={0}
          label={{
            dy: -10,
            value: '受領ポイント',
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
          // interval={1}
          tickCount={1}
          label={{
            dy: -10,
            value: '受領回数（回）',
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
          dataKey="receivedTotalPoint"
          name="受領ポイント"
          fill="#ff638d"
        />
        <Line
          yAxisId={2}
          type="monotone"
          dataKey="receivedCount"
          name="受領回数"
          stroke="#8884d8"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
