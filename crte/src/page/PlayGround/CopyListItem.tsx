import React, { useEffect } from 'react'
import { message, List } from 'antd'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { useCopyToClipboard } from '../../utils/hooks/useCopyToClipboard'

export default function ListItem({ item }: any) {
  const [copied, copy] = useCopyToClipboard(item)

  useEffect(() => {
    if (copied) message.success('复制成功', 0.5)
  }, [copied])

  return (
    <List.Item style={{ cursor: 'pointer' }}>
      {item}
      {copied ? (
        <CheckOutlined style={{ color: 'green' }} />
      ) : (
        <CopyOutlined
          onClick={() => {
            if (typeof copy === 'function') copy()
          }}
        />
      )}
    </List.Item>
  )
}
