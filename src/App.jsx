import { useState, useRef, useEffect, useCallback } from 'react'

const PAGES = ['cover', 'dad', 'mum', 'auntie', 'ammy', 'ian', 'final']
const CANDLE_COLORS = ['#ff6eb4', '#a78bfa', '#34d399', '#60a5fa', '#fbbf24']

function FloatingEmojis({ emojis }) {
  return (
    <div className="floating-emojis" aria-hidden="true">
      {emojis.map((e, i) => (
        <span key={i} className="float-emoji" style={{ '--i': i, '--total': emojis.length }}>{e}</span>
      ))}
    </div>
  )
}

function Sparkles() {
  return (
    <div className="sparkles-wrap" aria-hidden="true">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="sparkle" style={{ '--i': i }} />
      ))}
    </div>
  )
}

function Stars() {
  return (
    <div className="stars-wrap" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <span key={i} className="star" style={{ '--i': i }} />
      ))}
    </div>
  )
}

function PageNav({ onBack, onNext, pageNum, total = 6, nextLabel = 'Next →', nextClass = '' }) {
  return (
    <div className="nav">
      <button className="nav-back" onClick={onBack}>← Back</button>
      <span className="page-num">{pageNum} / {total}</span>
      <button className={`nav-next ${nextClass}`} onClick={onNext}>{nextLabel}</button>
    </div>
  )
}

function CoverPage({ onNext }) {
  return (
    <div className="page page-cover">
      <Sparkles />
      <FloatingEmojis emojis={['🎀','⭐','🌟','💫','✨','🎊','🎁','🌸']} />
      <div className="cover-inner">
        <div className="cover-badge">🎂 11 Today! 🎂</div>
        <div className="cover-emoji">🎉</div>
        <h1 className="cover-title">Happy Birthday<br /><span className="cover-name">Melissa Makori</span></h1>
        <p className="cover-sub">A special story made just for you 💖</p>
        <button className="btn btn-open" onClick={onNext}>
          <span>Open Your Story</span> 📖
        </button>
      </div>
    </div>
  )
}

function DadPage({ onNext, onBack }) {
  return (
    <div className="page page-dad">
      <FloatingEmojis emojis={['⭐','💙','🌊','✨','💫','🔵']} />
      <div className="msg-card card-dad">
        <div className="card-header">
          <span className="card-icon">💙</span>
          <h2 className="card-title">From Dad</h2>
          <div className="card-underline" />
        </div>
        <p className="card-msg">
          My dearest Melissa,<br /><br />
          Eleven years ago you changed my world forever. Every single day since, you've made it brighter and more full of joy than I ever imagined.<br /><br />
          Watching you grow into the smart, kind, and wonderful girl you are fills my heart with more pride than words can hold.<br /><br />
          You are my greatest adventure — keep shining, always. ⭐
        </p>
        <div className="card-footer">— Dad 💙</div>
      </div>
      <PageNav onBack={onBack} onNext={onNext} pageNum={1} nextClass="next-blue" />
    </div>
  )
}

function MumPage({ onNext, onBack }) {
  return (
    <div className="page page-mum">
      <FloatingEmojis emojis={['💖','🌸','🌺','💕','🌷','✨','👑','🦋']} />
      <div className="msg-card card-mum">
        <div className="card-header">
          <span className="card-icon">💖</span>
          <h2 className="card-title">From Mum</h2>
          <div className="card-underline" />
        </div>
        <p className="card-msg">
          My precious Melissa,<br /><br />
          You are the light of my life and the reason I smile every single day. From the very first moment I held you, I knew you were something extraordinary.<br /><br />
          You have a heart full of gold and a laugh that lights up every room. I fall more in love with who you are every single day.<br /><br />
          Happy Birthday, my darling princess. 👑
        </p>
        <div className="card-footer">— Mum 💖</div>
      </div>
      <PageNav onBack={onBack} onNext={onNext} pageNum={2} nextClass="next-pink" />
    </div>
  )
}

function AuntiePage({ onNext, onBack }) {
  return (
    <div className="page page-auntie">
      <FloatingEmojis emojis={['🌸','💜','🦄','🌙','💫','🔮','🌟','🪄']} />
      <div className="msg-card card-auntie">
        <div className="card-header">
          <span className="card-icon">🌸</span>
          <h2 className="card-title">From Auntie Sarah</h2>
          <div className="card-underline" />
        </div>
        <p className="card-msg">
          Sweet Melissa,<br /><br />
          You are growing into the most incredible young lady — curious, brave, and full of life. The world is brighter simply because you are in it.<br /><br />
          Never stop asking questions, never stop dreaming big, and never forget how truly special you are.<br /><br />
          Sending you the biggest birthday hug! 💜
        </p>
        <div className="card-footer">— Auntie Sarah 🌸</div>
      </div>
      <PageNav onBack={onBack} onNext={onNext} pageNum={3} nextClass="next-purple" />
    </div>
  )
}

