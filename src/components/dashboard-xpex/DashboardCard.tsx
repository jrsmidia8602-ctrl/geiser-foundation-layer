import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardAction {
  label: string;
  action: string;
}

interface DashboardCardProps {
  title: string;
  description: string;
  actions?: CardAction[];
}

export function DashboardCard({ title, description, actions = [] }: DashboardCardProps) {
  const handleAction = (actionCode: string) => {
    try {
      const func = new Function(actionCode);
      func();
    } catch (error) {
      console.error('Action error:', error);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {actions.length > 0 && (
        <CardContent className="flex gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={() => handleAction(action.action)}
              variant="outline"
              size="sm"
            >
              {action.label}
            </Button>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
