export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { productName, features } = req.body || {};

  if (process.env.OPENAI_API_KEY) {
    try {
      const prompt = `Você é um agente de vendas conciso. Gere uma descrição curta e uma sugestão de preço para o produto: "${productName}". Recursos: ${features || 'N/A'}.`;

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Você é um agente de vendas conciso.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 300
        })
      });

      const json = await resp.json();
      const text = json?.choices?.[0]?.message?.content || json?.choices?.[0]?.text || JSON.stringify(json);
      return res.json({ result: text });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  // Fallback minimal seller response
  const stub = `Venda rápida: ${productName || 'Produto'} — recursos: ${features || 'ver detalhes'} — preço sugerido: R$49.`;
  return res.json({ result: stub });
}
