import { cn } from '@/lib/utils';

interface EmblemWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-96 h-96',
};

export function EmblemWatermark({ className, size = 'lg', opacity = 0.05 }: EmblemWatermarkProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none flex items-center justify-center",
        sizeMap[size],
        className
      )}
      style={{ opacity }}
    >
      {/* Stylized Ashoka Chakra / National Emblem Representation */}
      <svg viewBox="0 0 200 200" className="w-full h-full text-gold">
        {/* Outer Circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Inner Circle */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        
        {/* 24 Spokes of Ashoka Chakra */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="30"
            x2="100"
            y2="60"
            stroke="currentColor"
            strokeWidth="1.5"
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
        
        {/* Center Hub */}
        <circle
          cx="100"
          cy="100"
          r="15"
          fill="currentColor"
          opacity="0.3"
        />
        
        {/* Decorative Lions (Simplified) */}
        <text
          x="100"
          y="110"
          textAnchor="middle"
          className="text-4xl font-bold fill-current"
          style={{ fontFamily: 'serif' }}
        >
          भा
        </text>
      </svg>
    </div>
  );
}
