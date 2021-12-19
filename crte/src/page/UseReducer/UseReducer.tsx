import React, { ReactElement, useReducer, useEffect } from 'react'

interface Props {
  [key: string]: any
}
interface IAction {
  type: string
  payload?: any
}

function UseReducer(props: Props): ReactElement {
  const initialParams = {
    filter: [],
    pageNum: '1',
  }
  const paramsReducer = (state: any, { type, payload }: IAction) => {
    switch (type) {
      case 'change_time': {
        let filter = [...state.filter]
        let timeInd = filter.findIndex((item) => item.key === 'time')
        if (timeInd > -1) {
          filter[timeInd].values = payload
        } else {
          filter.push({ key: 'time', values: payload })
        }

        return { ...state, filter }
      }
      case 'clear_time': {
        let filter = [...state.filter]
        filter.forEach((item, index) => {
          if (item.key === 'time') {
            filter.splice(index, 1)
          }
        })
        return { ...state, filter }
      }

      default:
        return state
    }
  }

  const [params, dispatchParams] = useReducer(paramsReducer, initialParams)

  function addTime() {
    let startTime = Date.now()
    let endTime = new Date(Date.now() + 30000).getTime()

    dispatchParams({ type: 'change_time', payload: [startTime, endTime] })
  }
  function clearTime() {
    dispatchParams({ type: 'clear_time' })
  }

  useEffect(() => {
    console.log('每次打印参数状态: ', params)
  })
  return (
    <div>
      <h2>测试使用 useReducer</h2>
      <button onClick={addTime}>选中今天时间</button>
      <button onClick={clearTime}>清空时间</button>
    </div>
  )
}

export default UseReducer
