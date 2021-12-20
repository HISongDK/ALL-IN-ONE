import React, { ReactElement, useEffect, useReducer, useContext } from 'react'
import './style.css'

const forceUpdateContext = React.createContext<() => void>(() => {})

function SubEmit(): ReactElement {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
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

function MiddleComponent() {
  return (
    <div>
      中间级子组件
      <ChildrenCom />
    </div>
  )
}

function ChildrenCom() {
  const forceUpdate = useContext(forceUpdateContext)
  const renderFather = () => {
    console.log('子组件触发：')
    forceUpdate()
  }
  return (
    <div>
      <button onClick={renderFather}>内层子组件</button>
    </div>
  )
}

export default SubEmit
