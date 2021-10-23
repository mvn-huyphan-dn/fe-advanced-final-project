import { Form, Input, Button, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import logo from '../../../assets/images/monstarlablogo.jpg'

import { useHistory, useLocation } from "react-router";
import { useAuth } from '../../../hooks';
import { useEffect } from 'react';
import { fakeAuth } from '../../../core/services';

export default function LoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const onSubmit = () => {
    login();
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser && !auth.user) {
      const foundUser = JSON.parse(loggedInUser)
      auth.setUser(foundUser.username)
      fakeAuth.isAuthenticated = true;
      history.replace(from);
    }
  //eslint-disable-next-line
  }, [])

  return (
    <div className='page-login'>
      <Row className='row' align='middle' justify='center'>
        <form
          className='form-login'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='logo-wrapper'>
            <img src={logo} alt='Logo' />
          </div>

          <h2 className='form-name'>Login</h2>

          <Controller
            control={control}
            name="username"
            rules={{ required: "Please enter your username" }}
            render={({ field }) =>
              <Form.Item
                label="Username:"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className={`${!errors.username ? 'ant-form-item-has-success' : 'ant-form-item-with-help ant-form-item-has-error'}`}
              >
                <Input
                  {...field}
                  placeholder="Input your username"
                />
                {errors.username &&
                  <div class="ant-form-item-explain ant-form-item-explain-connected form-error">
                    <div role="alert" class="ant-form-item-explain-error">{errors.username.message}</div>
                  </div>
                }
              </Form.Item>
            }
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Please enter your password" }}
            render={({ field }) =>
              <Form.Item
                label="Password:"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className={`${!errors.password ? 'ant-form-item-has-success' : 'ant-form-item-with-help ant-form-item-has-error'}`}
              >
                <Input
                  {...field}
                  placeholder="Input your password"
                />
                {errors.password
                  &&
                  <div class="ant-form-item-explain ant-form-item-explain-connected form-error">
                    <div role="alert" class="ant-form-item-explain-error">{errors.password.message}</div>
                  </div>
                }
              </Form.Item>
            }
          />

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='form-btn-wrapper'>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </form>
      </Row>
    </div>
  );
};
