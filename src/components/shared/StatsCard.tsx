import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'gold' | 'navy';
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-gov-lg",
        variant === 'default' && "bg-card border border-border shadow-gov",
        variant === 'gold' && "bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 shadow-gold",
        variant === 'navy' && "bg-navy-gradient text-primary-foreground border border-gold/20",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <Icon className="w-full h-full" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              variant === 'navy' ? "bg-gold/20" : "bg-primary/10"
            )}
          >
            <Icon
              className={cn(
                "w-6 h-6",
                variant === 'navy' ? "text-gold" : "text-primary"
              )}
            />
          </div>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <p
            className={cn(
              "text-sm font-medium mb-1",
              variant === 'navy' ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-3xl font-bold tracking-tight",
              variant === 'gold' && "text-gold",
              variant === 'navy' && "text-gold"
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                "text-xs mt-1",
                variant === 'navy' ? "text-primary-foreground/50" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
