import React, { useEffect } from 'react'
import { Button } from 'antd'
import './index.less'

interface IModalProps {
  visible?: boolean
  title: string
  content: any
  footer?: any
  okText?: string
  onOk?: () => void
  onCancel: () => void
}

export default function Modal(props: IModalProps) {
  const {
    visible = false,
    title,
    content,
    footer,
    okText = '确定',
    onOk,
    onCancel,
  } = props
  const keydownHandler = ({ key }: KeyboardEvent) => {
    console.log('\n--- key  ---\n\n', key)

    switch (key) {
      case 'Escape':
        onCancel()
        break
      default:
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
  })

  return !visible ? null : (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onCancel}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
        {!footer && (
          <div className="modal-footer">
            <Button onClick={onCancel}>取消</Button>
            <Button
              type="primary"
              onClick={onOk}
              style={{ marginLeft: '1rem' }}
            >
              {okText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
