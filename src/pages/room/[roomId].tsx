import { useEffect } from 'react';
import { useRouter } from 'next/router'
import SocketIOClient from 'socket.io-client'

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query

  useEffect(() => {
    socketInitializer();
    return () => {
      console.log("This will be logged on unmount");
    }
  })

  const socketInitializer = async () => {
    await fetch('/api/socket', { method: 'POST', body: JSON.stringify({ roomId }) });
    const socket = SocketIOClient()

    socket.on('connect', () => {
      console.log('connected', socket.id)
    })
  }


  const sendMessage = async () => {
    const message = 'teste message'
    // dispatch message to other users
    const resp = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        userId: 123123,
        roomId: roomId
      }),
    });

    // reset field if OK
    if (resp.ok) {
      console.log('repsonse ok')
    }
  }

  return (
    <>room id {roomId} <button onClick={() => sendMessage()}>Send message</button></>
  )
}

export default Room