import { cn } from "./utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton", className)}
      {...props}
    />
  )
}

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

function SkeletonText({ lines = 1, className, ...props }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="skeleton-text" />
      ))}
    </div>
  )
}

function SkeletonTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton-title", className)} {...props} />
}

function SkeletonImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton-image", className)} {...props} />
}

function SkeletonCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton-card", className)} {...props} />
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonTitle, 
  SkeletonImage, 
  SkeletonCard 
}