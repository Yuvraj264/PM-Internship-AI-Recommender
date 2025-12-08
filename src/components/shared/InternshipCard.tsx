import { Link } from 'react-router-dom';
import { MapPin, Clock, IndianRupee, Briefcase, Building2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GovBadge } from './GovBadge';
import { cn } from '@/lib/utils';

interface InternshipCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  skills: string[];
  deadline?: string;
  isVerified?: boolean;
  status?: 'active' | 'closed' | 'review' | 'pending';
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function InternshipCard({
  id,
  title,
  company,
  location,
  duration,
  stipend,
  skills,
  deadline,
  isVerified = true,
  status = 'active',
  variant = 'default',
  className,
}: InternshipCardProps) {
  const statusBadgeVariant = {
    active: 'approved' as const,
    closed: 'rejected' as const,
    review: 'review' as const,
    pending: 'pending' as const,
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl border border-border transition-all duration-300 hover:shadow-gov-lg overflow-hidden",
        variant === 'featured' && "border-gold/30 shadow-gold",
        className
      )}
    >
      {/* Gold Top Border for Featured */}
      {variant === 'featured' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />
      )}

      <div className={cn("p-5", variant === 'compact' && "p-4")}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate text-lg group-hover:text-gold transition-colors">
                {title}
              </h3>
              {isVerified && (
                <GovBadge variant="verified" label="Verified" size="sm" />
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium">{company}</span>
            </div>
          </div>
          <GovBadge
            variant={statusBadgeVariant[status]}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="sm"
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm col-span-2">
            <IndianRupee className="w-4 h-4 text-gold shrink-0" />
            <span className="font-semibold text-gold">{stipend}/month</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs font-medium bg-primary/5 text-primary rounded-md border border-primary/10"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{skills.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {deadline && (
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-muted-foreground">Deadline:</span>
              <span className="font-medium text-gold">{deadline}</span>
            </div>
          )}
          <Link to={`/internship/${id}`} className="ml-auto">
            <Button variant="ghost" size="sm" className="gap-1 text-gold hover:text-gold-dark hover:bg-gold/10">
              View Details
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
