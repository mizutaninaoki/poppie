// import { DailyReportSectionFragment } from '@/generated/graphql';
import { FC, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { GaveDealingsForGavePointsChartFragment } from '@/generated/graphql';
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
  fragment GaveDealingsForGavePointsChart on UserGaveDealingsType {
    dealings {
      id
      amount
      message
      createdAt
      giver {
        user {
          name
        }
      }
    }
    createdAt
  }
`;

type Props = {
  chartData: GaveDealingsForGavePointsChartFragment[];
};

type ChartData = {
  date: string;
  gaveTotalPoint: number;
  gaveCount: number;
};

/**
 * あげたポイントのチャートグラフ
 */
export const GavePointsChart: FC<Props> = ({ chartData: initialChartData }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // TODO: とりあえず今月
  useEffect(() => {
    const dates: string[] = initialChartData.map((data, i) =>
      formatOnlyDate(data.createdAt),
    );

    const gaveTotalPoint: number[] = initialChartData.map((data) => {
      if (data.dealings.length === 0) return 0;
      return data.dealings.reduce((prev, current) => prev + (current?.amount ?? 0), 0);
    });

    const gaveCount: number[] = initialChartData.map((data) => {
      return data.dealings.length;
    });

    setChartData(
      dates.map((date, i) => {
        return {
          date,
          gaveTotalPoint: gaveTotalPoint[i],
          gaveCount: gaveCount[i],
        };
      }),
    );
  }, [initialChartData]);

  return (
    <ResponsiveContainer
      width="100%"
      aspect={(window.innerWidth * 2.2) / (window.innerHeight * 0.9)}
      // aspect={5 / 1}
    >
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
            value: '贈与ポイント',
            position: 'top',
            fontSize: '12px',
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
            value: '贈与回数（回）',
            position: 'top',
            fontSize: '12px',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '0.8vw' }} iconSize={12} />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar
          yAxisId={1}
          type="monotone"
          dataKey="gaveTotalPoint"
          name="贈与ポイント"
          fill="#16A34A"
          radius={[7, 7, 0, 0]}
        />
        <Line
          yAxisId={2}
          type="monotone"
          dataKey="gaveCount"
          name="贈与回数"
          stroke="#919191"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
