import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '../styles/ChatPopup.module.css'

export default function ChatPopup({ audioEnabled = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [hasUserReplied, setHasUserReplied] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const popupSound = useRef(null);
  const messageSound = useRef(null);

  // Initialisiere Audio-Objekte nach dem Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      popupSound.current = new Audio('/notification-18-270129.mp3');
      messageSound.current = new Audio('/notification-18-270129.mp3');
      
      // Lautstärke einstellen
      popupSound.current.volume = 0.5;
      messageSound.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Popup Sound abspielen wenn Audio erlaubt
      if (audioEnabled && popupSound.current) {
        popupSound.current.play().catch(err => console.log('Audio play failed:', err));
      }
      
      setIsTyping(true)
      
      setTimeout(() => {
        setIsTyping(false)
        setMessages([{
          sender: 'Meliax',
          text: 'Hallo na wie geht es dir?',
          time: new Date().toLocaleTimeString()
        }])
        // Nachrichtenton abspielen
        if (audioEnabled && messageSound.current) {
          messageSound.current.play().catch(err => console.log('Audio play failed:', err));
        }
      }, 4000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [audioEnabled])

  // Nachrichtenton bei Meliax Antworten
  useEffect(() => {
    if (messages.length > 0 && 
        messages[messages.length-1].sender === 'Meliax' && 
        audioEnabled && 
        messageSound.current) {
      messageSound.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [messages, audioEnabled])

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
      // Warte 2 Sekunden bevor "schreibt..." erscheint
      setTimeout(() => {
        setIsTyping(true)
        
        // Nach weiteren 4 Sekunden die Antwort anzeigen
        setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, {
            sender: 'Meliax',
            text: 'Komm in mein livechat hab bock auf was dreckiges 😈',
            time: new Date().toLocaleTimeString()
          }])
          setHasUserReplied(true)
        }, 4000)
      }, 2000)
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