/* 
    Debounce the given value
*/

// Create a custom hook that takes a value and a delay
// Use the useState() hook to store the debounce value
// Use the useEffect() hook to update the debounce value every time value is updated.
// Use setTimeout() to create a timeout that delays invoking the setter of the previous state variable by delay ms.
// Use clearTimeout() to clean up when dismounting the component.
// This is particularly useful when dealing with user input.

/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
const useDebounce = (value, delay = 500) => {
    const [debounceValue, setDebounceValue] = React.useState(value)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(timer)
    }, [value])

    /* 
      hook 防抖之前肯定也是试过
      不过应该确实没想到给高频变化之后的值做一下防抖
    */

    return debounceValue
}

const App = () => {
    const [value, setValue] = React.useState(0)
    const debounceValue = useDebounce(value)

    return (
        <div>
            <p>
                Current:{value} - Debounce:{debounceValue}
            </p>
            <button onClick={() => setValue(value + 1)}>Increment</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
