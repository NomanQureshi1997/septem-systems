import '../App.css'
import { useState, useEffect } from 'react'
import notifaciton from '../assets/notification.mp3'

function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    console.log('Effect called')
  })

  function receiveMessage() {
    const id = setInterval(() => {
      const newMessage = 'A new message received'
      setMessages((prevMessages) => [...prevMessages, newMessage])
      showNotification(newMessage)
      document.title = '\u2022' + newMessage
    }, 5000)
    setIntervalId(id)
  }
  // Function to display browser notification
  function showNotification(message) {
    if (Notification.permission === 'granted') {
      new Notification('New Message', { body: message })
      playBellSound()
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log(permission)
          new Notification('New Message', { body: message })
        }
      })
    }
  }
  function stopNotifications() {
    clearInterval(intervalId)
  }
  const playBellSound = () => {
    if (Notification.permission === 'granted') {
      const audio = new Audio(notifaciton) // Path to bell sound file
      console.log(audio)
      audio.play()
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const audio = new Audio('./n.mp3')
          audio.play()
        }
      })
    }
  }
  return (
    <>
      <p>Basic messages list</p>
      <p>Please make sure browser notifications are enabled</p>
      <div id="chat-list-layout">
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => receiveMessage()} style={{ marginRight: '5rem' }}>
            Start Reciving message
          </button>
          <button onClick={() => stopNotifications()}> Stop receiving notifications</button>
        </div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  )
}

export default ChatInterface
