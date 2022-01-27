import React from 'react'
import { Select, Card, Cascader, Space } from 'antd'
import areas from './省市'

const { Option } = Select

function Cascade() {
  // eslint-disable-next-line
  console.log('---  areas  ---\n', areas)
  const areasFormat = areas.map((area) => ({
    [area.provinceName]: area.citys.map((city) => city.citysName),
  }))
  console.log('---  areasFormat  ---\n', areasFormat)

  const areaObj: any = {}
  areas.forEach((area) => {
    areaObj[area.provinceName] = area.citys.map((city) => city.citysName)
  })
  console.log('---  areaObj  ---\n', areaObj)

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
          <Cascader />
        </Card>
      </Space>
    </div>
  )
}

export default Cascade
