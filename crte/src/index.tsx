import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom'
// 引入 easy-peasy 状态管理
import { StoreProvider } from 'easy-peasy'
import Login from '@page/Login'
import App from './App'

import store from './store/store'
// 引入 tea css
import 'tea-component/dist/tea.css'
// 引入 antd 样式
import 'antd/dist/antd.min.css'

ReactDOM.render(
  <StoreProvider store={store}>
    <Routes>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Routes>
  </StoreProvider>,
  document.getElementById('root'),
)
