import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

const sidebarItems = [
  { label: "Home", link: "/" },
  { label: "Agents", link: "/agents" },
  { label: "Wallet", link: "/wallet" },
  { label: "Logs", link: "/logs" }
];

export function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={sidebarItems} />
      <div className="ml-64">
        <Header title={title} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
