import React, { useState, useEffect } from 'react'
import { useReducerUpdate } from '@utils/ahook/useUpdate'
import { Button, Card, Space, Input, List, message } from 'antd'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import MultiSelectCheckbox, {
  optionsProp,
} from '@/components/MultiSelectCheckbox'
import {
  useCopyToClipboard,
  useFetch,
  useMergeState,
  useWindowSize,
} from '@/utils/hooks'
import Modal from '@/components/Modal/Modal'
import Collapse from '@/components/Collapse'
import TestUseCallback from './TestUseCallback'
import FetchLearn from './FetchLearn'
import Service from './service'
import Select from '@/components/Select'

function ListItem({ item }: any) {
  const [copied, copy] = useCopyToClipboard(item)

  useEffect(() => {
    if (copied) message.success('复制成功', 0.5)
  }, [copied])

  return (
    <List.Item style={{ cursor: 'pointer' }}>
      {item}
      {copied ? (
        <CheckOutlined style={{ color: 'green' }} />
      ) : (
        <CopyOutlined
          onClick={() => {
            if (typeof copy === 'function') copy()
          }}
        />
      )}
    </List.Item>
  )
}

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

const options = [
  { label: 'Item One' },
  { label: 'Item Two' },
  { label: 'Item Three' },
]

function Dogs() {
  const [visible, setVisible] = useState(false)
  const [isWantSee, setIsWantSee] = useState(false)
  const [isRefreshBtn, setIsRefreshBtn] = useState(false)

  const [data, setData] = useMergeState<any>({ name: 'dksong', age: 24 })

  const { width, height } = useWindowSize()

  const update = useReducerUpdate()

  const getUserInfo = async () => {
    const res = await Service.getUserInfo()
    console.log('\n--- res ruanyf  ---\n\n', res)
  }

  useEffect(() => {
    console.log('  useEffect  ')
    getUserInfo()
  }, [])

  const handleChange = (checked: optionsProp) => {
    console.log('\n--- checked  ---\n\n', checked)
  }

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

        <Card title="useMergeState">
          <Space>
            <Input
              value={data.name}
              onChange={(e) => setData({ name: e.target.value })}
            />
            <Button onClick={() => setData({ age: data.age - 1 })}>-</Button>
            {data.age}
            <Button onClick={() => setData({ age: data.age + 1 })}>+</Button>
          </Space>
        </Card>

        <Card title="useCopyToClipboard">
          <List
            dataSource={[1, 2, 3, 4, 5]}
            renderItem={(item) => {
              return <ListItem key={item} item={item} />
            }}
          />
        </Card>

        <Card title="useCallback 测试">
          <TestUseCallback />
        </Card>

        <Card title="useWindowSize">
          Window size: {width} x {height}
        </Card>

        <Card title="MultiSelectCheckbox">
          <MultiSelectCheckbox options={options} onChange={handleChange} />
        </Card>

        <Card title="Select">
          <Select
            values={[
              ['grapefruit', 'Grapefruit'],
              ['lime', 'Lime'],
              ['coconut', 'Coconut'],
              ['mango', 'Mango'],
            ]}
            selectedValue="lime"
            onValueChange={(val: any) => console.log('select value:', val)}
          />
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

      <FetchLearn />
    </>
  )
}

export default Dogs
