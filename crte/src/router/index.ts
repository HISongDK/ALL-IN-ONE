// import CrossDomain from '@page/CrossDomain/CrossDomain'
// import Button from '@page/Button/Button'
// import Result from '@page/Result'
import { lazy } from 'react'
import ResultPage from '@/page/ResultPage/ResultPage'
import ModalConfirmPromise from '@/page/Modal'
// import Modal from '@/components/Modal/Modal'
// import UseReducer from '@page/UseReducer/UseReducer'
// import SubEmit from '@page/SubEmit/SubEmit'
// import NestedRoute from '@page/NestedRoute/NestedRoute'
// // import SubRoute1 from '@page/NestedRoute/SubRoute1/SubRoute1'
// import DynamicRoute from '@page/DynamicRoute/DynamicRoute'
// import Env from '@page/Env/Env'
// import RouteParams from '@page/RouteParams/RouteParams'
// import UploadCom from '@page/Upload/Upload'
// import Cascade from '@page/Cascade/Cascade'
// import Filter from '@page/Filter/Filter'
// import Toast from '@page/Toast'
// import SearchTree from '@page/SearchTree'
// import UseFetch from '@page/PlayGround'
// import FiftyProjects from '@page/50Projects/index'
// import { subMenus } from '@/page/50Projects/router'
// import AntvX6 from '@/page/AntvX6'
// import Exercise from '@/page/Exercise'
// import Procrastination from '@/page/Procrastination'

const Exercise = lazy(() => import('@/page/Exercise'))
const Procrastination = lazy(() => import('@/page/Procrastination'))

const routes = [
  {
    path: '/exercise',
    route: '/exercise/:type?',
    component: Exercise,
    title: '锻炼日志',
  },
  {
    path: '/procrastination',
    route: '/procrastination',
    component: Procrastination,
    title: '拖延列表',
  },
  // { path: '/antvX6', route: '/antvX6', component: AntvX6, title: 'Antv/X6' },
  // {
  //   path: '/50days',
  //   route: '/50days',
  //   component: FiftyProjects,
  //   title: '50Days',
  //   children: subMenus,
  // },
  // { path: '/playground', component: UseFetch, title: 'Just For Fun' },
  // { path: '/searchTree', component: SearchTree, title: '树状列表搜索' },
  // { path: '/toast', component: Toast, title: '弹窗提示' },
  // { path: '/filter', component: Filter, title: '多条件筛选' },
  // { path: '/casCade', component: Cascade, title: '省市下拉级联' },
  // { path: '/upload', component: UploadCom, title: '上传组件' },
  // { path: '/routeParams', component: RouteParams, title: '路由传参' },
  // { path: '/env', component: Env, title: '环境变量' },
  // {
  //   path: '/dynamicRoute/:params?',
  //   component: DynamicRoute,
  //   title: '动态路由传参调试',
  // },
  // { path: '/crossDomain', component: CrossDomain, title: '配置跨域代理' },
  // {
  //   path: '/nestedRoute',
  //   component: NestedRoute,
  //   title: '嵌套路由',
  // },
  // { path: '/subEmit', component: SubEmit, title: '子组件触发父组件渲染' },
  // { path: '/useReducer', component: UseReducer, title: 'useReducer 参数控制' },
  //   { path: '/button', component: Button, title: '按钮' },
  // { path: '/result', component: ResultPage, title: '结果' },
  { path: '/modal', component: ModalConfirmPromise, title: '结果' },
]

export const breadcrumbMap = {
  exercise: '锻炼日志',
}

export default routes
