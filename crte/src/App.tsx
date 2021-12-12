import React from 'react'
// import Component from './component'
// import SearchList from './SearchList'
import ResultPage from './page/ResultPage'
import Result from './page/Result'
import './index.css'

import { useStoreState, useStoreActions } from 'easy-peasy'

import TodoList from './components/TodoList'
import Home from './page/Home/Home'

function App() {
  const todos = useStoreState((state: any) => state.todos.list)
  const del = useStoreActions((actions: any) => actions.todos.delete)
  console.log(todos)
  console.log(del)
  return (
    // <div className="App">
    //   {/* <SearchList /> */}
    //   {/* <ResultPage code={404} text="无权限" /> */}
    //   {/* <Result code={404} text={'123'} /> */}
    //   {todos.map((item: string, index: number) => (
    //     <li key={index} onClick={() => del(index)}>
    //       {item}
    //     </li>
    //   ))}
    //   <hr />
    //   <TodoList></TodoList>
    // </div>

    <div className="App">
      <Home />
    </div>
  )
}

export default App
