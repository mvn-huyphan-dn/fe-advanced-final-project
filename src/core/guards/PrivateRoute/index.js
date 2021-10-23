import { Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks';

import { useEffect } from 'react';
import { fakeAuth } from '../../services';

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: location };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser && !auth.user) {
      const foundUser = JSON.parse(loggedInUser)
      auth.setUser(foundUser.username)
      fakeAuth.isAuthenticated = true;
      history.replace(from)
    }
    //eslint-disable-next-line
  }, [])

  return (
    <Route
      {...rest}
      render={({ location }) =>
      auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
