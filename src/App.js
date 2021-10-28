import { Route, Switch } from 'react-router';
import './App.css';
import { LoginPage } from './pages/Auth';
import PrivateRoute from './core/guards/PrivateRoute'
import Pages from './pages';

function App() {

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
