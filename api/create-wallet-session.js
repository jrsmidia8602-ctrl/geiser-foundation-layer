export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress, productId } = req.body;

  if (!walletAddress || !productId) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const sessionId = 'WALLET_SESSION_' + Date.now();

  return res.status(200).json({
    success: true,
    sessionId,
    walletAddress,
    productId,
  });
}
