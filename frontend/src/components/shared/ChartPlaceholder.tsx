import { cn } from '@/lib/utils';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  type?: 'bar' | 'line' | 'pie' | 'area';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap = {
  bar: BarChart3,
  line: TrendingUp,
  pie: PieChart,
  area: Activity,
};

const heightMap = {
  sm: 'h-32',
  md: 'h-48',
  lg: 'h-64',
};

export function ChartPlaceholder({
  title,
  type = 'bar',
  height = 'md',
  className,
}: ChartPlaceholderProps) {
  const Icon = iconMap[type];

  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-6 shadow-gov",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Icon className="w-5 h-5 text-gold" />
      </div>

      {/* Chart Area */}
      <div
        className={cn(
          "relative rounded-lg bg-gradient-to-br from-muted/50 to-muted overflow-hidden",
          heightMap[height]
        )}
      >
        {/* Animated Bars / Lines */}
        <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
          {type === 'bar' && (
            <>
              {[65, 45, 80, 55, 70, 40, 85, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-6 bg-gradient-to-t from-gold/60 to-gold/20 rounded-t animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </>
          )}

          {type === 'line' && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
              <path
                d="M0,120 Q50,80 75,90 T150,60 T225,80 T300,40"
                fill="none"
                stroke="hsl(45 65% 52%)"
                strokeWidth="3"
                className="animate-pulse"
              />
              <path
                d="M0,120 Q50,80 75,90 T150,60 T225,80 T300,40 L300,150 L0,150 Z"
                fill="url(#goldGradient)"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(45 65% 52%)" />
                  <stop offset="100%" stopColor="hsl(45 65% 52%)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {type === 'pie' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-gold/30 relative">
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-gold border-r-gold animate-pulse"
                  style={{ transform: 'rotate(45deg)' }}
                />
              </div>
            </div>
          )}

          {type === 'area' && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
              <path
                d="M0,100 C50,80 100,90 150,60 C200,30 250,50 300,40 L300,150 L0,150 Z"
                fill="url(#areaGradient)"
                className="animate-pulse"
              />
              <path
                d="M0,100 C50,80 100,90 150,60 C200,30 250,50 300,40"
                fill="none"
                stroke="hsl(45 65% 52%)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(45 65% 52%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(45 65% 52%)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>

        {/* Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Icon className="w-20 h-20 text-primary" />
        </div>
      </div>

      {/* Legend Placeholder */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gold" />
          <span className="text-xs text-muted-foreground">Primary</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/30" />
          <span className="text-xs text-muted-foreground">Secondary</span>
        </div>
      </div>
    </div>
  );
}
