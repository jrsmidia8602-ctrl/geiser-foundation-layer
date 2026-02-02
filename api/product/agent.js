export default async function handler(req, res) {
  const wallet = (req.query && req.query.wallet) || (req.body && req.body.wallet);

  if (!wallet) {
    return res.status(401).json({ error: 'Wallet não informada' });
  }

  // Minimal delivery: later you can check on-chain proofs / token-gate / credits
  return res.status(200).json({
    product: 'Agente Autônomo XPEX',
    status: 'ativo',
    result: 'Agente executado com sucesso',
    wallet: wallet
  });
}
