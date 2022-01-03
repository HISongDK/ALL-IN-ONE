import React from 'react'
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom'
import { Layout, Card, Text, ExternalLink, Menu, NavMenu } from 'tea-component'
import routesConfig from '../../router/config'

const { Header, Body, Sider, Content } = Layout

const icon: [string, string] = /** @type {[string, string]} */ [
  `https://via.placeholder.com/16.png?text=icon`,
  `https://via.placeholder.com/16/006eff/444444`,
]

export default function Home() {
  const history = useHistory()
  const { pathname } = useLocation()

  const pageJump = (path: string) => {
    history.push(path)
  }

  const firstRoute: any = routesConfig[0]

  return (
    <Layout className="demo-layout-l">
      <Header>
        <NavMenu
          left={
            <>
              <NavMenu.Item type="logo">
                <img
                  src="https://via.placeholder.com/32.png?text=LOGO"
                  alt="logo"
                />
              </NavMenu.Item>
              <NavMenu.Item>总览</NavMenu.Item>
            </>
          }
        />
      </Header>
      <Body>
        <Sider>
          <Menu
            collapsable
            theme="dark"
            title="产品名称"
            icon="https://via.placeholder.com/32.png?text=icon"
          >
            <Menu.SubMenu defaultOpened title="调试练习" icon={icon}>
              {routesConfig.map((route) => (
                <Menu.Item
                  key={route.path}
                  // title={<NavLink to={route.path}>{route.title}</NavLink>}
                  // render={() => <Link to={route.path}>{route.title}</Link>}
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
            // eslint-disable-next-line
            onBackButtonClick={console.log}
            title="内容标题"
            subtitle={
              <>
                说明文字 <Text theme="label">带颜色说明文字</Text>
              </>
            }
            operation={<ExternalLink weak>内容帮助</ExternalLink>}
          />
          <Content.Body>
            {/* 内容区域一般使用 Card 组件显示内容 */}
            <Card>
              <Card.Body>
                {/* 
                  注册路由
                */}
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
