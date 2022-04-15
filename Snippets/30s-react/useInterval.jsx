const { useState, useEffect, useRef } = React

const useInterval = (callback, delay) => {
    const savedCallback = useRef()
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => {
            savedCallback.current()
        }

        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

const Timer = (props) => {
    const [seconds, setSeconds] = useState(0)
    useInterval(() => {
        setSeconds(seconds + 1)
    }, 1000)

    return <p>{seconds}</p>
}

ReactDOM.render(<Timer />, document.getElementById('root'))
