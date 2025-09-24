import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animate?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ className, value, max = 100, variant = 'default', size = 'md', showValue = false, animate = true }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    default: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn('relative w-full overflow-hidden rounded-full bg-gray-200', className)}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            'w-full rounded-full transition-all',
            variants[variant],
            sizes[size],
            animate && 'transition-all duration-500 ease-in-out'
          )}
          style={{ width: `${percentage}%` }}
        />
        {showValue && (
          <span className="absolute right-0 -top-6 text-sm font-medium text-gray-600">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
});

Progress.displayName = 'Progress';

export { Progress };
