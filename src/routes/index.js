import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../container/App';
import LoginPage from '../components/LoginComponent/LoginPage';
import HomePage from '../components/Home/HomePage';
import PrivateRoute from './privateRoute';

function isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
  
    return false;
  }
  
  function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
      replace({
        pathname: '/login'
      });
    }
  }

export default (
  <Route path='/' component={App}>
    <IndexRoute component={LoginPage} />
    <Route path='login' component={LoginPage} />
    <PrivateRoute  path='display' component={HomePage} onEnter={requireAuth}  />
  </Route>
);