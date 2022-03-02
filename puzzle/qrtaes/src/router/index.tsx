import React from 'react'
import { CheckCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons'
import Vue2 from '@pages/Vue2'
import Vue3 from '@pages/Vue3'

export interface IRoute {
  path: string
  name?: string
  icon?: any
  component: React.FC
}

export enum PATH {
  VUE2_PATH = '/vue2/',
  VUE3_PATH = '/vue3/',
}

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
]

export default routes
