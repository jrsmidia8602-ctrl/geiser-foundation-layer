import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardCard } from '@/components/dashboard-xpex/DashboardCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WalletPage() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0 ETH');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        }) as string[];
        const address = accounts[0];
        setWalletAddress(address);

        const res = await fetch('/api/create-wallet-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            walletAddress: address, 
            productId: 'PROD_001' 
          })
        });
        
        const data = await res.json();
        console.log('Session created:', data);
        
        setBalance('0 ETH');
        alert(`Wallet conectado: ${address}`);
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
            <CardDescription>Use Metamask para conectar e monetizar</CardDescription>
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
