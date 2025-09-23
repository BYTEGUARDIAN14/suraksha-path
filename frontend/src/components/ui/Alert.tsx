import { forwardRef } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  className,
  variant = 'info',
  title,
  children,
  onClose,
  ...props
}, ref) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: 'text-blue-800',
      content: 'text-blue-700',
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: 'text-green-800',
      content: 'text-green-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      title: 'text-yellow-800',
      content: 'text-yellow-700',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: 'text-red-800',
      content: 'text-red-700',
    },
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-lg border p-4 shadow-lg',
        variants[variant].container,
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {variants[variant].icon}
        </div>
        <div className="flex-1">
          {title && (
            <h5 className={cn('font-medium mb-1', variants[variant].title)}>
              {title}
            </h5>
          )}
          <div className={cn('text-sm', variants[variant].content)}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

export { Alert };