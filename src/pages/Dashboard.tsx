import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <AppLayout title="XPEX Super Dashboard - Autônomos">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao XPEX</CardTitle>
            <CardDescription>Sistema de Agentes Autônomos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Conecte sua wallet e permita que seus agentes trabalhem de forma autônoma para gerar renda passiva.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Conecte sua Wallet</h4>
              <p className="text-sm text-muted-foreground">Acesse a página Wallet e conecte sua MetaMask</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Agentes Iniciam Automaticamente</h4>
              <p className="text-sm text-muted-foreground">Seus 10 agentes começarão a trabalhar autonomamente</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Monitore o Progresso</h4>
              <p className="text-sm text-muted-foreground">Acompanhe as ações na página Agents e veja o histórico em Logs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
