/**
 * 趋势图表组件
 * 显示7天专注趋势
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendData } from '../../types';
import { formatDateShort } from '../../utils/time';

interface TrendChartProps {
  data: TrendData[];
}

export function TrendChart({ data }: TrendChartProps) {
  // 格式化数据
  const chartData = data.map((item) => ({
    ...item,
    displayDate: formatDateShort(item.date),
  }));

  return (
    <div className="bg-[var(--color-bg-card)] rounded-xl p-4">
      <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
        最近7天趋势
      </h3>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`${value} 个番茄`, '番茄数']}
              labelStyle={{ color: 'var(--color-text-secondary)' }}
            />
            <Bar dataKey="pomodoros" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === chartData.length - 1 ? 'var(--color-primary)' : 'var(--color-primary-light)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
