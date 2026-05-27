# Deploy no Vercel — site + chatbot

Tudo num único projeto Vercel: o site (Vite/React) como estático e o chatbot como
**função serverless Python** (`api/chat.py`, NVIDIA NIM direto). Mesma origem → sem CORS.
A chave da NVIDIA fica em variável de ambiente no Vercel (nunca no browser).

## Estrutura relevante
```
portfolio-react/
├─ api/chat.py          ← função serverless (POST /api/chat)
├─ requirements.txt     ← openai (deps da função)
├─ vercel.json          ← rewrite SPA (rotas /projetos, /chat → index.html)
├─ src/...              ← app React
└─ package.json         ← build Vite (Vercel detecta sozinho)
```

## Opção A — Vercel CLI (mais rápido)
```bash
npm i -g vercel
cd portfolio-react
vercel login
vercel                       # 1º deploy (preview) — aceitar os padrões (framework: Vite)
vercel env add NVIDIA_API_KEY     # cole a chave quando pedir; escolha Production (e Preview)
vercel --prod                # publica em produção
```

## Opção B — GitHub + dashboard
1. Suba a pasta `portfolio-react/` para um repositório no GitHub.
2. Em vercel.com → **Add New… → Project** → importe o repo.
3. **Root Directory:** `portfolio-react` (se o repo tiver mais pastas) — senão deixe a raiz.
   Framework Preset: **Vite** (detecta sozinho).
4. **Settings → Environment Variables:** adicione `NVIDIA_API_KEY` = sua chave da NVIDIA.
   (Opcional: `NVIDIA_MODEL` = `meta/llama-3.3-70b-instruct`.)
5. **Deploy.**

## Variáveis de ambiente
| Nome | Valor | Onde |
|------|-------|------|
| `NVIDIA_API_KEY` | sua chave do NVIDIA NIM | **obrigatória** |
| `NVIDIA_MODEL` | `meta/llama-3.3-70b-instruct` (padrão) | opcional |

## Testar localmente (com a função Python)
O `npm run dev` (Vite) **não** roda a função Python. Para testar o chat localmente:
```bash
cd portfolio-react
vercel dev            # serve o site + /api/chat juntos em localhost:3000
```
Defina `NVIDIA_API_KEY` no ambiente ou em `.env` (já ignorado pelo git).

> Alternativa de dev sem Vercel: aponte `VITE_CHAT_ENDPOINT` para outro backend que
> aceite `POST {messages:[...]}` e retorne `{reply}`.

## Notas
- Rotas SPA (`/projetos`, `/chat`) funcionam graças ao rewrite em `vercel.json`.
- A função é **stateless**: o histórico da conversa é enviado pelo cliente a cada mensagem
  (o Vercel não mantém estado entre invocações).
- Após o deploy, o chat usa `/api/chat` na mesma origem — não precisa configurar URL.
