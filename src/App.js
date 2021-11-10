import { Route, Switch } from 'react-router';
import './App.css';
import { LoginPage } from './pages/Auth';
import PrivateRoute from './core/guards/PrivateRoute'
import Pages from './pages';

<<<<<<< HEAD
function App() {
=======
import { useEffect } from "react";
import { defaultEmployeeList } from './core/constants';

function App() {
  
  useEffect(() => {
    let employeeData = localStorage.getItem('employee');
    if (!employeeData) localStorage.setItem('employee', JSON.stringify(defaultEmployeeList))
  }, [])
>>>>>>> db6a6c0 (CRUD: List, Add, Edit)

  return (
    <div className="App">
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <PrivateRoute>
          <Pages />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
