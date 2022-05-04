import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
// import { Layout, Card, ExternalLink, Menu, NavMenu } from 'tea-component'
import { Layout, Card, Nav } from '@douyinfe/semi-ui'
import routesConfig from '../../router/config'

const { Header, Sider, Content } = Layout
const firstRoute: any = routesConfig[0]

export default function Home() {
  const history = useHistory()
  const { pathname } = useLocation()

  const pageJump = (path: string) => {
    history.push(path)
  }

  return (
    <Layout>
      <Header style={{ height: '80px' }}>
        <Nav>某人练习的地方</Nav>
      </Header>
      <Layout>
        <Sider>
          <Nav
            bodyStyle={{ height: '100%' }}
            items={routesConfig.map((route) => ({
              itemKey: route.path,
              text: route.title,
            }))}
            onSelect={({ itemKey }) => pageJump(itemKey as string)}
          />
        </Sider>
        <Content>
          <Card>
            {/* 注册路由 */}
            <Switch>
              {routesConfig.map((route: any) => (
                <Route
                  key={route.path}
                  path={route.path}
                  // component={route.component}
                  render={() => (
                    <Route path={route.path} component={route.component} />
                  )}
                />
              ))}
              <Redirect exact from="/" to={routesConfig[0].path} />
              <Route render={(props) => <firstRoute.component {...props} />} />
            </Switch>
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}
