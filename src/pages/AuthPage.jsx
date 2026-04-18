import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function AuthPage() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()
  const navigate = useNavigate()

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/')
    } catch (e) {
      setError('Could not sign in with Google. Please try again.')
    }
    setLoading(false)
  }

  const handleEmail = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, name)
      } else {
        await signInWithEmail(email, password)
      }
      navigate('/')
    } catch (e) {
      setError(e.message || e.code || JSON.stringify(e))
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', position: 'relative', zIndex: 1
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '50%',
            border: '1px solid var(--gold-border)',
            background: 'var(--gold-glow)',
            marginBottom: '1rem', fontSize: '1.8rem'
          }}>🪷</div>
          <h1 className="shimmer-text" style={{
            fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.25em', fontWeight: 600
          }}>AUROMIND</h1>
          <p style={{ color: 'var(--white-dim)', fontFamily: 'var(--font-body)', fontSize: '1rem', marginTop: '0.4rem', fontStyle: 'italic' }}>
            Light on the Path
          </p>
        </div>

        <div className="glass" style={{
          borderRadius: 'var(--radius-lg)', padding: '2rem',
          boxShadow: '0 0 60px rgba(212,175,55,0.05), 0 20px 60px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', marginBottom: '1.5rem', gap: '0.5rem' }}>
            {['signin', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }} style={{
                flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)',
                fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em',
                transition: 'all 0.3s ease',
                background: mode === m ? 'var(--gold-primary)' : 'transparent',
                color: mode === m ? '#000' : 'var(--white-dim)',
              }}>
                {m === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </button>
            ))}
          </div>

          <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {mode === 'signup' && (
              <input type="text" placeholder="Your name" value={name}
                onChange={e => setName(e.target.value)} required style={inputStyle} />
            )}
            <input type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)} required minLength={6} style={inputStyle} />

            {error && (
              <p style={{ color: '#ff7070', fontSize: '0.8rem', fontFamily: 'var(--font-ui)', textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '0.85rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--gold-border)',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
              color: 'var(--gold-light)', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '0.15em',
              transition: 'all 0.3s ease', opacity: loading ? 0.6 : 1, marginTop: '0.5rem'
            }}>
              {loading ? 'ONE MOMENT...' : (mode === 'signin' ? 'ENTER THE PATH' : 'BEGIN THE JOURNEY')}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.2rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--gold-border)' }} />
            <span style={{ color: 'var(--white-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-ui)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gold-border)' }} />
          </div>

          <button onClick={handleGoogle} disabled={loading} style={{
            width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--white-soft)', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            transition: 'all 0.3s ease', opacity: loading ? 0.6 : 1
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--white-dim)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontStyle: 'italic' }}>
          "All life is yoga." — Sri Aurobindo
        </p>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/about" style={{ color: 'var(--gold-dim)', fontFamily: 'var(--font-ui)', fontSize: '0.75rem', textDecoration: 'none', letterSpacing: '0.1em' }}>
            ABOUT AUROMIND →
          </Link>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--gold-border)', background: 'rgba(255,255,255,0.04)',
  color: 'var(--white-soft)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.3s ease', width: '100%'
}