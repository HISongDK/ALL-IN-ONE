import React, { useState } from 'react'
import { Button, Modal, Checkbox as CheckboxAntd } from 'antd'
import { Checkbox as CheckboxSemi } from '@douyinfe/semi-ui'
import { Checkbox as CheckboxTea } from 'tea-component'
import {
  getConfirmStatus,
  getIntervalConfirmStatus,
  getTimeoutConfirmStatus,
} from '@/page/Modal/utils'

type Props = {}

function ModalConfirmPromise({}: Props) {
  const [visible, setVisible] = useState<boolean>()

  const handleClick = async () => {
    setTimeout(() => {
      setVisible(true)
    }, 1001)

    // const confirm = await getTimeoutConfirmStatus()
    // const confirm = await getConfirmStatus()
    const confirm = await getIntervalConfirmStatus()

    console.log('---  confirm  ---\n', confirm)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const [antdCheckedValue, setAntdCheckedValue] = useState()
  const [semiCheckedValue, setSemiCheckedValue] = useState()
  const [teaCheckedValue, setTeaCheckedValue] = useState()

  return (
    <div>
      <Button onClick={handleClick}>点击显示弹窗</Button>
      <Modal
        open={visible}
        title="Tips"
        onOk={handleClose}
        onClose={handleClose}
        onCancel={handleClose}
      >
        弹窗啊弹 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗窗
        弹窗啊弹 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗窗
        弹窗啊弹 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗 弹窗啊弹窗窗
        <div>
          <Button id="okBtn" type="primary" onClick={handleClose}>
            确认
          </Button>
          <Button id="cancelBtn" onClick={handleClose}>
            取消
          </Button>
        </div>
      </Modal>
      <CheckboxAntd checked={antdCheckedValue} />
      <CheckboxSemi checked={semiCheckedValue} />

      <CheckboxTea value={teaCheckedValue} />
    </div>
  )
}

export default ModalConfirmPromise
