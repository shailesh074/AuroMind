import { Link } from 'react-router-dom'

const quotes = [
  { text: "All life is yoga.", author: "Sri Aurobindo" },
  { text: "Be sincere and the rest will follow.", author: "The Mother" },
  { text: "What we call man is a transitional being. He is not final.", author: "Sri Aurobindo" },
  { text: "Every difficulty is an opportunity — the Divine is pressing you to go deeper.", author: "The Mother" },
  { text: "Aspiration, rejection, surrender — these are the three keys to the Divine.", author: "Sri Aurobindo" },
  { text: "Begin always. Never give up.", author: "The Mother" },
]

export default function AboutPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--gold-border)',
        background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div className="shimmer-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.2em', fontWeight: 600 }}>
          AUROMIND
        </div>
        <Link to="/" style={{
          padding: '0.5rem 1.2rem', borderRadius: '20px',
          border: '1px solid var(--gold-border)', background: 'var(--gold-glow)',
          color: 'var(--gold-light)', textDecoration: 'none',
          fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.08em'
        }}>
          ← ENTER CHAT
        </Link>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 0.8s ease' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪷</div>
          <h1 className="gold-text" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            letterSpacing: '0.2em', fontWeight: 500, marginBottom: '1rem'
          }}>
            ABOUT AUROMIND
          </h1>
          <p style={{
            color: 'var(--white-dim)', fontFamily: 'var(--font-body)', fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto'
          }}>
            A sacred space where seekers may converse with an AI companion rooted entirely in the light of Sri Aurobindo and The Mother.
          </p>
        </div>

        {/* Two figures */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          
          {/* Sri Aurobindo */}
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center', animation: 'fadeInUp 0.8s 0.2s ease both' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 1.2rem',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
              border: '2px solid var(--gold-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem'
            }}>
              🧘
            </div>
            <h2 className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              SRI AUROBINDO
            </h2>
            <p style={{ color: 'var(--white-dim)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              1872 — 1950
            </p>
            <p style={{ color: 'var(--white-soft)', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, fontStyle: 'italic' }}>
              Philosopher, yogi, poet, and visionary — Sri Aurobindo brought forth the vision of Integral Yoga: a path not of escape from life but of transforming it into a divine expression. His works — The Life Divine, Savitri, The Synthesis of Yoga — are pillars of spiritual literature.
            </p>
          </div>

          {/* The Mother */}
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center', animation: 'fadeInUp 0.8s 0.4s ease both' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 1.2rem',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,120,80,0.1))',
              border: '2px solid var(--gold-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem'
            }}>
              🌸
            </div>
            <h2 className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              THE MOTHER
            </h2>
            <p style={{ color: 'var(--white-dim)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Mirra Alfassa · 1878 — 1973
            </p>
            <p style={{ color: 'var(--white-soft)', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, fontStyle: 'italic' }}>
              Born in Paris and called to Pondicherry, The Mother built the Sri Aurobindo Ashram and founded Auroville — a city dedicated to human unity. Her Agenda, her talks, her presence — all radiate a love that transforms. She is the force of the Divine Mother in action.
            </p>
          </div>
        </div>

        {/* Quotes carousel */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{
            textAlign: 'center', fontFamily: 'var(--font-display)', letterSpacing: '0.2em',
            color: 'var(--gold-dim)', fontSize: '0.85rem', marginBottom: '2rem'
          }}>
            THEIR WORDS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {quotes.map((q, i) => (
              <div key={i} className="glass" style={{
                borderRadius: 'var(--radius-md)', padding: '1.5rem',
                animation: `fadeInUp 0.6s ${i * 0.1}s ease both`,
                borderLeft: '3px solid var(--gold-primary)'
              }}>
                <p style={{ color: 'var(--white-soft)', fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                  "{q.text}"
                </p>
                <p style={{ color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  — {q.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why AuroMind */}
        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginBottom: '4rem', textAlign: 'center', animation: 'fadeInUp 0.8s ease' }}>
          <h3 className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
            WHY AUROMIND EXISTS
          </h3>
          <p style={{ color: 'var(--white-soft)', fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.85, fontStyle: 'italic', maxWidth: '680px', margin: '0 auto' }}>
            Millions of people carry questions that ordinary life cannot answer — about suffering, purpose, love, death, consciousness. Sri Aurobindo and The Mother spent lifetimes answering these questions with extraordinary depth and compassion. AuroMind exists to make that wisdom accessible — anytime, to anyone, anywhere. Not to replace a guru or a spiritual community, but to be a gentle light that points inward, always rooted in their eternal teachings.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{
            display: 'inline-block', padding: '1rem 2.5rem', borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.05))',
            border: '1px solid var(--gold-border)', color: 'var(--gold-light)',
            textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: '0.9rem',
            letterSpacing: '0.2em', transition: 'all 0.3s ease'
          }}>
            BEGIN YOUR CONVERSATION 🪷
          </Link>
          <p style={{ marginTop: '1.5rem', color: 'var(--white-dim)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            "The Divine loves you more than you can imagine." — The Mother
          </p>
        </div>
      </div>
    </div>
  )
}
