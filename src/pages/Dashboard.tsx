import { AppLayout } from '@/components/layout/AppLayout';
import { Grid } from '@/components/layout/Grid';
import { AgentCard } from '@/components/dashboard-xpex/AgentCard';

export default function Dashboard() {
  return (
    <AppLayout title="XPEX Super Dashboard">
      <Grid columns={3} gap={20}>
        <AgentCard
          name="Alpha"
          status="idle"
          actions={["replicate", "pause", "start"]}
        />
        <AgentCard
          name="Beta"
          status="running"
          actions={["replicate", "pause", "start"]}
        />
        <AgentCard
          name="Gamma"
          status="idle"
          actions={["replicate", "pause", "start"]}
        />
      </Grid>
    </AppLayout>
  );
}
