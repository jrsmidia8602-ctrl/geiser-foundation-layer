import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarItem {
  label: string;
  link: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sidebar-foreground">XPEX</h2>
        <p className="text-sm text-muted-foreground">Super Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={item.link}
              to={item.link}
              className={cn(
                "block px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
