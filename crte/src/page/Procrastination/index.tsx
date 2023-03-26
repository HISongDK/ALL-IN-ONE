import React, { useMemo } from 'react'
import { Transfer, Button, Typography } from 'antd'
import useStoragedProcrastinations from './hooks/useStorageProcrastinations'

const App = () => {
  const [procrastinations, setProcrastinations, reset] =
    useStoragedProcrastinations()

  const selectedKeys = useMemo(() => {
    return procrastinations
      ?.filter((item) => item.select)
      .map((item) => item.key)
  }, [procrastinations])

  const handleSelectChange = (selectedKeys: string[]) => {
    setProcrastinations((prev) => {
      const data = prev.slice()
      data.forEach((item) => {
        if (selectedKeys.includes(item.key)) {
          item.select = true
        }
      })
      return data
    })
  }

  // const handleTransferChange = (nextTargetKeys: string[]) => {
  //   setTargetKeys(nextTargetKeys)
  // }

  const handleReset = () => {
    reset()
  }

  return (
    <>
      <Typography.Text>提供备用事项，避免无所事事</Typography.Text>
      <Transfer
        oneWay
        dataSource={procrastinations}
        selectedKeys={selectedKeys}
        targetKeys={selectedKeys}
        // onChange={handleTransferChange}
        onSelectChange={handleSelectChange}
        rowKey={(item) => item.key}
        render={(item) => item.title}
        titles={['拖延备选项', 'Done']}
        locale={{
          itemUnit: '项',
          itemsUnit: '项',
          searchPlaceholder: '请输入搜索内容',
        }}
        showSelectAll={false}
        listStyle={{ width: 300, height: 500 }}
        style={{ margin: '20px 0' }}
      />

      <Button type="primary" onClick={handleReset}>
        重置
      </Button>
    </>
  )
}

export default App
