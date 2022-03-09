import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './style.scss'

const socket = io('172.29.40.56:9000')

function Socket() {
  const [msgVal, setMsgVal] = useState('')

  useEffect(() => {
    socket.on('receiveMsg', (data) => console.log('---  data  ---\n', data))

    return () => {
      socket.disconnect()
    }
  }, [])

  const onSubmit = (e: any) => {
    e.preventDefault()
    socket.emit('sendMsg', msgVal)
    setMsgVal('')
    return false
  }
  return (
    <div className="socket">
      <ul id="messages" />
      <form action="">
        <input
          id="m"
          value={msgVal}
          onChange={(e) => setMsgVal(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" onClick={onSubmit}>
          Send
        </button>
      </form>
    </div>
  )
}

export default Socket
