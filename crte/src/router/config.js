import Button from '../page/Button/Button'
import Icon from '../page/Icon/Icon'
import Result from '../page/Result'
import UseReducer from '../page/UseReducer/UseReducer'

const routes = [
  { path: '/useReducer', component: UseReducer, title: 'useReducer 参数控制' },
  { path: '/button', component: Button, title: '按钮' },
  { path: '/icon', component: Icon, title: '图标' },
  { path: '/result', component: Result, title: '结果' },
]

export default routes
