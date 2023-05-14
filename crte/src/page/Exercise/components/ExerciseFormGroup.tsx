import React from 'react'
import { Button, Col, Form, Row, Select, Divider, InputNumber } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { exerciseOptions } from '../config'

const { Option } = Select

interface IExerciseFormGroup {
  label: string
  name: string
}

function ExerciseFormGroup({ label, name }: IExerciseFormGroup) {
  const addBtn = (add: any) => (
    <Form.Item>
      <Button
        block
        type="primary"
        onClick={() => add()}
        icon={<PlusOutlined />}
      >
        添加{label}
      </Button>
    </Form.Item>
  )
  const removeBtn = (remove: any, removeIndex: number) => (
    <Form.Item>
      <Button
        block
        danger
        type="dashed"
        onClick={() => remove(removeIndex)}
        icon={<DeleteOutlined />}
      >
        删除{label}
      </Button>
    </Form.Item>
  )
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            {label}
            <Divider />
            {fields.map((field) => {
              return (
                <div key={field.key}>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        {...field}
                        label="动作"
                        name={[field.name, 'type']}
                        rules={[
                          { required: true, message: 'Please select an owner' },
                        ]}
                      >
                        <Select
                          placeholder="请选择动作"
                          options={exerciseOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label="组数"
                        name={[field.name, 'groupCounts']}
                        rules={[
                          {
                            required: true,
                            message: '请输入组数',
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          style={{ width: '100%' }}
                          placeholder="请输入组数"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label="单组次数"
                        name={[field.name, 'perGroupTimes']}
                        rules={[
                          {
                            required: true,
                            message: 'Please choose the dateTime',
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          style={{ width: '100%' }}
                          placeholder="请输入单组次数"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              )
            })}

            {fields.length > 1 && (
              <Row gutter={16}>
                <Col span={12}>{removeBtn(remove, fields.length - 1)}</Col>
                <Col span={12}>{addBtn(add)}</Col>
              </Row>
            )}

            {!(fields.length > 1) && addBtn(add)}
          </>
        )
      }}
    </Form.List>
  )
}

export default ExerciseFormGroup
