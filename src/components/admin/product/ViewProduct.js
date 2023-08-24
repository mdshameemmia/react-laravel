import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .get(`/api/view-products`)
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const deleteProduct = (e,id)=>{
    e.preventDefault();
    let TR =  e.target.closest('tr');
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          axios.get(`/api/delete-product/${id}`).then(res=>{
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
        <h2>
          Product List
          <Link to="/admin/add-product" className="btn btn-primary  float-end">
            <FaPlus fontSize="0.8rem" style={{ paddingBottom: "0.1rem" }} />
            Add Product{" "}
          </Link>
        </h2>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead className="thead">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Status</td>
              <td>Slug</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.status}</td>
                  <td>{product.slug}</td>
                  <td>
                    <button className="btn btn-primary mx-2 btn-sm text-white text-center btn-pills">
                      <Link
                        to={`/admin/edit-product/${product.id}`}
                        className="text-white text-decoration-none text-center"
                      >
                        <FaEdit />
                      </Link>
                    </button>
                 
                    <button
                      className="btn btn-danger btn-sm text-white"
                      onClick={(e) => deleteProduct(e, product.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
