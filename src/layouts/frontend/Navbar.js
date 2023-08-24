import React from 'react'
import {Link,useHistory,useLocation} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
const Navbar = () => {
const history = useHistory();
const location = useLocation();
  // logout 
  const logoutSubmit = (e)=>{
    e.preventDefault();
     axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/logout`).then(res=>{
        if(res.data.status == 200){
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          swal('success',res.data.message,'success');
          history.push('/');
          // location.reload();
        }
      })
    });
  }

  let AuthButton = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButton = <>
     <li className="nav-item">
          <Link className="nav-link text-white active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/register">Register</Link>
        </li>
    </>;
  } else {
    AuthButton = <>
     <li className="nav-item">
          <button onClick={logoutSubmit} className="nav-link text-white btn btn-danger btn-sm text-white" >Logout</button>
        </li>
   </>;
  }


  return (
    <nav className="navbar  navbar-expand-lg bg-primary shadow sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link text-white active" aria-current="page" to="#">Collections</Link>
        </li>
       {AuthButton}
      </ul>

    </div>
  </div>
</nav>
  )
}

export default Navbar