import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Layout, Card, ExternalLink, Menu, NavMenu } from 'tea-component'
import routesConfig from '../../router/config'

const { Header, Body, Sider, Content } = Layout
const firstRoute: any = routesConfig[0]

export default function Home() {
  const history = useHistory()
  const { pathname } = useLocation()

  const pageJump = (path: string) => {
    history.push(path)
  }

  return (
    <Layout className="demo-layout-l">
      <Header>
        <NavMenu left={<NavMenu.Item>某人练习的地方</NavMenu.Item>} />
      </Header>
      <Body>
        <Sider>
          <Menu collapsable theme="dark">
            <Menu.SubMenu defaultOpened title="调试练习">
              {routesConfig.map((route) => (
                <Menu.Item
                  key={route.path}
                  title={<span>{route.title}</span>}
                  selected={pathname === route.path}
                  onClick={() => pageJump(route.path)}
                />
              ))}
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content>
          <Content.Header
            showBackButton
            onBackButtonClick={() => history.goBack()}
            operation={
              <ExternalLink weak href="https://github.com/HISongDK">
                GitHub
              </ExternalLink>
            }
          />
          <Content.Body>
            {/* 内容区域一般使用 Card 组件显示内容 */}
            <Card>
              <Card.Body>
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
                  <Route
                    render={(props) => <firstRoute.component {...props} />}
                  />
                </Switch>
              </Card.Body>
            </Card>
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  )
}
