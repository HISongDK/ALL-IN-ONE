/**
 * Sets the title of the page
 *
 * Use typeof to determine if the Document is defined or not
 * Use the useRef hook to store the original title of the Document,if defined
 * Use the useEffect hook to set Document.title to the passed value when the component mounts and clean up when unmounting
 */
/* eslint-disable */
const useTitle = (title) => {
    const documentDefined = typeof document !== 'undefined'
    const originalTitle = React.useRef(documentDefined ? document.title : null)

    React.useEffect(() => {
        if (!documentDefined) return
        if (document.title !== title) document.title = title
        return () => (document.title = originalTitle.current)
    }, [])
}

const Alert = () => {
    useTitle('Alert')
    return <p>Alert! Title has changed</p>
}

const App = () => {
    const [alertOpen, setAlertOpen] = React.useState(false)

    return (
        <div>
            <button onClick={() => setAlertOpen(!alertOpen)}>
                Toggle alert
            </button>
            {alertOpen && <Alert />}
        </div>
    )
}

ReactDOM.render(<App></App>, document.getElementById('root'))
