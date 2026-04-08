import { useState, useRef, useEffect, useCallback } from 'react'

const PAGES = ['cover', 'dad', 'mum', 'auntie', 'ammy', 'ian', 'final']
const CANDLE_COLORS = ['#ff6eb4', '#a78bfa', '#34d399', '#60a5fa', '#fbbf24']

function Sparkles() {
  const sparks = [
    { w: 12, h: 12, top: '16%', left: '20%', dur: '2.3s', delay: '0s' },
    { w: 9,  h: 9,  top: '28%', left: '78%', dur: '2s',   delay: '.4s' },
    { w: 14, h: 14, top: '62%', left: '16%', dur: '2.7s', delay: '.9s' },
    { w: 10, h: 10, top: '72%', left: '84%', dur: '2.2s', delay: '1.3s' },
    { w: 8,  h: 8,  top: '45%', left: '88%', dur: '1.9s', delay: '.2s' },
  ]
  return sparks.map((s, i) => (
    <div key={i} className="sparkle" style={{ width: s.w, height: s.h, top: s.top, left: s.left, animationDuration: s.dur, animationDelay: s.delay }} />
  ))
}

function Stars() {
  const stars = [
    { w: 4, top: '10%', left: '15%', delay: '0s' },
    { w: 3, top: '18%', left: '82%', delay: '.6s' },
    { w: 5, top: '32%', left: '92%', delay: '1.2s' },
    { w: 3, top: '58%', left: '10%', delay: '.4s' },
    { w: 4, top: '78%', left: '88%', delay: '.9s' },
    { w: 3, top: '88%', left: '42%', delay: '1.5s' },
    { w: 4, top: '22%', left: '52%', delay: '.7s' },
    { w: 3, top: '68%', left: '68%', delay: '1.3s' },
  ]
  return stars.map((s, i) => (
    <span key={i} className="star" style={{ width: s.w, height: s.w, top: s.top, left: s.left, animationDelay: s.delay }} />
  ))
}

function CoverPage({ onNext }) {
  return (
    <div className="page page-cover active">
      <Sparkles />
      <div className="cover-emoji">🎉</div>
      <h1 className="cover-title">Happy Birthday<br />Melissa Makori 🎉</h1>
      <p className="cover-sub">A special story made just for you 💖</p>
      <button className="btn btn-open" onClick={onNext}>Open Your Story 📖</button>
    </div>
  )
}

function MessagePage({ icon, titleColor, title, msg, onNext, onBack, pageNum, nextStyle }) {
  return (
    <div className="page active">
      <div className="page-icon">{icon}</div>
      <h2 className="page-title" style={{ color: titleColor }}>{title}</h2>
      <p className="page-msg">{msg}</p>
      <button className="btn btn-next" style={nextStyle} onClick={onNext}>Next →</button>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← Back</button>
        <span className="page-num">{pageNum} / 6</span>
      </div>
    </div>
  )
}

function AmmyPage({ onNext, onBack }) {
  const [popped, setPopped] = useState([false, false, false, false])

  function popBalloon(i) {
    if (popped[i]) return
    setPopped(p => { const n = [...p]; n[i] = true; return n })
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)()
      const o = ac.createOscillator(), g = ac.createGain()
      o.connect(g); g.connect(ac.destination)
      o.frequency.setValueAtTime(650, ac.currentTime)
      o.frequency.exponentialRampToValueAtTime(100, ac.currentTime + 0.16)
      g.gain.setValueAtTime(0.4, ac.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.16)
      o.start(); o.stop(ac.currentTime + 0.16)
    } catch {}
  }

  return (
    <div className="page page-ammy active">
      <div className="page-icon">🎈</div>
      <h2 className="page-title" style={{ color: '#c07000' }}>From Ammy 🎈</h2>
      <p className="page-msg">
        MELISSA!! 🎉<br /><br />
        Happy Birthday to the most amazing sister in the universe! You make every moment more fun and every memory more special.<br /><br />
        Pop the balloons! 👇
      </p>
      <div className="balloon-row">
        {popped.map((p, i) => (
          <button key={i} className={`balloon${p ? ' popped' : ''}`} onClick={() => popBalloon(i)} style={p ? { visibility: 'hidden' } : {}}>🎈</button>
        ))}
      </div>
      <button className="btn btn-next" onClick={onNext}>Next →</button>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← Back</button>
        <span className="page-num">4 / 6</span>
      </div>
    </div>
  )
}

function FinalPage({ onBack, onRestart }) {
  const [flames, setFlames] = useState([true, true, true, true, true])
  const [wished, setWished] = useState(false)
  const confettiRef = useRef(null)

  const blowOne = useCallback((i) => {
    setFlames(f => { const n = [...f]; n[i] = false; return n })
  }, [])

  const blowAll = useCallback(() => setFlames([false, false, false, false, false]), [])

  useEffect(() => {
    if (flames.every(f => !f) && !wished) {
      setWished(true)
      launchConfetti(confettiRef.current)
    }
  }, [flames, wished])

  return (
    <div className="page page-final active">
      <Stars />
      <canvas id="confetti-canvas" ref={confettiRef} />
      <h1 className="final-title">HAPPY 11TH BIRTHDAY 🎂💙</h1>
      <div className="candles-row">
        {CANDLE_COLORS.map((col, i) => (
          <div key={i} className="candle" onClick={() => blowOne(i)}>
            <div className={`flame${flames[i] ? '' : ' out'}`} />
            <div className="candle-body" style={{ background: col }} />
          </div>
        ))}
      </div>
      <div className="cake-wrap" onClick={blowAll}>
        <span className="cake-emoji">{wished ? '🎊' : '🎂'}</span>
        <p className="cake-hint">{wished ? '🎉 Make a wish! 🎉' : '👆 Click to blow out the candles!'}</p>
      </div>
      <p className="final-msg">
        We love you to the moon and back, Melissa. 🌙✨<br />
        May this year be your most magical yet!
      </p>
      <div className="nav">
        <button className="nav-back" onClick={onBack}>← Back</button>
        <button className="nav-back" onClick={onRestart}>🔄 Start Over</button>
      </div>
    </div>
  )
}

