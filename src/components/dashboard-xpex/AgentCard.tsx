import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AgentCardProps {
  name: string;
  status: 'idle' | 'running' | 'paused';
  actions: string[];
}

export function AgentCard({ name, status, actions }: AgentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'paused':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleReplicate = async () => {
    alert(`Agente ${name} replicado`);
  };

  const handlePause = async () => {
    alert(`Agente ${name} pausado`);
  };

  const handleStart = async () => {
    alert(`Agente ${name} iniciado`);
  };

  const actionHandlers: Record<string, () => void> = {
    replicate: handleReplicate,
    pause: handlePause,
    start: handleStart,
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Agent {name}</CardTitle>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
        <CardDescription>Agent status and controls</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {actions.map((action) => (
          <Button
            key={action}
            onClick={() => actionHandlers[action]?.()}
            variant="outline"
            size="sm"
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
