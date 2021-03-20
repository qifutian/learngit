import { useState } from 'react'
import Head from 'next/head'
import ReactModal from 'react-modal'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [tiles, setTiles] = useState([
    {
      title: '百度一下，你就知道',
      link: 'https://www.baidu.com',
    },
  ])

  const handleSubmit = () => {
    setTiles([
      ...tiles,
      {
        title,
        link,
      },
    ])
    setVisible(false)
    setTitle('')
    setLink('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Google</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.google} src="/google.png" alt="google" />
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="在 Google 上搜索，或者输入一个网址" />
          <span className={styles.icon}></span>
          <button
            className={styles.voiceSearchButton}
            title="语音搜索"
          ></button>
        </div>
        <div className={styles.quick}>
          {tiles.map((tile, index) => (
            <a
              key={index}
              className={styles.tile}
              title={tile.title}
              href={tile.link}
            >
              <div className={styles.tileIcon}>
                <img draggable="false" src={`${tile.link}/favicon.ico`} />
              </div>
              <div className={styles.tileTitle}>
                <span>{tile.title}</span>
              </div>
            </a>
          ))}
          {tiles.length < 10 && (
            <button
              className={styles.addShortcut}
              onClick={() => setVisible(true)}
            >
              <div className={styles.tileIcon}>
                <div className={styles.addShortcutIcon} draggable="false"></div>
              </div>
              <div className={styles.tileTitle}>
                <span>添加快捷方式</span>
              </div>
            </button>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>

      <ReactModal
        isOpen={visible}
        ariaHideApp={false}
        onRequestClose={() => setVisible(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {},
        }}
      >
        <p className="modal--header">添加快捷方式</p>
        <div className="modal--body">
          <p>
            名称
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p>
            网址
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </p>
        </div>
        <div className="modal--footer">
          <button onClick={() => setVisible(false)}>取消</button>
          <button onClick={handleSubmit}>确定</button>
        </div>
      </ReactModal>
    </div>
  )
}
