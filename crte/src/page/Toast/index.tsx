import React from 'react'
import Toast from './Toast'

export default function toast() {
  const showToast = () => {
    Toast('弹出')
    Toast({
      img: 'https://s1-imfile.feishucdn.com/static-resource/v1/09c2f0c1-c364-4575-b826-3588a51b2e9e~?image_size=72x72&cut_type=default-face&quality=&format=jpeg&sticker_format=.webp',
      text: '弹出',
    })
  }

  return (
    <div>
      <div className="test" onClick={showToast}>
        点击显示
      </div>
    </div>
  )
}
