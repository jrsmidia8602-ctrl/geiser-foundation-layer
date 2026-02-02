import { AppLayout } from '@/components/layout/AppLayout';
import { Grid } from '@/components/layout/Grid';
import { AgentCard } from '@/components/dashboard-xpex/AgentCard';

const agents = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa"];

export default function AgentsPage() {
  return (
    <AppLayout title="Agents">
      <Grid columns={2} gap={15}>
        {agents.map((agent) => (
          <AgentCard
            key={agent}
            name={agent}
            status="idle"
            actions={["replicate", "pause", "start"]}
          />
        ))}
      </Grid>
    </AppLayout>
  );
}
