import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import {
  Link,
  Route,
  Switch,
  // Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Switch as SwitchButton, Row } from 'antd'
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons'
import { useBreadcrumbs } from '@utils/hooks'
import microApps from './micro'
import routes, { menus } from './router/index'

const { Header, Content } = Layout

// 构建路由
const genRoutes = () => (
  <Switch>
    {/* <Redirect to={routes[routes.length - 1].path} /> */}
    {routes.map((route) => (
      <Route key={route.path} path={route.path} component={route.component} />
    ))}
  </Switch>
)

function App() {
  const history = useHistory()
  const { pathname } = useLocation()

  useEffect(() => {
    registerMicroApps(microApps)
    start()
  }, [])

  const changeTheme = (checked: boolean) => {
    const root = document.documentElement
    if (checked) {
      root.className = 'light'
    } else {
      root.className = 'dark'
    }
  }

  const breadcrumb = useBreadcrumbs()

  return (
    <Layout>
      <Header className="header">
        <Row justify="space-between" align="middle">
          <div className="logo">微前端初试</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[pathname]}
            style={{
              width: 'auto',
              height: '100%',
              borderRight: 0,
              flex: 1,
              margin: '0 30px',
            }}
          >
            {menus.map(({ path, title }) => (
              <Menu.Item key={path} onClick={() => history.push(path)}>
                {title}
              </Menu.Item>
            ))}
          </Menu>
          <SwitchButton
            checkedChildren={<SmileTwoTone />}
            unCheckedChildren={<SmileOutlined />}
            defaultChecked
            onChange={changeTheme}
          />
        </Row>
      </Header>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* 正常来说该是获取的面包屑路由数组，不过现在没层级路由 */}
            <Breadcrumb.Item>
              <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {genRoutes()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
