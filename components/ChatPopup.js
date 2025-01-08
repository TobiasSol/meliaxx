import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '../styles/ChatPopup.module.css'

export default function ChatPopup({ audioEnabled = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [hasUserReplied, setHasUserReplied] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)

  const popupSound = useRef(null);
  const messageSound = useRef(null);

  // Seiten-Load-Status überprüfen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setPageLoaded(true);
      } else {
        window.addEventListener('load', () => setPageLoaded(true));
      }
    }
  }, []);

  // Audio-Objekte initialisieren
  useEffect(() => {
    if (typeof window !== 'undefined') {
      popupSound.current = new Audio('/notification-18-270129.mp3');
      messageSound.current = new Audio('/notification-18-270129.mp3');
      
      popupSound.current.volume = 0.5;
      messageSound.current.volume = 0.3;
    }
  }, []);

  // Popup-Timer starten erst nach Seitenladen
  useEffect(() => {
    if (!pageLoaded) return;

    const timer = setTimeout(() => {
      setIsVisible(true)
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
        if (audioEnabled && messageSound.current) {
          messageSound.current.play().catch(err => console.log('Audio play failed:', err));
        }
      }, 4000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [pageLoaded, audioEnabled])

  // Nachrichtenton bei Meliax Antworten
  useEffect(() => {
    if (messages.length > 0 && 
        messages[messages.length-1].sender === 'Meliax' && 
        audioEnabled && 
        messageSound.current) {
      messageSound.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [messages, audioEnabled])

  // Profilbild vorladen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preloadImage = document.createElement('img');
      preloadImage.src = '/image/chatfoto.jpg';
    }
  }, []);

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

  if (!isVisible) {
    // Verstecktes Image-Element zum Vorladen
    return (
      <div style={{ display: 'none', width: 0, height: 0, overflow: 'hidden' }}>
        <Image
          src="/image/chatfoto.jpg"
          alt="Preload Meliax Profile"
          width={60}
          height={60}
          priority={true}
          quality={100}
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsVisible(false)} />
      <div className={styles.chatPopup}>
        <div className={styles.chatHeader}>
          <div className={styles.profileInfo}>
            <Image
              src="/image/chatfoto.jpg"
              alt="Meliax Profile"
              width={60}
              height={60}
              className={styles.profilePic}
              priority={true}
              quality={100}
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