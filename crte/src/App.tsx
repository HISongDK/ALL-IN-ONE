import React from 'react'
// import Component from './component'
// import SearchList from './SearchList'
import ResultPage from './page/ResultPage'
import Result from './page/Result'
import './index.css'

function App() {
  return (
    <div className="App">
      {/* <SearchList /> */}
      <ResultPage code={404} text="无权限" />
      <Result code={404} text={'123'} />
    </div>
  )
}

export default App
