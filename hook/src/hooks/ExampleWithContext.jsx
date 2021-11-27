import React, { useContext } from 'react'
import store from '../context/storeContext'

function ExampleWithContext() {
    /**
     * 使用 useContext 获取上下问状态
     */
    const [state, dispatch] = useContext(store)

    const handleAgeAdd = () => {
        console.log('应该是执行了')
        dispatch({
            type: 'ADD_AGE',
        })
    }

    console.log('渲染')
    return (
        <div>
            <p>年龄: {state.age}</p>
            <p>姓名 {state.name}</p>
            <button onClick={handleAgeAdd}>年龄增长</button>
        </div>
    )
}

export default ExampleWithContext
