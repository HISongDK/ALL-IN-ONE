const container = document.getElementById('root')

class TestLifeCycle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            a: 1,
        }
    }

    UNSAFE_componentWillMount() {
        console.log('\n---  UNSAFE_componentWillMount  ---\n')
        this.setState({ a: 2 }, () => {
            // console.log('\n---  this.state.a  ---\n', this.state.a)
        })
    }

    componentDidMount() {
        console.log('\n---  componentDidMount  ---\n')
        setTimeout(() => {
            this.setState({ a: 3 })
        }, 1000)
    }

    UNSAFE_componentWillReceiveProps() {
        console.log('\n---  UNSAFE_componentWillReceiveProps  ---\n\n')
    }

    UNSAFE_componentWillUpdate() {
        console.log('\n--- UNSAFE_componentWillUpdate  ---\n\n')
    }

    componentDidUpdate() {
        console.log('\n--- componentDidUpdate  ---\n')
    }

    componentWillUnmount() {
        console.log('\n---  componentWillUnmount  ---\n')
    }

    handleUnmount() {
        ReactDOM.unmountComponentAtNode(container)
    }

    render() {
        console.log('\n---  render  ---\n')
        return (
            <div>
                生命周期执行顺序 <hr />{' '}
                <button onClick={this.handleUnmount}>卸载组件</button>{' '}
            </div>
        )
    }
}

const App = () => {
    const [props, setProps] = React.useState(0)

    React.useEffect(() => {
        setTimeout(() => {
            setProps(1)
        }, 2000)
    })

    return <TestLifeCycle a={props} />
}

ReactDOM.render(<App />, container)
