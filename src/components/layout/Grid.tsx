import { ReactNode } from 'react';

interface GridProps {
  columns: number;
  gap?: number;
  children: ReactNode;
}

export function Grid({ columns, gap = 20, children }: GridProps) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
