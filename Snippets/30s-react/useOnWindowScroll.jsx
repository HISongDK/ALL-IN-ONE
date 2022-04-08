/* 
		Executes a callback when the window is scrolled
*/

// Use the `useRef()` hook to create a variable,`listener`,which will hold the listener reference.
// Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the `scroll` event of the `Window` global object.
// Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */

/* 
    原来里面用到 ref 之类被我删掉了，感觉不对劲，没有作用。不知道什么情况
*/
const useOnWindowScroll = (callback) => {
    React.useEffect(() => {
        window.addEventListener('scroll', callback)
        return () => window.removeEventListener('scroll', callback)
    }, [callback])
}

const App = () => {
    useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`))

    return <p style={{ height: '300vh' }}>Scroll and check the console</p>
}

ReactDOM.render(<App />, document.getElementById('root'))
