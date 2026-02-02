# Monetização & Deploy (rápido)

- Endpoints serverless adicionados em `/api`:
  - `/api/stripe/create-checkout-session` — cria sessão de checkout Stripe (POST).
  - `/api/stripe/webhook` — webhook Stripe para eventos (POST) — configure `STRIPE_WEBHOOK_SECRET`.
  - `/api/agents/seller` — endpoint minimal para agente vendedor (POST). Pode usar `OPENAI_API_KEY`.

- Variáveis de ambiente: veja `.env.example`.
- Para deploy na Vercel: defina as variáveis no dashboard e use o build padrão (`npm run vercel-build` ou `npm run build`).

Notas:
- Não foram alterados arquivos do frontend; integrações são endpoints serverless independentes.
- Ajuste o `priceId` usado pelo frontend ao chamar o endpoint de checkout.
