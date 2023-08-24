import React,{useState,useEffect} from 'react'
import { Link ,useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {FaEdit,FaTrash,FaPlus} from 'react-icons/fa';

const ViewCategory = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState();

    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`/api/view-category`).then((res) => {
                if(res.data.status == 200){
                    setCategoryList(res.data.categories);
                    setLoading(false);
                }
             });
        });
      
    }, [])

    if(loading){
        return <h2>Loading...</h2>
    }

    const deleteCategory=(e,id)=>{
       let TR =  e.target.closest('tr');
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.get(`/api/delete-category/${id}`).then(res=>{
                    if(res.data.status == 200){
                        swal('success',res.data.message,'success');
                        TR.remove();
                    }else if(res.data.status == 400){
                        swal('error',res.data.status,'error');
                    }
                })
            
            } else {
              swal("You have cancelled");
              

            }
          });
    }

  return (
    <div className="card">
        <div className="card-header">
            <h2 >Category List
            <Link  to="/admin/add-category" className="btn btn-primary  float-end"><FaPlus fontSize="0.8rem" style={{"paddingBottom":"0.1rem"}} />Add Category</Link>
            </h2>
        </div>
        <div className="card-body">
                <table className="table table-hover table-striped">
                    <thead  className="thead">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Slug</td>
                        <td>Action </td>
                    </tr>
                    </thead>

                    <tbody>
                        {categoryList.map((category,index)=>{
                            return <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.status}</td>
                                <td>{category.slug}</td>
                                <td>
                                    <button className="btn btn-primary mx-2 btn-sm text-white text-center btn-pills">
                                        <Link to={`/admin/edit-category/${category.id}`} className="text-white text-decoration-none text-center"> <FaEdit /></Link>
                                    </button>
                              
                                    <button className="btn btn-danger btn-sm text-white" onClick={((e)=>deleteCategory(e,category.id))}> <FaTrash /></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
        </div>
    </div>
  )
}
export default ViewCategory