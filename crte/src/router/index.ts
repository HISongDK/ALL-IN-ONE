import CrossDomain from '@page/CrossDomain/CrossDomain'
import Button from '@page/Button/Button'
import Result from '@page/Result'
import UseReducer from '@page/UseReducer/UseReducer'
import SubEmit from '@page/SubEmit/SubEmit'
import NestedRoute from '@page/NestedRoute/NestedRoute'
// import SubRoute1 from '@page/NestedRoute/SubRoute1/SubRoute1'
import DynamicRoute from '@page/DynamicRoute/DynamicRoute'
import Env from '@page/Env/Env'
import RouteParams from '@page/RouteParams/RouteParams'
import UploadCom from '@page/Upload/Upload'
import Cascade from '@page/Cascade/Cascade'
import Filter from '@page/Filter/Filter'
import Toast from '@page/Toast'
import SearchTree from '@page/SearchTree'
import UseFetch from '@page/UseFetch'

const routes = [
  { path: '/useFetch', component: UseFetch, title: 'fetch hook' },
  { path: '/searchTree', component: SearchTree, title: '树状列表搜索' },
  { path: '/toast', component: Toast, title: '弹窗提示' },
  { path: '/filter', component: Filter, title: '多条件筛选' },
  { path: '/casCade', component: Cascade, title: '省市下拉级联' },
  { path: '/upload', component: UploadCom, title: '上传组件' },
  { path: '/routeParams', component: RouteParams, title: '路由传参' },
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
  },
  { path: '/subEmit', component: SubEmit, title: '子组件触发父组件渲染' },
  { path: '/useReducer', component: UseReducer, title: 'useReducer 参数控制' },
  { path: '/button', component: Button, title: '按钮' },
  { path: '/result', component: Result, title: '结果' },
]
export default routes
