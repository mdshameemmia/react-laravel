import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link }  from 'react-router-dom';
import Navbar from './Navbar';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`/api/getStudents`).then(res => {
            setStudents(res.data);
            setLoading(false);
        })
    },[])

 if(loading){
    return <h1 className='text-center'>Loading...</h1>
 }
  return (
    <div>
         <Navbar />
        <div className='container'>
        <div className='container my-3 d-flex justify-content-between'>
            <div></div>
            <h3>Student List</h3>
            <Link className="nav-link text-white active" aria-current="page" to="/create-student">
                <button className='btn btn-primary'>Add Student</button>
            </Link>
        </div>

        <table className='table table-bordered table-striped'>
            <thead>
                <tr key="">
                    <th>Name</th>
                    <th>Roll </th>
                    <th>Class </th>
                    <th>Section</th>
                    <th>Address </th>
                    <th>Mobile</th>
                    <th>Email</th>
                </tr>
            </thead>

            <tbody>
                {
                    students.map(student => {
                        return <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.roll}</td>
                            <td>{student.class}</td>
                            <td>{student.section}</td>
                            <td>{student.address}</td>
                            <td>{student.mobile}</td>
                            <td>{student.email}</td>
                        </tr>
                    })
                }
            </tbody>

        </table>
        </div>
    </div>
  )
}

export default StudentList