import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import swal from 'sweetalert'

const AddProduct = () => {
    const history = useHistory();
    const [categoryList, setCategory] = useState([])
    const [productInput, setProduct] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',
        meta_title:'',
        meta_description:'',
        meta_keyword:'',
        selling_price:'',
        original_price:'',
        qty:'',
        brand:'',
        feature:'',
        popular:'',
        status:'',
    })
    const [picture, setPicture] = useState([]);
    useEffect(() => {
      axios.get(`/api/all-category`).then(res=>{
        if(res.data.status == 200){
            setCategory(res.data.categories);
        }
      })
    }, [])
    const handleInput = (e)=>{
        e.preventDefault();
        setProduct({...productInput,[e.target.name]:e.target.value});
    }
  
    const handleImage = (e)=>{
        e.persist();
        setPicture({image:e.target.files[0]});
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('category_id',productInput.category_id);
        formData.append('slug',productInput.slug);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);
        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_description',productInput.meta_description);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('qty',productInput.qty);
        formData.append('brand',productInput.brand);
        formData.append('feature',productInput.feature);
        formData.append('popular',productInput.popular);
        formData.append('status',productInput.status);

        axios.post(`api/store-product`,formData).then(res=>{
                if(res.data.status == 200){
                    swal('success',res.data.message,'success');
                    history.push('/admin/view-product');
                }else if(res.data.status ==400){
                    console.log(res)
                }
        })
    }
    return (
        <div>
            <div className="container-fluid px-4">,
                <div className="card mt-4">
                    <div className="card-header ">
                        <h1 className="mt-4">Add Product
                            <Link to="/admin/view-product" className="btn btn-sm float-end btn-primary">Show Products</Link>
                        </h1>
                    </div>
                    <form encType="multipart/form-data" onSubmit={handleSubmit} >
                    <div className="card-body">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active my-3" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label> Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option value="">Select Category</option>
                                        {categoryList.map(category=>{
                                            return  <option key={category.id} value={category.id}>{category.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label> Description </label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control" cols="3" rows="4"></textarea>
                                </div>

                            </div>
                            <div className="tab-pane fade my-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title </label>
                                    <input name="meta_title" type="text" onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keyword</label>
                                    <input name="meta_keyword" type="text" onChange={handleInput} value={productInput.meta_keyword} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Desciption</label>
                                    <textarea name="meta_description" type="text" onChange={handleInput} value={productInput.meta_description} col="6" rows="8" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="tab-pane fade my-3" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="row">
                            <div className="form-group col-md-4 mb-3">
                                    <label>Selling Price </label>
                                    <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                </div>
                                <div className="form-group col-md-4 mb-3">
                                    <label>Original Brand</label>
                                    <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                </div>
                                <div className="form-group col-md-4 mb-3">
                                    <label>Qty</label>
                                    <input type="text" name="qty" onChange={handleInput} value={productInput.qty}  className="form-control" />
                                </div>
                                <div className="form-group col-md-4 mb-3">
                                    <label>Brand</label>
                                    <input type="text" name="brand" onChange={handleInput} value={productInput.brand}  className="form-control" />
                                </div>
                                <div className="form-group col-md-4 mb-3">
                                    <label>Image</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control" />
                                </div>
                                <div className="form-group col-md-4 mb-3 col-md-4">
                                    <label>Features (Check=shown)</label>
                                    <input type="checkbox" name="feature" onChange={handleInput} value={productInput.feature}  />
                                </div>
                                <div className="form-group col-md-4 mb-3 col-md-4">
                                    <label>Popular (Check=shown)</label>
                                    <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular}  />
                                </div>
                                <div className="form-group col-md-4 mb-3 col-md-4">
                                    <label>Status (Check=hidden)</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={productInput.status}  />
                                </div>
                            </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary ">Submit</button>
                    </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddProduct