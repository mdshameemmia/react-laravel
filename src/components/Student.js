import React,{useState} from "react";
import Navbar from "./Navbar";
import swal from "sweetalert";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Student = () => {
  const history = useHistory();
  const [loginInput,setInput] = useState({
    name:'',
    roll:'',
    class:'',
    section:'',
    address:'',
    mobile:'',
    email:'',
    error_list:[],

  });

  const handleInput = (e)=>{
    e.preventDefault();
    setInput({...loginInput,[e.target.name]:e.target.value});
  }

  const handleSubmit =  (e)=>{
    e.preventDefault();
    const data = {
      email:loginInput.email,
      roll:loginInput.roll,
      name:loginInput.name,
      class:loginInput.class,
      section:loginInput.section,
      address:loginInput.address,
      mobile:loginInput.mobile
    };
  
    axios.post(`/api/saveStudent`,data).then(res=>{
      console.log(res,'=============')
      if(res.data.status == 201){
        swal('success',res.data.message,'Successfully stored');
        history.push('/students');
        
      }else if(res.data.status == 400){
        swal('warning',res.data.message,'warning');
      }else{
        setInput({...loginInput,error_list:res.data.validator_errors});
        swal('error',res.data.message,'error')
      }
    })
  
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className=" col-md-6">
            <div className="card">
              <div className="card-header h2 text-dark font-weight-bold text-center">
                Student
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group ">
                    <label>Name </label>
                    <input type="text" onChange={handleInput} value={loginInput.name} className="form-control" name="name" />
                    <span className="text-danger">{loginInput.error_list.name}</span>
                  </div>

                  <div className="form-group ">
                    <label>Roll </label>
                    <input type="text" onChange={handleInput} value={loginInput.roll} className="form-control" name="roll" />
                    <span className="text-danger">{loginInput.error_list.roll}</span>
                  </div>

                  <div className="form-group ">
                    <label>Class </label>
                    <input type="text" onChange={handleInput} value={loginInput.class} className="form-control" name="class" />
                    <span className="text-danger">{loginInput.error_list.class}</span>
                  </div>

                  <div className="form-group ">
                    <label>Section </label>
                    <input type="text" onChange={handleInput} value={loginInput.section} className="form-control" name="section" />
                    <span className="text-danger">{loginInput.error_list.section}</span>
                  </div>

                  <div className="form-group ">
                    <label>Address </label>
                    <input type="text" onChange={handleInput} value={loginInput.address} className="form-control" name="address" />
                    <span className="text-danger">{loginInput.error_list.address}</span>
                  </div>

                  <div className="form-group ">
                    <label>Mobile No </label>
                    <input type="number" onChange={handleInput} value={loginInput.mobile} className="form-control" name="mobile" />
                    <span className="text-danger">{loginInput.error_list.mobile}</span>
                  </div>

                  <div className="form-group mb-2">
                    <label>Email </label>
                    <input type="email" onChange={handleInput} value={loginInput.email} className="form-control" name="email" />
                    <span className="text-danger">{loginInput.error_list.email}</span>
                  </div>
                  
                  <button type="submit" className="btn btn-primary ">
                   Submit
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

export default Student;
