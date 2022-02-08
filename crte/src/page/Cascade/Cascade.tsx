import React from 'react'
import { Select, Card, Cascader, Space } from 'antd'
import areas from './area2'

const { Option } = Select

const formatAreaOptions = (data: { [key: string]: Array<string> }) => {
  function getOpts(strArr: string[]): any[] {
    return strArr.map((key) => ({
      value: key,
      label: key,
      children: data[key] && getOpts(data[key]), // 递归用的不太对，不过也就先这样
    }))
  }

  return getOpts(Object.keys(data))
}

function Cascade() {
  const areaOpts = formatAreaOptions(areas)
  return (
    <div>
      antd 级联下拉框 <hr />
      <Space direction="vertical" size="large">
        <Card title="下拉框">
          <Select
            showSearch
            placeholder="请选择省/直辖市"
            style={{ width: '200px' }}
          >
            <Option value="广东省">广东省</Option>
          </Select>

          <Select
            showSearch
            placeholder="请选择市/区"
            style={{ width: '200px', marginLeft: '20px' }}
          >
            <Option value="广东省">广东省</Option>
          </Select>
        </Card>
        <Card title="级联列表">
          <Cascader options={areaOpts} />
        </Card>
      </Space>
    </div>
  )
}

export default Cascade