function launchConfetti(canvas) {
  if (!canvas) return
  canvas.style.display = 'block'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  const cols = ['#ff6eb4','#ffd700','#a78bfa','#34d399','#60a5fa','#fb923c','#f472b6','#fff']
  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -30 - Math.random() * 400,
    vx: (Math.random() - 0.5) * 5,
    vy: 3 + Math.random() * 4,
    col: cols[Math.floor(Math.random() * cols.length)],
    w: 8 + Math.random() * 10,
    h: 6 + Math.random() * 6,
    rot: Math.random() * 360,
    rv: (Math.random() - 0.5) * 8,
  }))
  let frame = 0
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pieces.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.rv
      if (p.y > canvas.height + 30) { p.y = -30; p.x = Math.random() * canvas.width }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180)
      ctx.fillStyle = p.col; ctx.globalAlpha = 0.9
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore()
    })
    if (++frame < 400) requestAnimationFrame(draw)
    else canvas.style.display = 'none'
  }
  draw()
}

export default function App() {
  const [pageIdx, setPageIdx] = useState(0)
  const [ribbonSnapped, setRibbonSnapped] = useState(false)
  const stackRef = useRef(null)

  const flipTo = useCallback((idx) => {
    const progress = (idx / (PAGES.length - 1)) * 180
    if (stackRef.current) stackRef.current.style.transform = `rotateY(-${progress}deg)`
    setTimeout(() => setPageIdx(idx), 600)
  }, [])

  const snapRibbon = useCallback(() => {
    if (!ribbonSnapped) {
      document.body.classList.add('ribbon-snapped')
      setRibbonSnapped(true)
      setTimeout(() => flipTo(0), 1000)
    } else {
      if (pageIdx < PAGES.length - 1) flipTo(pageIdx + 1)
    }
  }, [ribbonSnapped, pageIdx, flipTo])

  useEffect(() => {
    const handler = (e) => {
      if (!ribbonSnapped && !e.target.closest('.book')) snapRibbon()
    }
    document.body.addEventListener('click', handler)
    return () => document.body.removeEventListener('click', handler)
  }, [ribbonSnapped, snapRibbon])

  // Touch swipe
  const touchStartX = useRef(0)
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 60) dx < 0 ? flipTo(Math.min(pageIdx + 1, PAGES.length - 1)) : flipTo(Math.max(pageIdx - 1, 0))
  }

  const next = () => flipTo(Math.min(pageIdx + 1, PAGES.length - 1))
  const back = () => flipTo(Math.max(pageIdx - 1, 0))

  const currentPage = PAGES[pageIdx]

  return (
    <div className="book-container">
      <div className={`ribbon${ribbonSnapped ? ' snapped' : ''}`} onClick={snapRibbon} />
      <div className="book" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="pages-stack" ref={stackRef}>
          {currentPage === 'cover'  && <CoverPage onNext={next} />}
          {currentPage === 'dad'    && (
            <MessagePage icon="💙" titleColor="#1565c0" title="From Dad 💙" onNext={next} onBack={back} pageNum={1} msg={
              <>My dearest Melissa,<br /><br />Eleven years ago you changed my world forever. Every single day since, you have made it brighter and more full of joy than I ever imagined.<br /><br />Watching you grow into the smart, kind, and wonderful girl you are fills my heart with more pride than words can hold. You are my greatest adventure — keep shining, always. ⭐</>
            } />
          )}
          {currentPage === 'mum'    && (
            <MessagePage icon="💖" titleColor="#c0396b" title="From Mum 💖" onNext={next} onBack={back} pageNum={2} msg={
              <>My precious Melissa,<br /><br />You are the light of my life and the reason I smile every single day. From the very first moment I held you, I knew you were something extraordinary.<br /><br />You have a heart full of gold and a laugh that lights up every room. I fall more in love with who you are every single day. Happy Birthday, my darling princess. 👑</>
            } />
          )}
          {currentPage === 'auntie' && (
            <MessagePage icon="🌸" titleColor="#7b3fa0" title="From Auntie Sarah 💙" onNext={next} onBack={back} pageNum={3} msg={
              <>Sweet Melissa,<br /><br />You are growing into the most incredible young lady — curious, brave, and full of life. The world is brighter simply because you are in it.<br /><br />Never stop asking questions, never stop dreaming big, and never forget how truly special you are. Sending you the biggest birthday hug! 💜</>
            } />
          )}
          {currentPage === 'ammy'   && <AmmyPage onNext={next} onBack={back} />}
          {currentPage === 'ian'    && (
            <MessagePage icon="😎" titleColor="#1a7a4a" title="From Cousin Ian 😎" onNext={next} onBack={back} pageNum={5} nextStyle={{ background: 'linear-gradient(135deg,#1a7a4a,#34d399)' }} msg={
              <>Yo Melissa! 🎉<br /><br />You're not just my cousin — you're one of my favourite people. Keep smiling, keep winning, and keep being awesome 😎<br /><br />I'm really grateful to have you in my life. Hope today is absolutely epic — you deserve the best day ever! Happy Birthday!! 🎂🔥</>
            } />
          )}
          {currentPage === 'final'  && <FinalPage onBack={back} onRestart={() => flipTo(0)} />}
        </div>
      </div>
    </div>
  )
}
