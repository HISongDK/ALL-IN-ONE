import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Row,
  Select,
  Space,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useState } from 'react'
import ExerciseApi from '@api/exercise'
import ExerciseFormGroup from './components/ExerciseFormGroup'
import { SUCCESS } from '@/constant'

const { Option } = Select

interface IAddDrawer {
  visible: boolean
  setVisible: (flag: boolean) => void
}

const initialValues = {
  date: moment(),
  warmUp: [
    { type: '靠墙俯卧撑', groupCounts: 1, perGroupTimes: 5 },
    { type: '上斜俯卧撑', groupCounts: 1, perGroupTimes: 3 },
  ],
  exercise: [{ type: '靠墙俯卧撑', groupCounts: 1, perGroupTimes: 10 }],
}

const AddDrawer: React.FC<IAddDrawer> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleConfirmAdd = () => {
    form.validateFields().then(async (res) => {
      setLoading(true)
      res.date = res.date.startOf('day').valueOf()
      const data = await ExerciseApi.createLog(res)
      setLoading(false)
      if (data.status === SUCCESS) {
        message.success('添加锻炼日志成功')
        onClose()
      }
    })
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
            <Button onClick={handleConfirmAdd} type="primary" loading={loading}>
              确认
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} initialValues={initialValues}>
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
