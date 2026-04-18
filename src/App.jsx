import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ChatPage from './pages/ChatPage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import ParticleBackground from './components/ParticleBackground'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--black-deep)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="shimmer-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.2em' }}>
          AUROMIND
        </div>
        <div style={{ marginTop: '1rem', color: 'var(--gold-primary)', fontSize: '0.8rem', opacity: 0.6 }}>
          awakening...
        </div>
      </div>
    </div>
  )

  return (
    <Routes>
      <Route path="/" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <ParticleBackground />
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}
