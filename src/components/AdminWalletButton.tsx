import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Wallet } from 'lucide-react';

export const AdminWalletButton = () => {
  const [wallet, setWallet] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert('MetaMask não encontrado');
      return;
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setWallet(address);
      localStorage.setItem('adminWallet', address);
      
      // Validate admin status
      const res = await fetch('/api/web3/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: address, signature: 'dummy' })
      });
      const data = await res.json();
      setIsAdmin(data.admin);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setWallet('');
    setIsAdmin(false);
    localStorage.removeItem('adminWallet');
  };

  useEffect(() => {
    const saved = localStorage.getItem('adminWallet');
    if (saved) {
      setWallet(saved);
      fetch('/api/web3/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: saved, signature: 'dummy' })
      })
        .then(r => r.json())
        .then(data => setIsAdmin(data.admin));
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      {wallet ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-500 rounded-lg">
          <Wallet className="w-4 h-4 text-green-400" />
          <span className="text-sm font-mono text-green-400">
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
            {isAdmin && <span className="ml-2 text-xs bg-green-500 text-black px-2 py-1 rounded">ADMIN</span>}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={disconnectWallet}
            className="h-6 px-2"
          >
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet} variant="outline" className="gap-2">
          <Wallet className="w-4 h-4" />
          Conectar Wallet
        </Button>
      )}
    </div>
  );
};
