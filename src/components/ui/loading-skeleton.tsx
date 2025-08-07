import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'text' | 'avatar' | 'button';
}

export const Skeleton = ({ className, variant = 'card', ...props }: SkeletonProps) => {
  const variants = {
    card: "h-32 w-full rounded-lg",
    text: "h-4 w-full rounded",
    avatar: "h-10 w-10 rounded-full",
    button: "h-10 w-24 rounded-md"
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-muted skeleton",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton = ({ rows = 5, columns = 4 }: TableSkeletonProps) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} variant="text" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

interface CardSkeletonProps {
  count?: number;
}

export const CardSkeleton = ({ count = 3 }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 p-6 border rounded-lg">
          <Skeleton variant="text" className="h-6 w-3/4" />
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-2/3" />
          <div className="flex gap-2 pt-2">
            <Skeleton variant="button" className="h-8 w-16" />
            <Skeleton variant="button" className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};