import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useReducerUpdate } from '@utils/ahook/useUpdate'
import { Button, Card, Space, Input, List } from 'antd'
import MultiSelectCheckbox from '@/components/MultiSelectCheckbox'
import ListItem from './CopyListItem'
import {
  useMergeState,
  useWindowSize,
  useHash,
  useDebounce,
  useAsync,
  useHover,
  useForm,
} from '@/utils/hooks'
import Collapse from '@/components/Collapse'
import TestUseCallback from './TestUseCallback'
import FetchLearn from './FetchLearn'
import Service from './service'
import Select from '@/components/Select'
import Tooltip from '@/components/Tooltip'
import Toggle from '@/components/Toggle'
import DogModal from './DogModal'
import Tabs, { TabItem } from '../../components/Tabs/index'
import TagInput from '../../components/TagInput/index'
import RippleButton from '@/components/RippleButton'

const options = [
  { label: 'Item One' },
  { label: 'Item Two' },
  { label: 'Item Three' },
]

function Dogs() {
  const history = useHistory()

  const [visible, setVisible] = useState(false)
  const [inpValue, setInpValue] = useState('')

  const [data, setData] = useMergeState<any>({ name: 'dksong', age: 24 })
  const { width, height } = useWindowSize()
  const [hash, updateHash] = useHash()
  const debouncedValue = useDebounce(inpValue)
  const [hoverRef, isHovering] = useHover()
  const update = useReducerUpdate()

  const imgFetch: any = useAsync((url) => fetch(url).then((res) => res.json()))

  // 尝试 fetch 获取信息
  const getUserInfo = async () => {
    const res = await Service.getUserInfo()
    console.log('\n--- res ruanyf  ---\n\n', res)
  }

  useEffect(() => {
    console.log('  useEffect  ')
    getUserInfo()
  }, [])

  // 防抖之后的值变化后更新 hash 值
  useEffect(() => {
    updateHash(debouncedValue)
  }, [updateHash, debouncedValue])

  const [formValues, setFormValues] = useForm({ email: '', password: '' })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('---  formValues  ---\n', formValues)
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
          <MultiSelectCheckbox
            options={options}
            onChange={(checked) => {
              console.log('\n--- checked  ---\n\n', checked)
            }}
          />
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
        <Card title="useHash & useDebounce">
          <input
            value={inpValue}
            onChange={({ target: { value } }) => {
              setInpValue(value)
            }}
          />
          <p>Current hash: {hash}</p>
          <button
            type="button"
            onClick={() => {
              history.replace('/playground/#/test')
            }}
          >
            {/* TODO: 不知到怎么触发 hashchange 事件，不管了放弃 */}
            replace hash url
          </button>
        </Card>
        <Card title="Tabs">
          <Tabs onTabClick={console.log}>
            <TabItem label="Tab1" index={0}>
              Tab 栏1
            </TabItem>
            <TabItem label="Tab2" index={1}>
              Tab 栏2
            </TabItem>
          </Tabs>
        </Card>
        <Card title="useAsync">
          <button
            onClick={() => {
              imgFetch.run('https://dog.ceo/api/breeds/image/random')
            }}
            disabled={imgFetch.loading}
            type="button"
          >
            Load Image
          </button>
          <br />
          <pre>{JSON.stringify(imgFetch, null, 4)}</pre>
          {imgFetch.loading && <div>Loading</div>}
          {imgFetch.error && <div>Error {imgFetch.error}</div>}
          {imgFetch.value && (
            <img
              src={imgFetch.value.message}
              alt="avatar"
              width={400}
              height="auto"
            />
          )}
        </Card>
        <Card title="Tooltip">
          <Tooltip text="Simple Tooltip">
            <button ref={hoverRef}>
              {isHovering ? 'look up' : 'hover me'}
            </button>
          </Tooltip>
        </Card>
        <Card title="toggle">
          <Toggle />
        </Card>

        <Card title="TagInput">
          <TagInput tags={['Nodejs', 'MongoDB']} />
        </Card>

        <Card title="RippleButton">
          <RippleButton>RippleButton</RippleButton>
        </Card>

        <Card title="useForm">
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={setFormValues} />
            <input type="password" name="password" onChange={setFormValues} />
            <button type="submit">提交</button>
          </form>
          <pre>{JSON.stringify(formValues, null, 4)}</pre>
        </Card>

        <FetchLearn />
      </Space>
      {visible && <DogModal setVisible={setVisible} />}
    </>
  )
}

export default Dogs
