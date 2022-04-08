/* 
   Create a stateful value that is persisted to `localStorage`, and a function to update it.
*/

// Use the `useState` with a function to initialize its value lazily.

// Use a `try...catch` block and `Storage.getItem` to try and get the value from `Window.localStorage`.If value is not found, use `Storage.setItem()` to store the `defaultValue` and use it as initial state. If an error occurs, use `defaultValue` as the initial state.

// Define a function that will update the state variable with the passed value and use `Storage.setItem()` to store it.

/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
const useLocalStorage = (key, defaultValue) => {
    const [storedValue, setStoredValue] = React.useState(() => {
        try {
            const value = window.localStorage.getItem(key)
            if (value) {
                return JSON.parse(value)
            } else {
                window.localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })

    const setValue = (newValue) => {
        window.localStorage.setItem(key, JSON.stringify(newValue))
        setStoredValue(newValue)
    }

    return [storedValue, setValue]
}

const MyApp = () => {
    const [name, setName] = useLocalStorage('name', 'dksong')

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <AcceptStorage />
        </div>
    )
}

const AcceptStorage = () => {
    const [name, setName] = useLocalStorage('name')
    /* 
      其他地方用到这个 storage 的值是不会同步变化的，所以觉得这种封装意义不大，只有单组件中的响应式，还不如我直接每个用到的地方 getItem 一下

      就想着监听一下 storage 顺便更新状态就行了
      发现在相同页面是不能直接 window.addEventListener('storage',(e)=>{}) 的

      莫得办法先不管了
    */
    console.log(name)
    return null
}

ReactDOM.render(<MyApp />, document.getElementById('root'))
