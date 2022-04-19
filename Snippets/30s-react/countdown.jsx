/* eslint-disable */

// 一道面试题，写是能写出来，不过就是还有一些很暧昧不清弄不明白的地方
const useTimeDown = (initialValue) => {
    const timerRef = React.useRef()
    // const timerRef = {}

    const [value, setValue] = React.useState(initialValue)

    const setTimer = () => {
        timerRef.current = setInterval(() => {
            setValue((time) => time - 1)
        }, 1000)
    }

    React.useEffect(() => {
        setTimer()
        return () => clearInterval(timerRef.current)
    }, [])

    const start = () => {
        setTimer()
    }

    const stop = () => {
        clearTimeout(timerRef.current)
    }

    const cancel = () => {
        setValue(initialValue)
        clearTimeout(timerRef.current)
    }

    return [value, { start, stop, cancel }]
}

const App = () => {
    const [time, timerControl] = useTimeDown(100)

    return (
        <div>
            <p>倒计时：{time}</p>
            <p>
                <button onClick={() => timerControl.start()}>开始</button>
                <button onClick={() => timerControl.stop()}>停止</button>
                <button onClick={() => timerControl.cancel()}>取消</button>
            </p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
