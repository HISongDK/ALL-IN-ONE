import React, { useEffect, useState } from 'react'
import { NeteaseApi } from '@/api'
import './style.scss'

function ApiTest() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    NeteaseApi.getLoginStatus()
    NeteaseApi.getVideo().then(({ data: { code, urls } }) => {
      if (code === 200) {
        setUrl(urls[0].url)
      }
    })
  }, [])

  return (
    <div>
      什么玩意
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={url} controls />
    </div>
  )
}

export default ApiTest
