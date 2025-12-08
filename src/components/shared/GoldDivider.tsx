import { cn } from '@/lib/utils';

interface GoldDividerProps {
  className?: string;
  variant?: 'simple' | 'ornate' | 'tricolor';
}

export function GoldDivider({ className, variant = 'ornate' }: GoldDividerProps) {
  if (variant === 'simple') {
    return (
      <div className={cn("h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent", className)} />
    );
  }

  if (variant === 'tricolor') {
    return (
      <div className={cn("h-1 w-32 mx-auto rounded-full overflow-hidden", className)}>
        <div className="h-full w-full" style={{
          background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)'
        }} />
      </div>
    );
  }

  return (
    <div className={cn("relative py-4 w-full", className)}>
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
        <div className="w-2 h-2 rotate-45 bg-gold" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
      </div>
    </div>
  );
}
