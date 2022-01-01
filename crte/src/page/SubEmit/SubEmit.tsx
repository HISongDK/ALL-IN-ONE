import React, { ReactElement, useEffect, useReducer, useContext } from 'react'
import './style.css'
import './style.scss'
import './style.less'

const forceUpdateContext = React.createContext<() => void>(() => {})

// 最内层组件
function ChildrenCom() {
  const forceUpdate = useContext(forceUpdateContext)
  const renderFather = () => {
    // eslint-disable-next-line
    console.log('子组件触发：')
    forceUpdate()
  }
  return (
    <div>
      <button type="button" onClick={renderFather}>
        内层子组件
      </button>
    </div>
  )
}

// 中间层组件
function MiddleComponent() {
  return (
    <div>
      中间级子组件
      <ChildrenCom />
    </div>
  )
}

// 外层父组件
function SubEmit(): ReactElement {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    // eslint-disable-next-line
    console.log('父组件渲染')
  }, [ignored])

  return (
    <div className="subemit">
      子组件触发父组件重渲染
      <br />
      <br />
      <br />
      父组件
      <hr />
      <forceUpdateContext.Provider value={forceUpdate}>
        <MiddleComponent />
      </forceUpdateContext.Provider>
    </div>
  )
}

export default SubEmit
