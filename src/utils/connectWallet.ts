export async function connectWallet(): Promise<string> {
  if (!(window as any).ethereum) throw new Error('MetaMask não encontrada');
  const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

export async function signMessage(address: string) {
  const message = `Login XPEX :: ${Date.now()}`;
  const signature = await (window as any).ethereum.request({ method: 'personal_sign', params: [message, address] });
  return { message, signature };
}
