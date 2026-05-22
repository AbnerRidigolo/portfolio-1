import { useState, useRef, useEffect, useCallback } from 'react'

// Função serverless do Vercel (mesma origem → sem CORS).
// Em dev local use `vercel dev`, ou aponte VITE_CHAT_ENDPOINT para outro backend.
const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || '/api/chat'

const SUGGESTIONS = [
  'Quais serviços o Abner oferece?',
  'Você já fez projetos para fintech?',
  'Como funciona o processo de trabalho?',
  'Quanto custa um projeto de complexidade média?',
  'Pode me recomendar um projeto pra reduzir churn?',
]

const WELCOME = 'Olá! 👋 Sou o assistente do Abner Ridigolo, especialista em IA, dados e engenharia de dados. Como posso te ajudar hoje?'

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: WELCOME }])
  const [busy, setBusy] = useState(false)
  const [draft, setDraft] = useState('')
  const messagesRef = useRef(messages)
  const scrollRef = useRef(null)
  const taRef = useRef(null)

  useEffect(() => {
    messagesRef.current = messages
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  const autoResize = () => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 140) + 'px'
  }

  const send = useCallback(async (raw) => {
    const text = (raw ?? '').trim()
    if (!text || busy) return

    setBusy(true)
    const history = [...messagesRef.current, { role: 'user', text }]
    setMessages(history)
    setDraft('')
    requestAnimationFrame(() => { if (taRef.current) taRef.current.style.height = 'auto' })

    // Histórico enviado ao backend (stateless). Bolhas de erro não vão.
    const payload = history
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.text }))

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply || '(resposta vazia)' }])
    } catch {
      setMessages((m) => [...m, {
        role: 'error',
        text: 'Não consegui falar com o servidor agora. Tente novamente em alguns segundos.',
      }])
    } finally {
      setBusy(false)
    }
  }, [busy])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(draft)
    }
  }

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="h-[64px] md:h-[72px] shrink-0" aria-hidden="true" />

      <div className="flex-1 min-h-0 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[0.6fr_1fr] border-t border-white/8">

        {/* Left — info */}
        <aside className="hidden md:flex flex-col gap-6 px-10 lg:px-14 py-12 border-r border-white/8">
          <span className="text-[11px] tracking-[0.16em] uppercase text-white/30">Assistente AI</span>
          <h1 className="text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium tracking-[-0.02em] leading-[1.15]">
            Converse com o assistente do Abner
          </h1>
          <p className="text-[14px] leading-[1.8] text-white/45 font-light max-w-[380px]">
            Pergunte sobre serviços, projetos, setores atendidos, processo de trabalho
            ou faixas de preço. O assistente responde no seu idioma e te ajuda a entender
            como o Abner pode resolver o seu desafio de dados e IA.
          </p>
          <div className="flex flex-col gap-2.5 mt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={busy}
                className="text-left text-[13px] font-light text-white/70 border border-white/12 rounded-lg px-3.5 py-2.5 hover:border-white/30 hover:bg-white/[0.03] hover:text-white transition-all duration-200 disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
          <span className="mt-auto text-[10px] tracking-[0.12em] uppercase text-white/25">
            Powered by Agno + Gemini
          </span>
        </aside>

        {/* Right — chat */}
        <section className="flex flex-col min-h-0">
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-5 md:px-10 py-8 flex flex-col gap-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.text} />
            ))}
            {busy && <Typing />}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(draft) }}
            className="flex items-end gap-3 px-5 md:px-10 py-4 border-t border-white/8 bg-black"
          >
            <textarea
              ref={taRef}
              rows={1}
              value={draft}
              onChange={(e) => { setDraft(e.target.value); autoResize() }}
              onKeyDown={onKeyDown}
              placeholder="Escreva sua mensagem…"
              className="flex-1 resize-none bg-white/[0.04] border border-white/12 rounded-xl px-4 py-3 text-[14px] font-light text-white placeholder:text-white/30 focus:outline-none focus:border-white/35 transition-colors duration-200 max-h-[140px]"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Enviar"
              className="shrink-0 w-11 h-11 flex items-center justify-center bg-white text-black rounded-xl hover:bg-white/85 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </section>

      </div>
    </div>
  )
}

function Bubble({ role, text }) {
  const base = 'max-w-[80%] text-[14px] leading-[1.7] font-light px-4 py-3 rounded-2xl whitespace-pre-wrap break-words'
  if (role === 'user')
    return <div className={`${base} self-end bg-white text-black rounded-br-sm`}>{text}</div>
  if (role === 'error')
    return <div className={`${base} self-start bg-[#2a1410] text-[#e8a896] border border-[#5a2c20] rounded-bl-sm`}>{text}</div>
  return <div className={`${base} self-start bg-white/[0.06] text-white/85 rounded-bl-sm`}>{text}</div>
}

function Typing() {
  return (
    <div className="self-start flex gap-1.5 bg-white/[0.06] px-4 py-4 rounded-2xl rounded-bl-sm">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: '1s' }}
        />
      ))}
    </div>
  )
}
