// react snippets
// hook 组件: rcfe
import React, { useState, useEffect, useContext } from 'react'
import ExampleWithManyStates from './hooks/ExampleWithManyStates'
import store from './context/storeContext'

function Example() {
    // 声明一个叫做 count 的 state 变量.
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `点了${count}次`
    })

    /**
     * 测试使用 useContext hook
     */
    const testContext = useContext(store)
    console.log(testContext, 'provider 不提供value时')

    return (
        <div>
            <p>你点了我 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>点我</button>
            <ExampleWithManyStates />
        </div>
    )
}

export default Example
