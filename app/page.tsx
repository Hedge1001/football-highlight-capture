'use client'

import { useState } from 'react'
import styles from './page.module.css'

type Clip = { id: number; title: string; time: string; duration: string }

const initialClips: Clip[] = [
  { id: 1, title: 'Goal — 73\'  |  A. Morgan', time: '02:14 ago', duration: '00:18' },
  { id: 2, title: 'Big save — 61\'  |  J. Ellis', time: '18:42 ago', duration: '00:22' },
  { id: 3, title: 'Counter attack', time: '31:06 ago', duration: '00:15' },
]

export default function Home() {
  const [clips, setClips] = useState(initialClips)
  const [capturing, setCapturing] = useState(false)
  const [saved, setSaved] = useState(false)

  function captureHighlight() {
    if (capturing) return
    setCapturing(true)
    setSaved(false)
    window.setTimeout(() => {
      setClips((current) => [
        { id: Date.now(), title: 'Highlight captured', time: 'Just now', duration: '00:30' },
        ...current,
      ])
      setCapturing(false)
      setSaved(true)
    }, 650)
  }

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}><span /></div>
          <div><strong>SIDELINE</strong><small>HIGHLIGHT CAPTURE</small></div>
        </div>
        <div className={styles.session}><span className={styles.liveDot} /> LIVE SESSION <b>•••</b></div>
      </header>

      <section className={styles.matchCard}>
        <div className={styles.matchMeta}><span>LEAGUE MATCH</span><span>PREMIER DIVISION</span></div>
        <div className={styles.teams}>
          <div className={styles.team}><div className={styles.crest}>NR</div><strong>NORTHRIDGE</strong><b>2</b></div>
          <div className={styles.matchClock}><strong>74:32</strong><span>2ND HALF</span></div>
          <div className={styles.team}><b>1</b><strong>RIVERSIDE</strong><div className={`${styles.crest} ${styles.away}`}>RV</div></div>
        </div>
        <div className={styles.progress}><span /></div>
      </section>

      <section className={styles.captureArea}>
        <div className={styles.captureLabel}><span className={styles.recordDot} /> RECORDING NOW <span className={styles.pulseLine} /></div>
        <button className={`${styles.captureButton} ${capturing ? styles.isCapturing : ''}`} onClick={captureHighlight} aria-label="Capture highlight">
          <span className={styles.captureRing}><span className={styles.captureIcon} /></span>
          <strong>{capturing ? 'SAVING' : saved ? 'SAVED' : 'CAPTURE'}</strong>
          <small>{capturing ? 'Creating clip...' : 'Tap to save the last 30 seconds'}</small>
        </button>
        <div className={styles.buffer}><span className={styles.bufferLabel}>ROLLING BUFFER</span><span className={styles.bufferValue}>00:30 / 00:30</span><div className={styles.bufferTrack}><span /></div></div>
      </section>

      <section className={styles.clipsSection}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>YOUR SESSION</span><h2>Recent highlights</h2></div><button className={styles.viewAll}>VIEW ALL <span>→</span></button></div>
        <div className={styles.clipList}>
          {clips.map((clip, index) => <article className={styles.clip} key={clip.id}><div className={`${styles.thumbnail} ${index === 0 ? styles.fresh : ''}`}><span className={styles.play} /></div><div className={styles.clipInfo}><strong>{clip.title}</strong><span>{clip.time}</span></div><span className={styles.duration}>{clip.duration}</span><button className={styles.more} aria-label={`More options for ${clip.title}`}>•••</button></article>)}
        </div>
      </section>

      <footer><span>SIDELINE CAPTURE DEVICE</span><span className={styles.device}><i /> CONNECTED</span><span>V.2.4.0</span></footer>
    </main>
  )
}
