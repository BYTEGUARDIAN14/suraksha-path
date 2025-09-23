import { Card } from '../ui/Card';
import { cn } from '@/lib/utils';

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down';
  };
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  loading = false,
  className,
  ...props
}: StatsCardProps) {
  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)} {...props}>
        <div className="p-6">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={className} {...props}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <span
              className={cn(
                'ml-2 text-sm font-medium',
                trend.direction === 'up' ? 'text-success' : 'text-error'
              )}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
              <span className="text-gray-500 ml-1">{trend.label}</span>
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
