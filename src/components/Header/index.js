import { Space, Avatar, Menu, Dropdown } from 'antd';
import { defaultAvatar } from '../../core/constants';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai'

export default function CustomHeader(props) {
  let auth = useAuth()
  const menu = (
    <Menu>
      <Menu.Item key='profile' icon={<AiOutlineUser />}>
        <Link to='/profile'>
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key='setting' icon={<AiOutlineSetting />}>
        <Link to='/setting'>
          Setting
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout' icon={<AiOutlineLogout />} onClick={props.logout}>
        Log out
      </Menu.Item>
    </Menu>
  );
  
  return (
    <>
      <Space className='header-right-panel'>
        <div className='space-item'>
          <Dropdown overlay={menu} placement='bottomCenter'>
            <Link to='/profile' className='flex-center' onClick={e => e.preventDefault()}>
              <Avatar size="small" src={defaultAvatar} />
              <span className='span-user-name'>{auth.user}</span>
            </Link>
          </Dropdown>
        </div>
      </Space>
    </>
  )
}
