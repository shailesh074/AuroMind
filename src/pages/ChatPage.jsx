import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../hooks/useChat'

export default function ChatPage() {
  const { user, logout } = useAuth()
  const { messages, sessions, currentSession, loading, sendMessage, startNewSession, loadSession, deleteSession } = useChat(user)
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)
  const [deletingId, setDeletingId] = useState(null)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    await sendMessage(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaChange = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  const handleDelete = async (e, sessionId) => {
    e.stopPropagation()
    setDeletingId(sessionId)
    await deleteSession(sessionId)
    setDeletingId(null)
  }

  const showWelcome = messages.length === 0 && !loading

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative', zIndex: 1 }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '0',
        minWidth: sidebarOpen ? '260px' : '0',
        height: '100vh',
        background: 'rgba(8,8,14,0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--gold-border)',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        position: 'fixed', left: 0, top: 0, zIndex: 10,
      }}>
        {/* Sidebar header */}
        <div style={{ padding: '1.2rem 1rem', borderBottom: '1px solid var(--gold-border)', flexShrink: 0 }}>
          <div className="shimmer-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.2em', fontWeight: 600 }}>
            AUROMIND
          </div>
          <div style={{ color: 'var(--white-dim)', fontSize: '0.7rem', fontFamily: 'var(--font-ui)', marginTop: '0.2rem' }}>
            Light on the Path
          </div>
        </div>

        {/* New chat button */}
        <div style={{ padding: '0.8rem' }}>
          <button onClick={startNewSession} style={{
            width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--gold-border)',
            background: 'var(--gold-glow)', color: 'var(--gold-light)',
            cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: '0.8rem',
            letterSpacing: '0.08em', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s ease'
          }}>
            ✦ New Conversation
          </button>
        </div>

        {/* Sessions list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0.5rem' }}>
          {sessions.length === 0 ? (
            <p style={{ color: 'var(--white-faint)', fontSize: '0.75rem', fontFamily: 'var(--font-ui)', textAlign: 'center', padding: '1rem', fontStyle: 'italic' }}>
              Your conversations will appear here
            </p>
          ) : sessions.map(session => (
            <div key={session.id} style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              marginBottom: '2px', borderRadius: 'var(--radius-sm)',
              background: currentSession === session.id ? 'rgba(212,175,55,0.1)' : 'transparent',
              borderLeft: currentSession === session.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              <button onClick={() => loadSession(session.id)} style={{
                flex: 1, padding: '0.65rem 0.5rem', border: 'none', textAlign: 'left',
                cursor: 'pointer', background: 'transparent',
                color: currentSession === session.id ? 'var(--gold-light)' : 'var(--white-dim)',
                fontFamily: 'var(--font-ui)', fontSize: '0.8rem',
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
              }}>
                {session.title || 'Conversation'}
              </button>
              {/* Delete button */}
              <button
                onClick={(e) => handleDelete(e, session.id)}
                disabled={deletingId === session.id}
                title="Delete conversation"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--white-faint)', padding: '0.4rem 0.5rem',
                  fontSize: '0.8rem', flexShrink: 0, borderRadius: '4px',
                  transition: 'all 0.2s ease', opacity: deletingId === session.id ? 0.4 : 1,
                }}
                onMouseEnter={e => e.target.style.color = '#ff6b6b'}
                onMouseLeave={e => e.target.style.color = 'var(--white-faint)'}
              >
                {deletingId === session.id ? '...' : '🗑'}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom links */}
        <div style={{ padding: '0.8rem', borderTop: '1px solid var(--gold-border)', flexShrink: 0 }}>
          <Link to="/mother" style={{
            display: 'block', padding: '0.5rem 0.75rem', color: 'var(--gold-dim)',
            fontFamily: 'var(--font-ui)', fontSize: '0.75rem', textDecoration: 'none',
            borderRadius: 'var(--radius-sm)', transition: 'color 0.2s ease',
            letterSpacing: '0.05em', marginBottom: '0.2rem'
          }}>
            🌸 The Mother's Blessings
          </Link>
          <Link to="/about" style={{
            display: 'block', padding: '0.5rem 0.75rem', color: 'var(--white-dim)',
            fontFamily: 'var(--font-ui)', fontSize: '0.75rem', textDecoration: 'none',
            borderRadius: 'var(--radius-sm)', transition: 'color 0.2s ease',
            letterSpacing: '0.05em'
          }}>
            ◎ About AuroMind
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', marginTop: '0.3rem' }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--gold-border)' }} />
            ) : (
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gold-glow)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--gold-primary)' }}>
                {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--white-dim)', fontFamily: 'var(--font-ui)', fontSize: '0.75rem' }}>
              {user?.displayName || user?.email?.split('@')[0]}
            </span>
            <button onClick={logout} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white-faint)',
              fontSize: '0.7rem', fontFamily: 'var(--font-ui)', padding: '0.2rem',
              transition: 'color 0.2s ease'
            }} title="Sign out">⏻</button>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column', height: '100vh',
        marginLeft: sidebarOpen ? '260px' : '0',
        transition: 'margin-left 0.3s ease',
      }}>
        {/* Top bar */}
        <header style={{
          padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          background: 'rgba(5,5,8,0.7)', backdropFilter: 'blur(10px)',
          flexShrink: 0, position: 'sticky', top: 0, zIndex: 5
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'none', border: '1px solid var(--gold-border)', cursor: 'pointer',
            color: 'var(--gold-primary)', padding: '0.4rem 0.6rem', borderRadius: '6px',
            fontSize: '0.9rem', transition: 'all 0.2s ease'
          }}>☰</button>
          <div style={{ flex: 1 }}>
            <span style={{ color: 'var(--gold-dim)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              🪷 In the light of Sri Aurobindo & The Mother
            </span>
          </div>
          <button onClick={startNewSession} style={{
            background: 'none', border: '1px solid var(--gold-border)', cursor: 'pointer',
            color: 'var(--gold-primary)', padding: '0.4rem 0.8rem', borderRadius: '6px',
            fontFamily: 'var(--font-ui)', fontSize: '0.75rem', letterSpacing: '0.08em',
            transition: 'all 0.2s ease'
          }}>+ New</button>
        </header>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>

            {/* Welcome screen */}
            {showWelcome && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', animation: 'fadeInUp 0.8s ease' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪷</div>
                <h2 className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', letterSpacing: '0.15em', fontWeight: 500, marginBottom: '0.8rem' }}>
                  NAMASTE, DEAR SEEKER
                </h2>
                <p style={{ color: 'var(--white-dim)', fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontStyle: 'italic', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                  I am rooted in the wisdom of Sri Aurobindo and The Mother. Ask anything — about life, suffering, purpose, or the path — and I will answer through their eternal light.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
                  {[
                    'What is the Psychic Being?',
                    'How do I find inner peace?',
                    'What is Integral Yoga?',
                    'How to deal with suffering?',
                    'What did The Mother say about love?',
                    'Tell me about Savitri',
                  ].map(q => (
                    <button key={q} onClick={() => { setInput(q); textareaRef.current?.focus() }} style={{
                      padding: '0.5rem 0.9rem', borderRadius: '20px',
                      border: '1px solid var(--gold-border)', background: 'var(--gold-glow)',
                      color: 'var(--gold-light)', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontStyle: 'italic',
                      transition: 'all 0.2s ease'
                    }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={msg.id || i} style={{
                display: 'flex', gap: '0.8rem', marginBottom: '1.5rem',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                animation: 'fadeInUp 0.4s ease'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: msg.role === 'user' ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.08)',
                  border: '1px solid var(--gold-border)', fontSize: '1rem'
                }}>
                  {msg.role === 'user' ? '🙏' : '🪷'}
                </div>
                <div style={{
                  maxWidth: '78%', padding: '0.9rem 1.1rem',
                  borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  backdropFilter: 'blur(10px)',
                }}>
                  {msg.role === 'assistant' && (
                    <div style={{ color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                      AUROMIND
                    </div>
                  )}
                  <p style={{
                    color: msg.role === 'user' ? 'var(--gold-light)' : 'var(--white-soft)',
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2.2vw, 1.05rem)',
                    lineHeight: 1.75, whiteSpace: 'pre-wrap'
                  }}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', animation: 'fadeInUp 0.3s ease' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,55,0.08)', border: '1px solid var(--gold-border)', fontSize: '1rem' }}>
                  🪷
                </div>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '20px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)',
                        animation: `dots 1.4s ${i * 0.2}s ease-in-out infinite`
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div style={{
          padding: '1rem', borderTop: '1px solid rgba(212,175,55,0.1)',
          background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(20px)', flexShrink: 0
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', gap: '0.6rem', alignItems: 'flex-end',
              background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gold-border)', padding: '0.6rem 0.8rem',
              backdropFilter: 'blur(10px)'
            }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything — the wisdom of Sri Aurobindo & The Mother awaits..."
                rows={1}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none',
                  color: 'var(--white-soft)', fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.6,
                  maxHeight: '160px', overflow: 'auto'
                }}
              />
              <button onClick={handleSend} disabled={!input.trim() || loading} style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, var(--gold-primary), var(--gold-dim))'
                  : 'rgba(255,255,255,0.05)',
                color: input.trim() && !loading ? '#000' : 'var(--white-dim)',
                fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>↑</button>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--white-faint)', fontFamily: 'var(--font-ui)', fontSize: '0.68rem', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
              Rooted in the teachings of Sri Aurobindo & The Mother • Enter to send
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
