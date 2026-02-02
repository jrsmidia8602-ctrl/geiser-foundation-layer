import { ethers } from 'ethers';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { address, message, signature } = req.body || {};

  if (!address || !message || !signature) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const recovered = ethers.utils.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Assinatura inválida' });
    }

    // Minimal: register wallet in memory could be added, or integrate DB later.
    return res.status(200).json({ success: true, wallet: address, access: 'granted' });
  } catch (err) {
    console.error('web3 auth error', err);
    return res.status(400).json({ error: 'Falha na autenticação' });
  }
}
