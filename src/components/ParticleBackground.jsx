import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.6 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
        // Gold or white
        this.isGold = Math.random() > 0.5
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        const lifeRatio = this.life / this.maxLife
        if (lifeRatio < 0.1) this.opacity = lifeRatio * 6 * 0.7
        else if (lifeRatio > 0.8) this.opacity = (1 - lifeRatio) * 5 * 0.7
        if (this.life >= this.maxLife) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        if (this.isGold) {
          ctx.fillStyle = '#D4AF37'
          ctx.shadowBlur = 4
          ctx.shadowColor = '#D4AF37'
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.8)'
          ctx.shadowBlur = 2
          ctx.shadowColor = 'white'
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000))
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }

    // Ambient orbs
    const orbs = [
      { x: 0.15, y: 0.2, r: 200, color: 'rgba(212,175,55,0.04)' },
      { x: 0.85, y: 0.7, r: 250, color: 'rgba(212,175,55,0.03)' },
      { x: 0.5, y: 0.9, r: 180, color: 'rgba(150,100,200,0.03)' },
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw ambient orbs
      orbs.forEach(orb => {
        const grd = ctx.createRadialGradient(
          orb.x * canvas.width, orb.y * canvas.height, 0,
          orb.x * canvas.width, orb.y * canvas.height, orb.r
        )
        grd.addColorStop(0, orb.color)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(orb.x * canvas.width, orb.y * canvas.height, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach(p => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0
      }}
    />
  )
}
