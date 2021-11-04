import { Route, Switch } from 'react-router';
import './App.css';
import { LoginPage } from './pages/Auth';
import PrivateRoute from './core/guards/PrivateRoute'
import Pages from './pages';
import { Provider } from 'react-redux';
import store from './redux/store'
function App() {

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
