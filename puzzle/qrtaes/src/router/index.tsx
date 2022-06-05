import React from 'react'
import { CheckCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons'
import Vue2 from '@pages/Vue2'
import Vue3 from '@pages/Vue3'
import Socket from '@pages/Socket'
import ApiTest from '@pages/ApiTest'

export interface IRoute {
  path: string
  name?: string
  icon?: any
  component: React.FC
}

interface IMenus {
  path: string
  title: string
}

export enum PATH {
  VUE2_PATH = '/vue2',
  VUE3_PATH = '/vue3',
  SOCKET = '/socket',
  API = '/api',
  HOME = '/',
}

export const menus: IMenus[] = [
  {
    title: 'vue2 微应用',
    path: PATH.VUE2_PATH,
  },
  {
    title: 'vue3 微应用',
    path: PATH.VUE3_PATH,
  },
  {
    title: 'socket 示例',
    path: PATH.SOCKET,
  },
  {
    title: '接口调用测试',
    path: PATH.API,
  },
]

const routes: IRoute[] = [
  {
    name: 'vue2 微应用',
    path: PATH.VUE2_PATH,
    icon: <CheckCircleOutlined />,
    component: Vue2,
  },
  {
    name: 'vue3 微应用',
    path: PATH.VUE3_PATH,
    icon: <IssuesCloseOutlined />,
    component: Vue3,
  },
  {
    name: 'socket 示例',
    path: PATH.SOCKET,
    component: Socket,
  },
  {
    name: '接口调用测试',
    path: PATH.API,
    component: ApiTest,
  },
  {
    name: '主页',
    path: PATH.HOME,
    component: ApiTest,
  },
]
export default routes
