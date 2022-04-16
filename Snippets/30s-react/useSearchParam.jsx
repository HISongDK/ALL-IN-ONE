/**
 * Tracks the browser's location search params
 *
 * Use the useCallback() hook to create a callback that use the URLSearchParams constructor to get the current value of param
 * Use the useState() hook to create a state variable to hold the current value of param
 * Use the useEffect() hook to set appropriate event listeners to update the state variable when mounting and clean up when unmounting
 */

var _wr = function (type) {
    var orig = history[type]

    return function () {
        orig.apply(this, arguments)
        var e = new Event(type)
        window.dispatchEvent(e)
    }
}

// 覆写以下方法，注册并触发事件
history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState')

/* eslint-disable */
const useSearchParams = (param) => {
    const getValue = React.useCallback(
        () => new URLSearchParams(window.location.search).get(param),
        [param],
    )

    // 直接传入回调
    const [value, setValue] = React.useState(getValue)

    React.useEffect(() => {
        // 这些代码确实让我对回调的使用多了一点认识
        const onChange = () => {
            console.log('执行了么')
            setValue(getValue())
        }

        // 只知道一点路由控制貌似室通过这几个事件
        window.addEventListener('popstate', onChange)
        window.addEventListener('pushState', onChange)
        window.addEventListener('replaceState', onChange)
        return () => {
            window.removeEventListener('popstate', onChange)
            window.removeEventListener('pushState', onChange)
            window.removeEventListener('replaceState', onChange)
        }
    }, [])

    return value
}

const App = () => {
    const post = useSearchParams('post')

    return (
        <div>
            <p>Post param value: {post || null}</p>
            <button
                onClick={() =>
                    history.pushState({}, '', location.pathname + '?post=42')
                }
            >
                View post 42
            </button>
            <button
                onClick={() => history.pushState({}, '', location.pathname)}
            >
                Exit
            </button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
