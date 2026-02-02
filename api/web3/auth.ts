import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ error: 'wallet obrigatória' });
  }

  const adminWallet = process.env.ADMIN_WALLET?.toLowerCase();
  const requestWallet = wallet.toLowerCase();

  if (requestWallet === adminWallet) {
    return res.status(200).json({ admin: true, wallet });
  }

  return res.status(200).json({ admin: false, wallet });
}
