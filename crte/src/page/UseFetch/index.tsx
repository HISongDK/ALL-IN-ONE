import React from 'react'
import { useFetch } from '@utils/hooks'

function ImageFetch() {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {})
  if (!res.response) return <div>Loading...</div>

  const imageUrl = res.response.message

  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  )
}

export default ImageFetch
