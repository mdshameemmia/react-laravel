import React,{useState} from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import swal from "sweetalert";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [loginInput,setInput] = useState({
    email:'',
    password:'',
    error_list:[]
  });

  const handleInput = (e)=>{
    e.preventDefault();
    setInput({...loginInput,[e.target.name]:e.target.value});

  }

  const loginSubmit =(e)=>{
    e.preventDefault();
    const data = {
      email:loginInput.email,
      password:loginInput.password
    };

    // login 
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/login`,data).then(res=>{
        if(res.data.status == 200){
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_name',res.data.username);
          swal('success',res.data.message,'success');
          if(res.data.role =='admin'){
            history.push('/admin/dashboard');
          }else{

            history.push('/');
          }
        }else if(res.data.status == 401){
          swal('warning',res.data.message,'warning');
        }else{
          setInput({...loginInput,error_list:res.data.validator_errors});
          swal('error',res.data.message,'error')
        }
      })
    });
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className=" col-md-6">
            <div className="card">
              <div className="card-header h2 text-dark font-weight-bold text-center">
                Login{" "}
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email ID </label>
                    <input type="email" onChange={handleInput} value={loginInput.email} className="form-control" name="email" />
                    <span className="text-danger">{loginInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password </label>
                    <input
                      type="password"
                      onChange={handleInput} value={loginInput.password} className="form-control"
                      name="password"
                    />
                    <span className="text-danger">{loginInput.error_list.password}</span>

                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
