import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WalletPage() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0 ETH');

  const agentsAutonomous = async (wallet: string) => {
    const agents = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
    for (const agent of agents) {
      try {
        await fetch('/api/agent-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent, action: 'start', wallet })
        });
        logAction(agent, 'start', 'running');
      } catch (error) {
        console.error(`Error starting agent ${agent}:`, error);
      }
    }
  };

  const logAction = (agent: string, action: string, status: string) => {
    const table = document.getElementById('logsTable');
    if (table && 'insertRow' in table) {
      const row = (table as any).insertRow(-1);
      row.insertCell(0).innerText = new Date().toLocaleString();
      row.insertCell(1).innerText = agent;
      row.insertCell(2).innerText = action;
      row.insertCell(3).innerText = status;
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        }) as string[];
        const wallet = accounts[0];
        setWalletAddress(wallet);

        const res = await fetch('/api/agent-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agent: 'system',
            action: 'connect',
            wallet
          })
        });

        const data = await res.json();
        console.log('Wallet session created:', data);

        setBalance('0 ETH');
        alert(`Wallet conectada: ${wallet}`);

        // Start autonomous agents
        await agentsAutonomous(wallet);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Erro ao conectar wallet');
      }
    } else {
      alert('Instale o Metamask!');
    }
  };

  return (
    <AppLayout title="Wallet">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Conectar Wallet</CardTitle>
            <CardDescription>Metamask conectado = agentes monetizando</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={connectWallet} size="lg">
              Conectar Wallet
            </Button>

            {walletAddress && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Endereço:</span> {walletAddress}
                </p>
                <p className="text-lg font-semibold" id="walletBalance">
                  Saldo atual: {balance}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}
