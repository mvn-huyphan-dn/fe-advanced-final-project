import { Route, Switch } from 'react-router';
import './App.css';
import { Login } from './pages/Auth';
import PrivateRoute from './core/guards/PrivateRoute'
import Pages from './pages';
import { useEffect } from "react";
import { defaultEmployeeList } from './core/constants';

function App() {

  useEffect(() => {
    let employeeData = localStorage.getItem('employee');
    if (!employeeData) localStorage.setItem('employee', JSON.stringify(defaultEmployeeList))
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute>
          <Pages />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
