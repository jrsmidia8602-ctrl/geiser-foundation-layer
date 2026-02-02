import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminWalletButton } from '@/components/AdminWalletButton';

export default function AdminWalletPage() {
  const [wallet, setWallet] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('adminWallet');
    if (saved) {
      setWallet(saved);
      fetch('/api/web3/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: saved })
      })
        .then(r => r.json())
        .then(data => setIsAdmin(data.admin));
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🔐 Admin Wallet</h1>
        <AdminWalletButton />
      </div>

      {wallet && isAdmin && (
        <div className="space-y-4">
          <Card className="bg-green-900/10 border-green-500">
            <CardHeader>
              <CardTitle>Status: ADMIN ATIVO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Wallet: <span className="font-mono">{wallet}</span></p>
              <p className="text-sm">Permissão: Total</p>
              <p className="text-sm">Timestamp: {new Date().toISOString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receitas Web3</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-slate-900 rounded">
                <p className="text-xs text-gray-400">Total Recebido</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <p className="text-xs text-gray-400">Produtos Ativos</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <p className="text-xs text-gray-400">Transações</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!wallet && (
        <Card className="bg-yellow-900/10 border-yellow-600">
          <CardContent className="p-6">
            <p className="text-yellow-400">Conecte sua wallet para acessar o painel admin</p>
          </CardContent>
        </Card>
      )}

      {wallet && !isAdmin && (
        <Card className="bg-red-900/10 border-red-600">
          <CardContent className="p-6">
            <p className="text-red-400">Wallet não autorizada como admin</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
