import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Routes } from 'react-router-dom'
import App from './App'

// 引入 easy-peasy 状态管理
import { StoreProvider } from 'easy-peasy'
import store from './store/store'
// 引入 tea css
import 'tea-component/dist/tea.css'

ReactDOM.render(
  <StoreProvider store={store}>
    <Routes>
      <App />
    </Routes>
  </StoreProvider>,
  document.getElementById('root'),
)
