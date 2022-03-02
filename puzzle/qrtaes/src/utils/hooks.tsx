import { useLocation } from 'react-router-dom'
import routes, { IRoute } from '@/router'

const useBreadcrumbs = (): IRoute => {
  const { pathname } = useLocation()
  return routes.find((route) => route.path === pathname) || routes[0]
}

export { useBreadcrumbs }
