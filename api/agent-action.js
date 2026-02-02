export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { agent, action, wallet } = req.body;

  if (!agent || !action || !wallet) {
    return res.status(400).json({ error: 'Dados faltando' });
  }

  console.log(`Agente: ${agent} | Action: ${action} | Wallet: ${wallet}`);

  return res.status(200).json({
    success: true,
    agent,
    action,
    wallet,
  });
}
