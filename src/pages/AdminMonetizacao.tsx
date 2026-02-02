import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminMonetizacaoPage() {
  const [wallet, setWallet] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({ total: 0, produtos: 0, transacoes: 0 });

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
      <h1 className="text-3xl font-bold">💰 Monetização Web3</h1>

      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Total Recebido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0.00 ETH</p>
              <p className="text-xs text-gray-500 mt-1">~ R$ 0,00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Produtos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.produtos}</p>
              <p className="text-xs text-gray-500 mt-1">APIs monetizadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.transacoes}</p>
              <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="bg-red-900/10 border-red-600">
          <CardContent className="p-6">
            <p className="text-red-400">Acesso restrito a admins</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Opções de Monetização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border border-slate-700 rounded">
            <h3 className="font-semibold text-sm">🔥 Opção A: Pagamento Manual</h3>
            <p className="text-xs text-gray-400 mt-1">Cliente paga → você libera acesso (whitelist)</p>
          </div>
          <div className="p-3 border border-slate-700 rounded">
            <h3 className="font-semibold text-sm">🎯 Opção B: Token-Gated</h3>
            <p className="text-xs text-gray-400 mt-1">Só quem tem NFT/token acessa (on-chain)</p>
          </div>
          <div className="p-3 border border-slate-700 rounded">
            <h3 className="font-semibold text-sm">⚡ Opção C: Pay Per Call</h3>
            <p className="text-xs text-gray-400 mt-1">Assinatura + créditos por chamada</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-900/10 border-blue-600">
        <CardHeader>
          <CardTitle className="text-sm">Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. Configure seu wallet em <code className="bg-slate-900 px-2 py-1 rounded">.env</code></p>
          <p>2. Deploy na Vercel</p>
          <p>3. Integre pagamentos on-chain</p>
          <p>4. Receba direto no seu wallet 🚀</p>
        </CardContent>
      </Card>
    </div>
  );
}
