import React, { useState } from 'react'
import { Button, Modal } from 'antd'
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
    </div>
  )
}

export default ModalConfirmPromise
