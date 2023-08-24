import React from 'react';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
import MasterLayout from './layouts/admin/MasterLayout';
import Login from './components/frontend/auth/Login';
import  'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from './components/frontend/Home';
import Register from './components/frontend/auth/Register';

import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token? `Bearer ${token}`:'';
  return config;
})
function App() {
  return (
    <div className="App">
       <Router>
          <Switch>
            <Route exact path="/Page403"><Page403/></Route>
            <Route exact path="/Page404"><Page404/></Route>
            <Route exact path="/" ><Home/></Route>
            <Route exact path="/login" >
            {localStorage.getItem('auth_name')?<Redirect to="/"/> : <Login />}
            </Route>
            <Route exact path="/register" >
            {localStorage.getItem('auth_name')?<Redirect to="/"/> : <Register />}
            </Route>
             {/* <MasterLayout/> */}
             <AdminPrivateRoute path="/admin" name="Admin"></AdminPrivateRoute>
          </Switch>
       </Router>
    </div>
  );
}

export default App;
