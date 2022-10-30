import React, { useEffect, useReducer, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useGetExerciseLogs } from '@api/hooks/exercise'
import ExerciseContextCom, { useExerciseContext } from '@/store/exercise'
import AddDrawer from './AddDrawer'
import ExerciseTable from './ExerciseTable'
import TimeLine from './TimeLine'
import './index.scss'

function ExerciseFC() {
  const history = useHistory()
  const { params } = useRouteMatch<{ type: string }>()

  const { getLogs, data = [], getLogsLoading } = useExerciseContext()
  console.log('---  getLogsLoading  ---\n', getLogsLoading)

  const [isAddVisible, setIsAddVisible] = useState(params.type === 'add')
  const [record, setRecord] = useState()
  const [activeKey, setActiveKey] = useState(params.type)
  const [update, dispatchUpdate] = useReducer(() => ({}), {})

  useEffect(() => {
    getLogs({ sort: '-date' })
  }, [update])

  const tabs = [
    {
      label: '表格',
      key: 'table',
      children: (
        <ExerciseTable
          dataSource={data}
          logsLoading={getLogsLoading}
          setRecord={setRecord}
          dispatchUpdate={dispatchUpdate}
          setIsAddVisible={setIsAddVisible}
        />
      ),
    },
    {
      label: '时间轴',
      key: 'timeline',
      children: <TimeLine dataSource={data} logsLoading={getLogsLoading} />,
    },
    {
      label: '图表',
      key: 'chart',
      children: `Content of Tab Pane 3`,
    },
  ]

  const onTabsChange = (key: string) => {
    history.replace(`/exercise/${key}`)
    setActiveKey(key)
  }

  return (
    <div className="exercise_wrapper">
      <Button
        type="primary"
        className="add_log_btn"
        onClick={() => setIsAddVisible(true)}
        icon={<PlusOutlined />}
      >
        添加锻炼日志
      </Button>

      <Tabs
        activeKey={activeKey}
        onChange={onTabsChange}
        style={{ marginTop: -10 }}
        items={tabs}
      />

      <AddDrawer
        visible={isAddVisible}
        setVisible={setIsAddVisible}
        record={record}
        emitUpdate={dispatchUpdate}
        onClose={() => setRecord(undefined)}
      />
    </div>
  )
}

const Exercise = () => (
  <ExerciseContextCom>
    <ExerciseFC />
  </ExerciseContextCom>
)

export default Exercise
