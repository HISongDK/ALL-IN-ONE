import React from 'react'
import { Link, Route, useHistory } from 'react-router-dom'
import SubRoute1 from './SubRoute1/SubRoute1'

function NestedRoute() {
  const history = useHistory()
  const changeRoute = () => {
    history.push('/SubRoute1')
  }
  return (
    <div>
      试试怎么嵌套路由 <hr />
      <button onClick={changeRoute}>切换路由</button>
      <hr />
      <ul>
        <li>
          <Link to={'SubRoute1'}>sub1</Link>
        </li>
      </ul>
      <Route path={'SubRoute1'} component={SubRoute1}></Route>
    </div>
  )
}

export default NestedRoute