function AmmyPage({ onNext, onBack }) {
  const [popped, setPopped] = useState([false, false, false, false, false, false])
  const allPopped = popped.every(Boolean)

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
    <div className="page page-ammy">
      <FloatingEmojis emojis={['🎈','🎊','🎉','⭐','🌟','💛']} />
      <div className="ammy-inner">
        <div className="ammy-header">
          <span className="card-icon">🎈</span>
          <h2 className="card-title" style={{ color: '#b45309' }}>From Ammy</h2>
          <div className="card-underline" style={{ background: 'linear-gradient(90deg,#f59e0b,#fb923c)' }} />
        </div>
        <p className="ammy-msg">
          MELISSA!! 🎉 Happy Birthday to the most amazing sister in the universe!<br /><br />
          {allPopped ? '🎊 You popped them all!! You\'re a superstar! 🌟' : 'Pop ALL the balloons! 👇'}
        </p>
        <div className="balloon-grid">
          {popped.map((p, i) => (
            <button
              key={i}
              className={`balloon${p ? ' popped' : ''}`}
              onClick={() => popBalloon(i)}
              style={p ? { visibility: 'hidden' } : {}}
            >
              {['🎈','🎀','🎊','🎁','🌟','💛'][i]}
            </button>
          ))}
        </div>
      </div>
      <PageNav onBack={onBack} onNext={onNext} pageNum={4} nextClass="next-orange" />
    </div>
  )
}

function IanPage({ onNext, onBack }) {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="page page-ian">
      <FloatingEmojis emojis={['😎','🔥','🏆','⚡','🎮','🌿','✨','🎯']} />
      <div className="msg-card card-ian">
        <div className="card-header">
          <span className="card-icon">😎</span>
          <h2 className="card-title">From Cousin Ian</h2>
          <div className="card-underline" style={{ background: 'linear-gradient(90deg,#059669,#34d399)' }} />
        </div>
        <p className="card-msg">
          Yo Melissa! 🎉<br /><br />
          You're not just my cousin — you're one of my favourite people. Keep smiling, keep winning, and keep being awesome 😎<br /><br />
          I'm really grateful to have you in my life. Hope today is absolutely epic — you deserve the best day ever!<br /><br />
          Happy Birthday!! 🎂🔥
        </p>
        <button
          className={`fist-bump ${clicked ? 'bumped' : ''}`}
          onClick={() => setClicked(true)}
        >
          {clicked ? '💥 BOOM! 💥' : '👊 Fist bump!'}
        </button>
      </div>
      <PageNav onBack={onBack} onNext={onNext} pageNum={5} nextClass="next-green" />
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
    <div className="page page-final">
      <Stars />
      <canvas ref={confettiRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100, display: 'none' }} />
      <div className="final-inner">
        <h1 className="final-title">HAPPY<br />11TH BIRTHDAY<br />🎂💙</h1>
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
          <p className="cake-hint">{wished ? '🎉 Make a wish! 🎉' : '👆 Click to blow them all out!'}</p>
        </div>
        <p className="final-msg">
          We love you to the moon and back, Melissa. 🌙✨<br />
          May this year be your most magical yet!
        </p>
      </div>
      <div className="nav final-nav">
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
  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width, y: -30 - Math.random() * 400,
    vx: (Math.random() - 0.5) * 5, vy: 3 + Math.random() * 4,
    col: cols[Math.floor(Math.random() * cols.length)],
    w: 8 + Math.random() * 10, h: 6 + Math.random() * 6,
    rot: Math.random() * 360, rv: (Math.random() - 0.5) * 8,
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
    if (++frame < 450) requestAnimationFrame(draw)
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
          {currentPage === 'dad'    && <DadPage onNext={next} onBack={back} />}
          {currentPage === 'mum'    && <MumPage onNext={next} onBack={back} />}
          {currentPage === 'auntie' && <AuntiePage onNext={next} onBack={back} />}
          {currentPage === 'ammy'   && <AmmyPage onNext={next} onBack={back} />}
          {currentPage === 'ian'    && <IanPage onNext={next} onBack={back} />}
          {currentPage === 'final'  && <FinalPage onBack={back} onRestart={() => flipTo(0)} />}
        </div>
      </div>
    </div>
  )
}
