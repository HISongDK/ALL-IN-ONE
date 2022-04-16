/**
 * Implements `setInterval()` in a declarative manner
 *
 * Create a custom hook that takes a callback and a delay
 * Use the useRef hook to create a ref for the callback function
 * Use a useEffect hook to remember the latest callback whenever it changes
 * Use a useEffect hook dependent on delay to set up the interval and clean up
 */

/* eslint-disable */
const { useState, useEffect, useRef } = React

const useInterval = (callback, delay) => {
    const savedCallback = useRef()
    useEffect(() => {
        // 监听是否变化并保存为 ref 应该是出于性能考虑
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        let id = setInterval(() => {
            // 我有一点无法理解的是，这个地方直接调用 callback 的话，该回调函数中的依赖项不会变化
            // 但是用 ref.current 保存的话，回调函数中可以监听到最新的 state 值
            // 看说是闭包保存了值啥的不太理解，用 ref 就能获取到新的
            savedCallback.current()
        }, delay)
        return () => clearInterval(id)
    }, [delay]) // 依赖项是避免参数为 state ，变动时未监听，还是使用旧值
}

const Timer = () => {
    const [seconds, setSeconds] = useState(0)
    useInterval(() => {
        // 调用 hooks 的代码自然是：每次重渲染都会执行
        setSeconds(seconds + 1)
    }, 1000)

    return <p>{seconds}</p>
}

ReactDOM.render(<Timer />, document.getElementById('root'))
