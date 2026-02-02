export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, productId } = req.body;

  if (!wallet || !productId) {
    return res.status(400).json({ error: 'Dados faltando' });
  }

  return res.status(200).json({
    success: true,
    wallet,
    productId,
  });
}
