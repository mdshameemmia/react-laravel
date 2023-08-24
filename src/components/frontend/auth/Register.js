import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../layouts/frontend/Navbar";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list:[]
  });

  const handleInput = (e) => {
    e.preventDefault();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    // store data 
    axios.get('/sanctum/csrf-cookie').then(response => {
  
      axios.post(`/api/register`,data).then(res=>{
        if(res.data.status == 200){
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_name',res.data.username);
          swal('success',res.data.message,'success');
          history.push('/');
          
        }else{
          setRegister({...registerInput,error_list:res.data.validator_errors})
        }
      })
    });


  };

  
  return (
    <div>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className=" col-md-6">
            <div className="card">
              <div className="card-header h2 text-dark font-weight-bold text-center">
                Register
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Full Name </label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={registerInput.name}
                      className="form-control"
                      name="name"
                    />
                    <span className="text-danger">{registerInput.error_list.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email ID </label>
                    <input
                      type="email"
                      onChange={handleInput}
                      value={registerInput.email}
                      className="form-control"
                      name="email"
                    />
                  <span className="text-danger">{registerInput.error_list.email}</span>

                  </div>
                  <div className="form-group mb-3">
                    <label>Password </label>
                    <input
                      type="password"
                      onChange={handleInput}
                      value={registerInput.password}
                      className="form-control"
                      name="password"
                    />
                <span className="text-danger">{registerInput.error_list.password}</span>

                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Register
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

export default Register;
