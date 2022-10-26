import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Row,
  Space,
  message,
  Input,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import ExerciseApi from '@api/exercise'
import { useHistory } from 'react-router'
import ExerciseFormGroup from './components/ExerciseFormGroup'
import { looseObj, SUCCESS } from '@/constant'

const { TextArea } = Input

interface IAddDrawer {
  visible: boolean
  setVisible: (flag: boolean) => void
  emitUpdate: () => void
  record?: looseObj
  onClose?: () => void
}

const initialValues = {
  date: moment(),
  warmUp: [
    { type: '靠墙俯卧撑', groupCounts: 1, perGroupTimes: 5 },
    { type: '上斜俯卧撑', groupCounts: 1, perGroupTimes: 3 },
  ],
  exercise: [{ type: '靠墙俯卧撑', groupCounts: 1, perGroupTimes: 10 }],
}

const AddDrawer: React.FC<IAddDrawer> = ({
  visible,
  setVisible,
  emitUpdate,
  record,
  onClose: onClearRecord,
}) => {
  const history = useHistory()
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const [isEdit, recordData] = useMemo(() => {
    if (!record) return [false]
    return [!!record, { ...record, date: moment(record.date) }]
  }, [record])

  useEffect(() => {
    if (recordData) {
      form.resetFields()
      form.setFieldsValue(recordData)
    }
  }, [recordData])

  const onClose = () => {
    history.replace('/exercise')
    setVisible(false)
    form.setFieldsValue({})
    // eslint-disable-next-line no-unused-expressions
    onClearRecord && onClearRecord()
  }

  const handleConfirmAdd = () => {
    form.validateFields().then(async (res) => {
      setLoading(true)
      res.date = res.date.startOf('day').valueOf()

      let data = {}
      if (isEdit) {
        data = await ExerciseApi.updateLog({
          ...res,
          _id: recordData?._id,
        }).finally(() => setLoading(false))
      } else {
        data = await ExerciseApi.createLog(res).finally(() => setLoading(false))
      }

      onClose()
      if (data.status === SUCCESS) {
        message.success(`${isEdit ? '修改' : '添加'}锻炼日志成功`)
      }
      emitUpdate()
    })
  }

  return (
    <Drawer
      title={`${isEdit ? '编辑' : '添加'}日志`}
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
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
      <Form
        preserve
        layout="vertical"
        form={form}
        initialValues={initialValues}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="date"
              label="日期"
              rules={[{ required: true, message: '日期不能为空' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="状态描述">
              <TextArea
                style={{ width: '100%' }}
                placeholder="请填写状态描述"
              />
            </Form.Item>
          </Col>
        </Row>
        <ExerciseFormGroup name="warmUp" label="热身组" />
        <ExerciseFormGroup name="exercise" label="训练组" />
      </Form>
    </Drawer>
  )
}

export default AddDrawer
