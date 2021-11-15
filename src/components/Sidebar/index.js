import { Menu } from 'antd'
import { AiOutlineUser, AiOutlineDashboard, AiOutlineLogout, AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/monstarlablogo.jpg'

export default function SideBar(props) {
  return (
    <>
      <div className="sidebar-logo flex-center">
        <Link to='/' className='flex-center'>
          <img src={logo} alt='logo' />
          {props.collapsed ? null : <h1>Monstarlab</h1>}
        </Link>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<AiOutlineDashboard />}>
          <Link to='/' className='menu-item-link'>Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AiOutlineUser />}>
          <Link to='/employees' className='menu-item-link'>
            List Employees
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AiOutlineUserAdd />}>
          <Link to='/add-employee' className='menu-item-link'>
            Add Employee
          </Link>
        </Menu.Item>
      </Menu>
      <Menu theme="dark" mode="inline" className='logout-item'>
        <Menu.Item key="logout" icon={<AiOutlineLogout />} onClick={props.logout}>
          Log out
        </Menu.Item>
      </Menu>
    </>
  )
}
