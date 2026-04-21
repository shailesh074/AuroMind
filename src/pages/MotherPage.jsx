import { Link } from 'react-router-dom'
import MotherQuote from '../components/MotherQuote'

export default function MotherPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid var(--gold-border)',
        background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div className="shimmer-text" style={{
          fontFamily: 'var(--font-display)', fontSize: '1.1rem',
          letterSpacing: '0.2em', fontWeight: 600
        }}>
          AUROMIND
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link to="/" style={{
            padding: '0.4rem 1rem', borderRadius: '20px',
            border: '1px solid var(--gold-border)', background: 'var(--gold-glow)',
            color: 'var(--gold-light)', textDecoration: 'none',
            fontFamily: 'var(--font-ui)', fontSize: '0.75rem', letterSpacing: '0.08em'
          }}>
            ← Chat
          </Link>
          <Link to="/about" style={{
            padding: '0.4rem 1rem', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--white-dim)', textDecoration: 'none',
            fontFamily: 'var(--font-ui)', fontSize: '0.75rem', letterSpacing: '0.08em'
          }}>
            About
          </Link>
        </div>
      </header>
      <MotherQuote />
    </div>
  )
}
