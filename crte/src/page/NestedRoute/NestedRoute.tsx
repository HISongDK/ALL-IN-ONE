import React from 'react'
import { Link, Redirect, Route, useHistory } from 'react-router-dom'
import SubRoute1 from './SubRoute1/SubRoute1'
import SubRoute2 from './SubRoute2/SubRoute2'

let arr = [1, 2]

function NestedRoute() {
  const history = useHistory()
  const changeRoute = () => {
    const [a, b] = arr
    arr = arr.reverse()
    history.push(`/nestedRoute/subRoute${a}`)
  }
  return (
    <div>
      试试怎么嵌套路由 <hr />
      <button onClick={changeRoute}>切换路由</button>
      <hr />
      <ul>
        <li>
          <Link to={'/nestedRoute/subRoute1'}>sub1</Link>
        </li>
        <li>
          <Link to={'/nestedRoute/subRoute2'}>sub2</Link>
        </li>
      </ul>
      <Route path={'/nestedRoute/subRoute1'} component={SubRoute1}></Route>
      <Route path={'/nestedRoute/subRoute2'} component={SubRoute2}></Route>
      <Redirect to={'/nestedRoute/subRoute1'} />
    </div>
  )
}

export default NestedRoute
