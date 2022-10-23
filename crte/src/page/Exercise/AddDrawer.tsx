import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Divider,
} from 'antd'
import React, { useState } from 'react'
import ExerciseFormGroup from './components/ExerciseFormGroup'

const { Option } = Select

interface IAddDrawer {
  visible: boolean
  setVisible: (flag: boolean) => void
}

const AddDrawer: React.FC<IAddDrawer> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleConfirmAdd = () => {
    form.submit()
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        添加锻炼日志
      </Button>
      <Drawer
        title="添加一条日志"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose} danger>
              取消
            </Button>
            <Button onClick={handleConfirmAdd} type="primary">
              确认
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="date"
                label="日期"
                rules={[{ required: true, message: '日期不能为空' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="请选择日期"
                />
              </Form.Item>
            </Col>
          </Row>
          <ExerciseFormGroup name="warmUp" label="热身组" />
          <ExerciseFormGroup name="exercise" label="训练组" />
        </Form>
      </Drawer>
    </>
  )
}

export default AddDrawer
