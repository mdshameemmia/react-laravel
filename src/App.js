import React from 'react';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
import  'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from './components/Home';


import axios from 'axios';
import Student from './components/Student';
import StudentList from './components/StudentList';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';




function App() {
  return (
    <div className="App">
       <Router>
          <Switch>
            <Route exact path="/" ><Home/></Route>
            <Route exact path="/create-student" >
               <Student />
            </Route>
            <Route exact path="/students" >
               <StudentList />
            </Route>
            
          </Switch>
       </Router>
    </div>
  );
}

export default App;
