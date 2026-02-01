import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive" | "archived" | "success" | "error" | "warning";
  label?: string;
  pulse?: boolean;
}

const statusStyles = {
  active: "bg-success/20 text-success border-success/30",
  inactive: "bg-muted text-muted-foreground border-muted",
  archived: "bg-muted text-muted-foreground border-muted",
  success: "bg-success/20 text-success border-success/30",
  error: "bg-destructive/20 text-destructive border-destructive/30",
  warning: "bg-warning/20 text-warning border-warning/30",
};

const dotStyles = {
  active: "bg-success",
  inactive: "bg-muted-foreground",
  archived: "bg-muted-foreground",
  success: "bg-success",
  error: "bg-destructive",
  warning: "bg-warning",
};

export function StatusBadge({ status, label, pulse = false }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border",
        statusStyles[status]
      )}
    >
      <span className="relative flex h-2 w-2">
        {pulse && status === "active" && (
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotStyles[status])} />
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", dotStyles[status])} />
      </span>
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
