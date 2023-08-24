import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";



const Category = () => {
    const history = useHistory();
    const [categoryInput, setCategory] = useState({
        slug: "",
        name: "",
        description: "",
        status: "",
        meta_title: "",
        meta_keyword: "",
        meta_description: "",
        error_list:[]
    });

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`/api/store-category`, data).then((res) => {
                if(res.data.status == 200){
                    swal('Success',res.data.message,'success');
                    document.getElementById('CATEGORY_FORM').reset();
                    history.push('/admin/view-category');
                }else if(res.data.status == 400){
                    console.log(res)
                  setCategory({...categoryInput,error_list:res.data.errors});
                }
             });
        });
    };

    const handleInput = (e) => {
        e.preventDefault();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    };
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add Category</h1>
            <form onSubmit={submitCategory} id="CATEGORY_FORM" >
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
                                value={categoryInput.slug}
                                onChange={handleInput}
                                type="text"
                                className="form-control"
                            />
                            <span className="text-danger">{categoryInput.error_list.slug}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                                name="name"
                                value={categoryInput.name}
                                onChange={handleInput}
                                type="text"
                                className="form-control"
                            />
                          <span className="text-danger">{categoryInput.error_list.name}</span>

                        </div>
                        <div className="form-group mb-3">
                            <label>Desciption</label>
                            <textarea
                                name="description"
                                value={categoryInput.description}
                                onChange={handleInput}
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
                                value={categoryInput.status}
                                onChange={handleInput}
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
                                value={categoryInput.meta_title}
                                onChange={handleInput}
                                type="text"
                                className="form-control"
                            />
                            <span className="text-danger">{categoryInput.error_list.meta_title}</span>

                        </div>
                        <div className="form-group mb-3">
                            <label>Meta Keyword</label>
                            <input
                                name="meta_keyword"
                                value={categoryInput.meta_keyword}
                                onChange={handleInput}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Meta Desciption</label>
                            <textarea
                                name="meta_description"
                                value={categoryInput.meta_description}
                                onChange={handleInput}
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
export default Category;
