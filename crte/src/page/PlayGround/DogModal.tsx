import React, { useState } from 'react'
import Modal from '@/components/Modal/Modal'
import ImageFetch from './ImageFetch'

function DogModal({ setVisible }: any) {
  const [isWantSee, setIsWantSee] = useState(false)
  const [isRefreshBtn, setIsRefreshBtn] = useState(false)

  return (
    <Modal
      visible
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
      okText={isRefreshBtn ? '刷新' : undefined}
      onOk={() => {
        if (isRefreshBtn) {
          // 我这么个重渲染也是醉了
          setIsWantSee(false)
          setTimeout(() => setIsWantSee(true))
        } else {
          setIsWantSee(false)
          setIsWantSee(true)
          setIsRefreshBtn(true)
        }
      }}
      onCancel={() => {
        setVisible(false)
        setIsWantSee(false)
        setIsRefreshBtn(false)
      }}
    />
  )
}

export default DogModal
