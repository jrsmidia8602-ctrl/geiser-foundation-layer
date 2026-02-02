import { AppLayout } from '@/components/layout/AppLayout';
import { Grid } from '@/components/layout/Grid';
import { DashboardCard } from '@/components/dashboard-xpex/DashboardCard';

export default function Dashboard() {
  return (
    <AppLayout title="Super Dashboard XPEX">
      <Grid columns={3} gap={20}>
        <DashboardCard
          title="Agente Alpha"
          description="Status: idle"
          actions={[
            { label: "Replicar", action: "alert('Agente alpha replicado!')" },
            { label: "Pausar", action: "alert('Agente alpha pausado!')" }
          ]}
        />
        <DashboardCard
          title="Agente Beta"
          description="Status: running"
          actions={[
            { label: "Replicar", action: "alert('Agente beta replicado!')" },
            { label: "Pausar", action: "alert('Agente beta pausado!')" }
          ]}
        />
      </Grid>
    </AppLayout>
  );
}
