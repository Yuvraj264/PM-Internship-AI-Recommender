import { cn } from '@/lib/utils';
import { Shield, CheckCircle, Award, Clock, AlertCircle, XCircle } from 'lucide-react';

type BadgeVariant = 'verified' | 'approved' | 'pending' | 'review' | 'rejected' | 'gold' | 'info';

interface GovBadgeProps {
  variant: BadgeVariant;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  verified: {
    bg: 'bg-gold/10',
    text: 'text-gold',
    border: 'border-gold/30',
    icon: Shield,
  },
  approved: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: CheckCircle,
  },
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: Clock,
  },
  review: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: AlertCircle,
  },
  rejected: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: XCircle,
  },
  gold: {
    bg: 'bg-gradient-to-r from-gold/20 to-gold/10',
    text: 'text-gold',
    border: 'border-gold/40',
    icon: Award,
  },
  info: {
    bg: 'bg-primary/5',
    text: 'text-primary',
    border: 'border-primary/20',
    icon: Shield,
  },
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-sm gap-2',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function GovBadge({
  variant,
  label,
  size = 'md',
  showIcon = true,
  className,
}: GovBadgeProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        styles.bg,
        styles.text,
        styles.border,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {label}
    </span>
  );
}
