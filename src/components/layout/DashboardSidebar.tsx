import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Briefcase, 
  Building2, 
  Settings,
  LogOut,
  ChevronLeft,
  Users,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  PlusCircle
} from 'lucide-react';
import { useState } from 'react';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardSidebarProps {
  role: 'candidate' | 'company' | 'admin';
}

const sidebarLinks: Record<string, SidebarLink[]> = {
  candidate: [
    { label: 'Dashboard', href: '/candidate/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', href: '/candidate/profile', icon: User },
    { label: 'My Applications', href: '/candidate/applications', icon: FileText },
    { label: 'Browse Internships', href: '/candidate/internships', icon: Briefcase },
    { label: 'Settings', href: '/candidate/settings', icon: Settings },
  ],
  company: [
    { label: 'Dashboard', href: '/company/dashboard', icon: LayoutDashboard },
    { label: 'Post Internship', href: '/company/post', icon: PlusCircle },
    { label: 'Manage Internships', href: '/company/manage', icon: Briefcase },
    { label: 'Applicants', href: '/company/applicants', icon: Users },
    { label: 'Company Profile', href: '/company/profile', icon: Building2 },
    { label: 'Settings', href: '/company/settings', icon: Settings },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Companies', href: '/admin/companies', icon: Building2 },
    { label: 'Approval Queue', href: '/admin/approvals', icon: CheckCircle },
    { label: 'Escalations', href: '/admin/escalations', icon: AlertTriangle },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ],
};

const roleLabels: Record<string, { title: string; subtitle: string }> = {
  candidate: { title: 'Candidate Portal', subtitle: 'Internship Seeker' },
  company: { title: 'Company Portal', subtitle: 'Verified Employer' },
  admin: { title: 'Admin Portal', subtitle: 'System Administrator' },
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const links = sidebarLinks[role];
  const roleInfo = roleLabels[role];

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-navy-gradient border-r border-gold/20 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gold/20">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40 shrink-0">
            <span className="text-gold text-lg font-bold">भा</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h2 className="text-primary-foreground font-semibold text-sm truncate">
                {roleInfo.title}
              </h2>
              <p className="text-gold text-xs truncate">{roleInfo.subtitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gold/20 text-gold border-l-2 border-gold"
                  : "text-primary-foreground/70 hover:bg-gold/10 hover:text-gold",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{link.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gold/20 space-y-1">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </Link>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-foreground/50 hover:text-gold transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 shrink-0 transition-transform",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
