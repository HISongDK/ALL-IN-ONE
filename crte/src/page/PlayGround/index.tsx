import React, { useState, useEffect } from 'react'
import { useReducerUpdate } from '@utils/ahook/useUpdate'
import { Button, Card, Space, Input, List } from 'antd'
import MultiSelectCheckbox, {
  optionsProp,
} from '@/components/MultiSelectCheckbox'
import ListItem from './CopyListItem'
import { useMergeState, useWindowSize } from '@/utils/hooks'
import Collapse from '@/components/Collapse'
import TestUseCallback from './TestUseCallback'
import FetchLearn from './FetchLearn'
import Service from './service'
import Select from '@/components/Select'
import DogModal from './DogModal'

const options = [
  { label: 'Item One' },
  { label: 'Item Two' },
  { label: 'Item Three' },
]

function Dogs() {
  const [visible, setVisible] = useState(false)

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

        <FetchLearn />
      </Space>
      {visible && <DogModal setVisible={setVisible} />}
    </>
  )
}

export default Dogs
