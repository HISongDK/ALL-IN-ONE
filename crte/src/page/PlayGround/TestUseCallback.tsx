import React, { useRef, useState, useCallback } from 'react'

const Button = React.memo(({ handleClick }: any) => {
  // 因为 React.memo 保证组件在 props 未变动的时候不重新渲染
  // 但是 函数 实例每次会新建变化，传入子组件 props 前需要使用 useCallback 包裹
  const countRef = useRef(0)
  return (
    <button type="button" onClick={handleClick}>
      {/* eslint-disable-next-line */}
      button render count: {countRef.current++}
    </button>
  )
})

function TestUseCallback() {
  const [isOn, setIsOn] = useState(false)
  const [otherState, setOtherState] = useState(false)
  // 用 useCallback 包裹的更新状态的函数的组件参数，父组件重渲染，函数参数实例不边，不会导致 React.memo 包裹的子组件重新渲染
  const handleClick = useCallback(() => setIsOn((prev) => !prev), [])
  return (
    <div>
      <h1>{isOn ? 'ON' : 'OFF'}</h1>
      <Button handleClick={handleClick} />
    </div>
  )
}

export default TestUseCallback
