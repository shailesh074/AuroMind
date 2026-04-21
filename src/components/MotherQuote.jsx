import { useState, useEffect } from 'react'
import motherPhotosBase64 from '../motherPhotos'

const quotes = [
  { text: "Be sincere and the rest will follow.", context: "On the spiritual path" },
  { text: "The Divine loves you more than you can imagine.", context: "On Divine love" },
  { text: "Begin always. Never give up.", context: "On perseverance" },
  { text: "Every difficulty is an opportunity — the Divine is pressing you to go deeper.", context: "On obstacles" },
  { text: "Gratitude is the most powerful opening toward the Divine.", context: "On gratitude" },
  { text: "The most important thing is not what you do but the consciousness in which you do it.", context: "On consciousness" },
  { text: "Progress is the very nature of divine life.", context: "On progress" },
  { text: "Call the Divine sincerely, even once, from the depths of your heart, and the response will come.", context: "On prayer" },
  { text: "True love is not an emotion — it is a state of consciousness.", context: "On love" },
  { text: "When you feel you cannot go on, that is the moment the Divine is closest to you.", context: "On surrender" },
  { text: "Do not seek love from others — become love. That is the only fulfillment.", context: "On love" },
  { text: "Even when you cannot feel the Divine's presence, trust that it is there. The sun does not stop shining because clouds cover it.", context: "On faith" },
  { text: "A smile given from the soul can change the world.", context: "On joy" },
  { text: "Put yourself in the hands of the Divine completely and trust that what happens is for the best.", context: "On trust" },
  { text: "Before sleeping, give yourself to the Divine. Ask for the night to be used for growth and progress.", context: "On sleep" },
  { text: "The body is not the enemy. It is the field where the greatest transformation must happen.", context: "On the body" },
  { text: "Do not complain of your difficulties. They are your greatest teachers.", context: "On difficulties" },
  { text: "Depression is a form of indulgence. The remedy is not self-pity but aspiration.", context: "On depression" },
  { text: "All of life can be made into yoga. The way you eat, the way you speak, the way you work — all can be an offering.", context: "On daily life" },
  { text: "Each child carries a divine purpose. Education should help that purpose unfold, not suppress it.", context: "On education" },
]

export default function MotherQuote() {
  const [current, setCurrent] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    // Random start
    setCurrent(Math.floor(Math.random() * quotes.length))
    setPhotoIndex(Math.floor(Math.random() * motherPhotosBase64.length))
  }, [])

  const next = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % quotes.length)
      setPhotoIndex(prev => (prev + 1) % motherPhotosBase64.length)
      setAnimating(false)
    }, 400)
  }

  const quote = quotes[current]

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      padding: '1.5rem 1rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>

        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="shimmer-text" style={{
            fontFamily: 'var(--font-display)', fontSize: '0.75rem',
            letterSpacing: '0.3em', marginBottom: '0.5rem'
          }}>
            THE MOTHER
          </div>
          <div style={{ color: 'var(--white-dim)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Mirra Alfassa · 1878 – 1973
          </div>
        </div>

        {/* Photo */}
        <div style={{
          width: '180px', height: '220px', margin: '0 auto 2rem',
          borderRadius: '16px',
          border: '2px solid var(--gold-border)',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(212,175,55,0.15)',
          transition: 'opacity 0.4s ease',
          opacity: animating ? 0 : 1,
        }}>
          <img
            src={motherPhotosBase64[photoIndex]}
            alt="The Mother"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>

        {/* Quote */}
        <div className="glass" style={{
          borderRadius: 'var(--radius-lg)', padding: '2rem',
          borderLeft: '3px solid var(--gold-primary)',
          transition: 'opacity 0.4s ease',
          opacity: animating ? 0 : 1,
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--gold-primary)' }}>❝</div>
          <p style={{
            color: 'var(--white-soft)', fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontStyle: 'italic',
            lineHeight: 1.8, marginBottom: '1rem'
          }}>
            {quote.text}
          </p>
          <p style={{
            color: 'var(--gold-dim)', fontFamily: 'var(--font-display)',
            fontSize: '0.7rem', letterSpacing: '0.15em'
          }}>
            — THE MOTHER · {quote.context.toUpperCase()}
          </p>
        </div>

        {/* Next button */}
        <button onClick={next} style={{
          padding: '0.75rem 2rem', borderRadius: '30px',
          border: '1px solid var(--gold-border)',
          background: 'var(--gold-glow)',
          color: 'var(--gold-light)', cursor: 'pointer',
          fontFamily: 'var(--font-display)', fontSize: '0.8rem',
          letterSpacing: '0.15em', transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          margin: '0 auto'
        }}>
          ✦ Next Blessing
        </button>

        <p style={{
          marginTop: '1.5rem', color: 'var(--white-faint)',
          fontFamily: 'var(--font-ui)', fontSize: '0.7rem', letterSpacing: '0.05em'
        }}>
          Click for a new blessing from The Mother
        </p>
      </div>
    </div>
  )
}
