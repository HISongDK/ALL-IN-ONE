import React from 'react'
import { useFetch } from '@/utils/hooks'

export default function ImageFetch({ style }: any) {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {})
  if (!res.response) return <div>Loading...</div>

  const imageUrl = res.response.message

  return (
    <div style={style}>
      <img
        src={imageUrl}
        alt="avatar"
        width={400}
        height="auto"
        style={{ ...style, border: 'none' }}
      />
    </div>
  )
}
