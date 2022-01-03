import React from 'react'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from 'react-router-dom'

function RouteParams() {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch()
  const params = useParams()

  // eslint-disable-next-line
  console.log(history, location, match, params)

  const handleSendStateParams = () => {
    /**
     * 这里用 match.path 配置路由及跳转而非 match.url 的原因：
     * url 后面可能带有 /
     */
    history.push(`${match.path}/statesParams`, '刷新后state参数是否丢失')
  }
  return (
    <div className="route_params">
      <div>路由传参</div>
      <hr />
      <nav>
        <button onClick={handleSendStateParams} type="submit">
          state 路由传参
        </button>
      </nav>
      <hr />
      <Switch>
        <Route
          path={`${match.path}/statesParams`}
          render={({ location: { state } }) => {
            return <>测试路由 state 参数是否丢失：{state}</>
          }}
        />
      </Switch>
    </div>
  )
}

export default RouteParams
