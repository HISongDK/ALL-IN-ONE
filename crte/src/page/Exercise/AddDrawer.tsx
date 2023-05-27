import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import moment from 'dayjs'
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
import ExerciseApi from '@api/exercise'
import { useUpdateLog } from '@api/hooks/exercise'
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
  warmUp: [{ type: '靠墙俯卧撑', groupCounts: 1, perGroupTimes: 5 }],
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
  const { pathname } = useLocation()
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const [isEdit, recordData] = useMemo(() => {
    if (!record) return [false]

    if (record.isAdd)
      return [false, { ...initialValues, ...record, date: moment(record.date) }]

    return [!!record, { ...record, date: moment(record.date) }]
  }, [record])

  const { updateLog, loading: updateLoading } = useUpdateLog()

  useEffect(() => {
    if (recordData) {
      form.resetFields()
      form.setFieldsValue(recordData)
    }
  }, [recordData])

  const onClose = () => {
    setVisible(false)
    form.setFieldsValue({})
    onClearRecord?.()

    if (pathname.includes('/add')) {
      history.replace('/exercise')
    }
  }

  const handleValuesChange = (_: any, values: any) => {
    const allWarmsType = values?.warmUp?.map((item: any) => item.type)
    const allExerciseType = values?.exercise?.map((item: any) => item.type)

    const extra =
      allWarmsType
        ?.filter((type: string) => type && !allExerciseType.includes(type))
        .map((type: string) => ({ type, groupCounts: 1 })) || []

    const result = {
      ...values,
      exercise: [...(values?.exercise || []), ...extra],
    }

    form.setFieldsValue(result)
  }

  const handleConfirmAdd = () => {
    form.validateFields().then(async (res) => {
      setLoading(true)
      res.date = res.date.startOf('day').valueOf()

      let data: { status?: string } = {}
      if (isEdit) {
        data = await updateLog({
          ...res,
          _id: recordData?._id,
        }).finally(() => {
          setLoading(false)
        })
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
      destroyOnClose
      title={`${isEdit ? '编辑' : '添加'}日志`}
      width={720}
      open={visible}
      onClose={onClose}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose} danger>
            取消
          </Button>
          <Button
            onClick={handleConfirmAdd}
            type="primary"
            loading={loading || updateLoading}
          >
            确认
          </Button>
        </Space>
      }
    >
      <Form
        preserve
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
      >
        <BasicInfoGroup />
        <ExerciseFormGroup name="warmUp" label="热身组" />
        <ExerciseFormGroup name="exercise" label="训练组" />
      </Form>
    </Drawer>
  )
}

export default AddDrawer

function BasicInfoGroup() {
  return (
    <>
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
            <TextArea style={{ width: '100%' }} placeholder="请填写状态描述" />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
