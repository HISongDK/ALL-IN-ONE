import React, { useEffect } from 'react'
import { Spin, Radio } from 'antd'
import { useStatLog } from '@api/hooks/exercise'
import { useLocalStorageState } from 'ahooks'
import { useExerciseContext } from '@/store/exercise'
import useChartsData from './hooks/useChartsData'
import useChartsOptions from './hooks/useChartsOptions'
import { radioOptions } from './config'
import CollapseChart, { ICollapseChart } from './CollapseChart'

function StatCharts(): JSX.Element {
  const { update } = useExerciseContext()

  const [range, setRange] = useLocalStorageState('chartTimeRange', {
    defaultValue: 30,
  })

  const { getLogStat, loading, data } = useStatLog()

  // 数据分组
  const allDataGroup = useChartsData(data)
  // 图标配置
  const allDataGroupOptions = useChartsOptions(allDataGroup, range)

  useEffect(() => {
    getLogStat({ sort: 'date' })
  }, [update])

  const handleRadioChange = (e: any) => {
    const { value } = e.target
    setRange(value)
  }

  return (
    <Spin spinning={loading}>
      <div className="stat-radio-group">
        <Radio.Group
          value={range}
          options={radioOptions}
          onChange={handleRadioChange}
        />
      </div>

      <div style={{ minHeight: 300 }}>
        {allDataGroupOptions.map((dataOption: ICollapseChart) => {
          return <CollapseChart data={dataOption} />
        })}
      </div>
    </Spin>
  )
}

export default StatCharts
