import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/ChatPopup.module.css'

export default function ChatPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [hasUserReplied, setHasUserReplied] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Popup nach 5 Sekunden anzeigen
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Zeige "schreibt..." für 4 Sekunden
      setIsTyping(true)
      
      // Nach 4 Sekunden erste Nachricht anzeigen
      setTimeout(() => {
        setIsTyping(false)
        setMessages([{
          sender: 'Meliax',
          text: 'Hallo na wie geht es dir?',
          time: new Date().toLocaleTimeString()
        }])
      }, 4000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Benutzer-Nachricht hinzufügen
    setMessages(prev => [...prev, {
      sender: 'User',
      text: userInput,
      time: new Date().toLocaleTimeString()
    }])
    setUserInput('')

    // Meliax antwortet nach Benutzereingabe
    if (!hasUserReplied) {
      // Zeige "schreibt..." für 4 Sekunden
      setIsTyping(true)
      
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, {
          sender: 'Meliax',
          text: 'Komm in mein livechat hab bock auf was dreckiges 😈',
          time: new Date().toLocaleTimeString()
        }])
        setHasUserReplied(true)
      }, 4000)
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsVisible(false)} />
      <div className={styles.chatPopup}>
        <div className={styles.chatHeader}>
          <div className={styles.profileInfo}>
            <Image
              src="/image/porn1 (9).jpg"
              alt="Meliax Profile"
              width={60}
              height={60}
              className={styles.profilePic}
            />
            <div>
              <span className={styles.name}>Meliax</span>
              <span className={styles.status}>Online</span>
              {isTyping && <div className={styles.typing}>schreibt...</div>}
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setIsVisible(false)}
          >
            ×
          </button>
        </div>

        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${styles.message} ${msg.sender === 'Meliax' ? styles.meliaxMessage : styles.userMessage}`}
            >
              <div className={styles.messageContent}>
                <p>{msg.text}</p>
                <span className={styles.messageTime}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.chatInput}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Schreib eine Nachricht..."
            className={styles.inputField}
          />
          <button type="submit" className={styles.sendButton}>
            Senden
          </button>
        </form>
      </div>
    </>
  )
} 