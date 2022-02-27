import MicroPage from '@pages/Micro/Micro'

interface IRoute {
  path: string
  component: React.FC
}

const routes: IRoute[] = [
  {
    path: '/MicroPage',
    component: MicroPage,
  },
]

export default routes
