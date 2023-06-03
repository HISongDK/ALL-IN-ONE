import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ExerciseContextCom, { useExerciseContext } from '@/store/exercise'
import AddDrawer from './AddDrawer'
import ExerciseTable from './ExerciseTable'
import TimeLine from './TimeLine'
import StatCharts from './StatCharts'
import { looseObj } from '@/constant'
import './index.scss'

function ExerciseFC() {
  const history = useHistory()
  const { params } = useRouteMatch<{ type: string }>()

  const {
    getLogs,
    data = [],
    getLogsLoading,
    update,
    dispatchUpdate,
  } = useExerciseContext()

  const [record, setRecord] = useState<looseObj>()
  const [activeKey, setActiveKey] = useState(params.type || 'timeline')
  const [isAddVisible, setIsAddVisible] = useState<boolean>(
    params.type === 'add',
  )

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
      children: (
        <TimeLine
          dataSource={data}
          logsLoading={getLogsLoading}
          setRecord={setRecord}
          setIsAddVisible={setIsAddVisible as any}
        />
      ),
    },
    {
      label: '图表',
      key: 'chart',
      children: <StatCharts />,
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
        record={record}
        visible={isAddVisible}
        setVisible={setIsAddVisible}
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
