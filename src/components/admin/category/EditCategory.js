import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory ,Link} from "react-router-dom";

const EditCategory = (props) => {
  const history = useHistory();
  const [categoryInput, setCategory] = useState();
  const [loading,setLoading] =  useState(true);
  const [error, setError] = useState([]);

  const category_id = props.match.params.id;
  useEffect(() => {
    axios.get(`/api/edit-category/${category_id}`).then((res) => {
      if(res.data.status=='200'){
        setCategory(res.data.category);
        setError([]);
        setLoading(false);
      }else if(res.data.status == '404'){
        swal('error',res.data.message,'warning');
        history.push('/admin/view-category');
      
      }else if(res.data.status == '400'){
        setError(res.data.errors)
        swal('error',res.data.message,'warning');
      }
    });
  }, [props.match.params.id]);

  const handleInput = (e) => {
    e.preventDefault();
    setCategory({...categoryInput,[e.target.name]:e.target.value});
  };

  const updateCategory = (e) => {
    e.preventDefault();
    const data = categoryInput;
     axios.post(`/api/update-category/${category_id}`,data).then(res=>{
        if(res.data.status==200){
            swal('success',res.data.message,'success');
            history.push('/admin/view-category');
        }else if(res.data.status == 404){
            swal('error',res.data.message,'warning');
        }
     })
  };

  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Edit Category
            <Link  to="/admin/view-category" className="btn btn-primary  float-end">Back</Link>
      </h1>
      <form onSubmit={updateCategory} id="CATEGORY_FORM">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="seo-tags-tab"
              data-bs-toggle="tab"
              data-bs-target="#seo-tags"
              type="button"
              role="tab"
              aria-controls="seo-tags"
              aria-selected="false"
            >
              SEO Tags
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group mb-3">
              <label>Slug</label>
              <input
                name="slug"
                onChange={handleInput}
                type="text"
                value={categoryInput.slug}
                className="form-control"
              />
              <span>{error.slug}</span>
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                name="name"
                onChange={handleInput}
                type="text"
                value={categoryInput.name}
                className="form-control"
              />
               <span>{error.slug}</span>

            </div>
            <div className="form-group mb-3">
              <label>Desciption</label>
              <textarea
                name="description"
                onChange={handleInput}
                value={categoryInput.description}
                type="text"
                col="6"
                rows="8"
                className="form-control"
              ></textarea>

            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                name="status"
                onChange={handleInput}
                value={categoryInput.status}
                type="checkbox"
              />{" "}

              status=0 shown/1= hide
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="seo-tags"
            role="tabpanel"
            aria-labelledby="seo-tags-tab"
          >
            <div className="form-group mb-3">
              <label>Meta Title </label>
              <input
                name="meta_title"
                onChange={handleInput}
                value={categoryInput.meta_title}
                type="text"
                className="form-control"
              />
            <span>{error.slug}</span>
            </div>
            <div className="form-group mb-3">
              <label>Meta Keyword</label>
              <input
                name="meta_keyword"
                onChange={handleInput}
                value={categoryInput.meta_keyword}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meta Desciption</label>
              <textarea
                name="meta_description"
                onChange={handleInput}
                value={categoryInput.meta_description}
                type="text"
                col="6"
                rows="8"
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 float-start">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
