import React, { useState } from 'react'
import { useFetch } from '@utils/hooks'
import { Button } from 'antd'
import Modal from '@/components/Modal/Modal'

function ImageFetch({ style }: any) {
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

function Dogs() {
  const [visible, setVisible] = useState(false)
  const [isWantSee, setIsWantSee] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>Click me!</Button>
      <Modal
        visible={visible}
        title="Hi there!"
        content={
          isWantSee ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p>Wait a minute and see!</p>
              {Array(10)
                .fill('')
                .map((_, i) => {
                  return (
                    <ImageFetch
                      key={i}
                      style={{
                        margin: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #dbdbdb',
                      }}
                    />
                  )
                })}
            </div>
          ) : (
            'Do you want to see some dogs?'
          )
        }
        onOk={() => setIsWantSee(true)}
        onCancel={() => {
          setVisible(false)
          setIsWantSee(false)
        }}
      />
    </>
  )
}

export default Dogs
