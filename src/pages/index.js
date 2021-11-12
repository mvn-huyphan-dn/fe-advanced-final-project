import { Switch, Route, Redirect } from "react-router";
import { Layout, Spin } from "antd";
import { CustomFooter, CustomHeader, SideBar } from "../components";
import { useAuth } from "../hooks";
import { useHistory } from "react-router";
import PrivateRoute from '../core/guards/PrivateRoute'
import {
  Employees,
  NotFound,
  Dashboard,
  AddEmployee,
  EditEmployee,
  EmployeeDetail
} from './Features'
import { Suspense, useState } from 'react'

const { Header, Footer, Sider, Content } = Layout;

export default function Pages() {
  const [collapsed, setCollapsed] = useState(false)
  let auth = useAuth()
  let history = useHistory();
  let logout = () => {
    auth.signout(() => {
      localStorage.removeItem('user')
      history.replace('/login')
    })
  }

  const onCollapse = () => {
    setCollapsed(!collapsed);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className='page-sidebar'
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <SideBar collapsed={collapsed} logout={logout} />
      </Sider>
      <Layout className='page-layout'
        style={{ marginLeft: collapsed ? '80px' : '200px' }}
      >
        <Header className={`page-header flex ${collapsed ? `pr-130` : `pr-250`}`}>
          <CustomHeader logout={logout} />
        </Header>
        <Content className='page-content'>
          <Suspense
            fallback={
              <div className='page-loading flex-center' style={{ minHeight: '100vh' }}>
                <Spin tip='Loading...' />
              </div>
            }>
            <Switch>
              <PrivateRoute exact path='/'>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path='/employees/:employeeId'>
                <EmployeeDetail />
              </PrivateRoute>
              <PrivateRoute path='/employees'>
                <Employees />
              </PrivateRoute>
              <PrivateRoute path='/add-employee'>
                <AddEmployee />
              </PrivateRoute>
              <PrivateRoute path='/edit-employee/:employeeId'>
                <EditEmployee />
              </PrivateRoute>
              <Route path='/404' component={NotFound} />
              <Redirect from='/*' to='/404' />
            </Switch>
          </Suspense>
        </Content>
        <Footer className='page-footer'>
          <CustomFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}
