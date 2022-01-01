import CrossDomain from '@page/CrossDomain/CrossDomain'
import Button from '../page/Button/Button'
import Icon from '../page/Icon/Icon'
import Result from '../page/Result'
import UseReducer from '../page/UseReducer/UseReducer'
import SubEmit from '../page/SubEmit/SubEmit'
import NestedRoute from '../page/NestedRoute/NestedRoute'
// import SubRoute1 from '../page/NestedRoute/SubRoute1/SubRoute1'
import DynamicRoute from '../page/DynamicRoute/DynamicRoute'
import Env from '../page/Env/Env'

const routes = [
  { path: '/env', component: Env, title: '环境变量' },
  {
    path: '/dynamicRoute/:params?',
    component: DynamicRoute,
    title: '动态路由传参调试',
  },
  { path: '/crossDomain', component: CrossDomain, title: '配置跨域代理' },
  {
    path: '/nestedRoute',
    component: NestedRoute,
    title: '嵌套路由',
    // children: [
    //   { path: '/', component: NestedRoute },
    //   { path: '/subRoute1', component: SubRoute1 },
    // ],
  },
  { path: '/subEmit', component: SubEmit, title: '子组件触发父组件渲染' },
  { path: '/useReducer', component: UseReducer, title: 'useReducer 参数控制' },
  { path: '/button', component: Button, title: '按钮' },
  { path: '/icon', component: Icon, title: '图标' },
  { path: '/result', component: Result, title: '结果' },
]
export default routes
