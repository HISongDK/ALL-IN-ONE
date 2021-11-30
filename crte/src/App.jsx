import Component from './component'
import SearchList from './SearchList'

function App() {
  let a = 1
  const handleClick = () => {
    console.log(a)
    a = a + 1
  }
  return (
    <div className="App">
      <Component a={a}></Component>
      <button onClick={handleClick}>ADD-a</button>
      <br />
      <br />
      <SearchList />
    </div>
  )
}

export default App
