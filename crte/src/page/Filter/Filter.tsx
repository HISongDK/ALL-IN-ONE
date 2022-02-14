import React, { useState, useMemo } from 'react'
import { Input, Select, Form, Button } from 'antd'

const { Option } = Select

interface IFilter {
  text?: string
  type?: string
}

const data = [
  { id: '1111', name: '1oooo', type: '.......' },
  { id: '2222', name: 'abcde', type: ',,,,,' },
  { id: '3333', name: '1asdfk', type: '!!!!' },
  { id: '1234', name: 'eeeee', type: '*****' },
  { id: '12345', name: 'ddddd', type: '*****' },
  { id: '44433', name: 'ccccc', type: ',,,,,,' },
  { id: '88888', name: '1bbbb', type: '.......' },
  { id: '00000', name: 'asdf', type: '.......' },
]

type IData = {
  id: string
  name: string
  type: string
}[]

const typeOpts = Array.from(new Set(data.map((item) => item.type)))

function Filter() {
  const [form] = Form.useForm()
  const [filter, setFilter] = useState<IFilter>({})

  const showData = useMemo<IData>(() => {
    const res = data.filter((item) => {
      const { text, type } = filter

      const includesType = type ? item.type === type : true
      const idOrName = text
        ? item.id.includes(text) || item.name.includes(text)
        : true

      return includesType && idOrName
    })
    return res
  }, [filter])

  const onFinish = (values: any) => {
    setFilter(values)
  }
  return (
    <div>
      一个筛选还筛不明白了
      <hr />
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 4 }}
      >
        <Form.Item label="Type" name="type">
          <Select allowClear>
            {typeOpts.map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="text" name="text">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form>
      <hr />
      {showData.map((item) => (
        <li>
          {item.id}----{item.name}----{item.type}
        </li>
      ))}
    </div>
  )
}

export default Filter
