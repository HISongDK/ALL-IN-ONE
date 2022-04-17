/**
 * Implements setTimeout in a declarative manner
 *
 * Use the useRef() hook to create a Ref for the callback function
 * Use the useEffect() hook to remember the latest callback
 * Use the useEffect() hook to set up timeout and clean up
 */

/* eslint-disable */
const useTimeout = (fn, delay) => {
    const fnRef = React.useRef()
    React.useEffect(() => {
        fnRef.current = fn
    }, [fn])

    React.useEffect(() => {
        let id = setTimeout(() => {
            fnRef.current()
        }, delay)
        return () => clearTimeout(id)
    }, [delay])
}

const App = () => {
    const [second, setSeconds] = React.useState(0)
    useTimeout(() => {
        setSeconds(second + 1)
    }, 1000)

    return <p>{second}</p>
}

ReactDOM.render(<App />, document.getElementById('root'))
