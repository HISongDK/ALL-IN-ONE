import logo from './logo.svg'
import './App.css'
import Component from './component'

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
    </div>
  )
}

export default App
