import { Card } from '../ui/Card';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    key: string;
    name: string;
    color: string;
  }[];
  xAxisKey: string;
  title?: string;
  description?: string;
  loading?: boolean;
  height?: number;
  className?: string;
}

export function LineChart({
  data,
  lines,
  xAxisKey,
  title,
  description,
  loading = false,
  height = 300,
  className,
}: LineChartProps) {
  if (loading) {
    return (
      <Card className={className}>
        <div className="p-6">
          {title && <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />}
          {description && <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-4" />}
          <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="p-6">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>}
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey={xAxisKey}
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />
              {lines.map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
