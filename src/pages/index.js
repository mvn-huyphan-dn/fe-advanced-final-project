import { Switch, Route, Redirect } from "react-router";
// import { Link } from "react-router-dom";
// import { useAuth } from "../hooks";
// import { Button } from "antd";
// import { useHistory } from "react-router";
import {
  NotFound
} from './Features'


export default function Pages() {
  // let auth = useAuth()
  // let history = useHistory();
  // let logout = () => {
  //   auth.signout(() => {
  //     localStorage.removeItem('user')
  //     history.replace('/login')
  //   })
  // }

  return (
    <>
      <Switch>
        <Route path='/404' component={NotFound} />
        <Redirect from='/*' to='/404' />
      </Switch>
    </>
  )
}
