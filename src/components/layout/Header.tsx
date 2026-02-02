interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border p-6 mb-6">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
    </header>
  );
}
