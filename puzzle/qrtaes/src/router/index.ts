import MicroPage from '@pages/Micro/Micro'

interface IRoute {
  path: string
  // component: React.FC
  component: any
}

const routes: IRoute[] = [
  {
    path: '/MicroPage',
    component: () => 'string',
  },
]

export default routes
