const useTitle = (title) => {
    const documentDefined = typeof document !== 'undefined'
    const originalTitle = React.useRef(documentDefined ? document.title : null)

    React.useEffect(() => {
        if (!documentDefined) return
        if (document.title !== title) document.title = title
        return () => {
            document.title = originalTitle.current
        }
    })
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
                Toggle Alert
            </button>
            {alertOpen && <Alert />}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
