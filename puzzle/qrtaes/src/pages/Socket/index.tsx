import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './style.scss'

const socket = io('172.29.40.56:9000')

function Socket() {
  const [curMsaVal, setCurMsaVal] = useState('')
  const [allMsgs, setAllMsgs] = useState<string[]>([])

  useEffect(() => {
    socket.on('msg', (data) => {
      setAllMsgs((msgs) => [...msgs, data])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  // 发送消息
  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!curMsaVal) return false
    socket.emit('msg', curMsaVal)
    setAllMsgs((msgs) => [...msgs, curMsaVal])
    setCurMsaVal('') // 发送后清空输入框，真么巧妙又理所当然的交互，竟没想到
    return false
  }
  return (
    <div className="socket">
      <ul id="messages">
        {allMsgs.map((msg) => (
          <li key={Date.now() + Math.random()}>{msg}</li>
        ))}
      </ul>
      <form action="">
        <input
          id="m"
          value={curMsaVal}
          onChange={(e) => setCurMsaVal(e.target.value)}
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
