import React, { useState, useEffect } from 'react'
import { useFetch } from '@utils/hooks'
import { useReducerUpdate } from '@utils/ahook/useUpdate'
import { Button, Card, Space } from 'antd'
import Modal from '@/components/Modal/Modal'
import Collapse from '@/components/Collapse'

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

  const update = useReducerUpdate()

  useEffect(() => {
    console.log('  useEffect  ')
  }, [])

  return (
    <>
      <Space size="large" direction="vertical" style={{ display: 'flex' }}>
        <Button onClick={() => setVisible(true)}>Click me!</Button>

        <Card title="useUpdate">
          <div>Time: {new Date().toLocaleString()}</div>
          <Button onClick={update}>Update</Button>
        </Card>

        <Card title="Collapse">
          <Collapse collapsed>
            <h1>This is a collapse</h1>
            <p>Hello world!</p>
          </Collapse>
        </Card>
      </Space>

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
