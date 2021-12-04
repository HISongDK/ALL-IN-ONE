// react snippets
// hook 组件: rcfe
import React, { useState, useEffect, useReducer, useMemo } from 'react'
import ExampleWithContext from './hooks/ExampleWithContext'
import Store from './context/storeContext'

function Example() {
    // 声明一个叫做 count 的 state 变量.
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `点了${count}次`
    })

    /**
     * 使用 useReducer & useContext
     */
    const initState = {
        name: 'songDK',
        age: 24,
        num: 0,
    }

    const reducer = (state, action) => {
        console.log('reducer执行', state, action)
        state = { ...state }
        switch (action.type) {
            case 'CHANGE_NAME':
                return {
                    ...state,
                    name: action.payload,
                }
            case 'ADD_AGE':
                return {
                    ...state,
                    age: ++state.age,
                }
            case 'CHANGE_NUM':
                return {
                    ...state,
                    num: action.payload,
                }
            default:
                return state
        }
    }

    const [state, dispatchState] = useReducer(reducer, initState)

    const storeValue = useMemo(() => [state, dispatchState], [state])

    return (
        <Store.Provider value={storeValue}>
            <p>你点了我 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>点我</button>
            <ExampleWithContext />
            <button
                onClick={() =>
                    dispatchState({ type: 'CHANGE_NUM', payload: ++state.num })
                }
            >
                父组件中 dispatch
            </button>
        </Store.Provider>
    )
}

export default Example
