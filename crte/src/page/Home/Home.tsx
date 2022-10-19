import React, { useMemo } from 'react'
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Layout, Card, Menu, Breadcrumb } from 'antd'
import UserInfo from './components/UserInfo'
import routesConfig from '@/router'
import './index.scss'

const { Header, Sider, Content } = Layout

const firstRoute: any = routesConfig[0]

const items = routesConfig.map((route) => ({
  key: route.path,
  label: route.title,
  children: route.children,
}))

export default function Home() {
  const history = useHistory()
  const { pathname } = useLocation()

  const selectKey = useMemo(
    () => `/${pathname.split('/').slice(1).join('/')}`,
    [pathname],
  )

  const pageJump = ({ key }: any) => {
    history.push(key)
  }

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        某人练习的地方
        <UserInfo />
      </Header>
      <Layout>
        <Sider theme="light" style={{ overflow: 'auto' }}>
          <Menu
            selectedKeys={[selectKey]}
            items={items}
            mode="inline"
            onClick={pageJump}
          />
        </Sider>
        <Layout
          style={{ padding: '0 24px 24px', height: '100%', overflow: 'auto' }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            {pathname.split('/').map((path, index, pathArray) => (
              <Breadcrumb.Item
                key={path}
                onClick={() =>
                  index !== pathArray.length - 1 && history.push(`/${path}`)
                }
              >
                {path}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content style={{ minHeight: 'unset' }}>
            <Card style={{ height: '100%' }} bodyStyle={{ height: '100%' }}>
              {/* 注册路由 */}
              <Switch>
                {routesConfig.map((route: any) => (
                  <Route
                    key={route.path}
                    path={route.path}
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
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
