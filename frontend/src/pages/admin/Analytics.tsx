import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LineChart } from '@/components/dashboard/LineChart';

const chartData = [
  { month: 'Jan', engagement: 120 },
  { month: 'Feb', engagement: 180 },
  { month: 'Mar', engagement: 260 },
  { month: 'Apr', engagement: 220 },
  { month: 'May', engagement: 340 },
  { month: 'Jun', engagement: 410 },
];

export default function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Engagement trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[360px]">
          <LineChart
            data={chartData}
            lines={[{ key: 'engagement', name: 'Engagement', color: '#2563EB' }]}
            xAxisKey="month"
          />
        </div>
      </CardContent>
    </Card>
  );
}


