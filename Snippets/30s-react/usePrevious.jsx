/* 
   Store the previous state or props 
*/

// Create a custom hook take a value
// Use the `useRef()` hook to create a `ref` for the value
// Use the `useEffect()` hook to remember the latest value

/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
const Counter = () => {
    const [value, setValue] = React.useState(0)
    console.log('---  value  ---\n', value)
    const lastValue = usePrevious(value)
    console.log('---  lastValue  ---\n', lastValue)

    React.useEffect(() => {
        console.log('---  Date.now()  ---\n', Date.now())
    })

    return (
        <div>
            {Date.now()}
            <p>
                Current: {value} - Previous: {lastValue}
            </p>
            <button onClick={() => setValue(value + 1)}>Increment</button>
        </div>
    )
}

const usePrevious = (value) => {
    const ref = React.useRef()
    React.useEffect(() => {
        ref.current = value
        console.log('---  ref.current useEffect  ---\n', ref.current)
    })
    console.log('---  ref.current  ---\n', ref.current)
    return ref.current

    /* 
      本来没看懂，想着这不是每次都更新值了么
      试着时间戳打印了下才发现：
      useEffect 传入的回调确实是在 return 回去的 jsx 渲染之后才会执行，反正就是在 return 之后执行
      所以每次 return 的时候确实是上次 useEffect 里面更改后保存的 ref.current 的值
  */
}

ReactDOM.render(<Counter />, document.querySelector('#root'))
