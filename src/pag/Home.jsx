import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProducts,fetchProducts1, Role, Ca } from '../Action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { total, current,Search,NullSearch } from '../Action';
import { prod } from '@tensorflow/tfjs';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Se } from '../Action';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer);
  let Search1 = useSelector((state) => state.NameSI);
  let Total = useSelector((state) => state.Total);
  let Current = useSelector((state) => state.Current);
  let [d, setd] = useState('');
  let type = useParams();
  let [registrationStatus, setRegistrationStatus] = useState("");
  const rol = useSelector((state) => state.Rolee);
  dispatch(Se("y"));
  dispatch(Ca());
  
  useEffect(() => {
    


    if (registrationStatus) {
      const timeoutId = setTimeout(() => {
        setRegistrationStatus("");
      }, 500);

      // Cleanup the timeout when the component unmounts or when the confirmation message changes
      return () => clearTimeout(timeoutId);
    }
  }, [registrationStatus]);
  
  useEffect(()=>{
    dispatch(NullSearch("hello"));
    dispatch(current(0));
  },[type]);

  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(NullSearch("hello"));
    dispatch(current(0));
    dispatch(fetchProducts1(Search1,Current,type));
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(fetchProducts1(Search1,Current,type));
  }, [products]);

  const handleDelete = (productId) => {
    // Dispatch the action to delete the product
    dispatch(deleteProducts(productId));
  };

  const Calling = (newPage) => {
    if (newPage > Current) {
        dispatch(current(Current+1));
    } else if (newPage < Current) {
        dispatch(current(Current-1));
    }

    // Update the current page in the state
  };

  const handleAddToCart = async (productName, price) => {
    try {
      // Make an API request to add the item to the cart
      let response = await axios.post('http://localhost:2001/addcart', {
        pname: productName,
        price: price,
        qty: 1,
      }, {
        withCredentials: true,
      });
      dispatch(Ca());
      // Log success or handle the response as needed
      if (response.status === 200) {
        setRegistrationStatus(prev=>"Items added in cart");
        // Handle other status codes if needed
      }
      else if (response.status === 201) {
        setRegistrationStatus(prev=>"already in cart");
        // Handle other status codes if needed
      }
      else if (response.status === 202) {
        setRegistrationStatus(prev=>"Sign in again");
        // Handle other status codes if needed
      }
      else{
        setRegistrationStatus("");
      }
    } catch (error) {
      // Handle errors and show an appropriate error message
      setRegistrationStatus("Internal Server Error");
    }
  };
  
  
  return (
    <>
    <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://wallpapers.com/images/featured/laptop-murjp1nk4lp1idlt.jpg" id='k121'  class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://downloadhdwallpapers.in/wp-content/uploads/2017/11/Mac-Glowing-Laptop-Nice-View.jpg" id='k121'  class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://wallpaperaccess.com/full/4446103.jpg" id='k121' class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div className='lk09'>
  <h1 style={{fontWeight:"bold"}}>Our Products</h1>
</div>


<div className='d-flex flex-wrap justify-content-around' >
{products && products.length > 0 ? (
          products.map((product) => (
           <div key={product.pname} class="card" style={{ width: "20rem", marginTop: "30px", backgroundColor: "#2d3436", color: "white" }}>
  <img src={`http://localhost:2001${product.img}`} style={{ height: "200px" }} class="card-img-top" alt="..." />
  <div class="card-body d-flex flex-column align-items-center justify-content-center">
    <h5 class="card-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px" }}>Name: {product.pname}</h5>
    <p class="card-text">Price: {product.price}$</p>
    {rol=="Customer" && (
      <>
      {product.quant > 0 ? (
            <button className="btn btn-primary" onClick={() => { handleAddToCart(product.pname, product.price); }}>Add To Cart</button>
          ) : (
            <p className="text-danger">Out of Stock</p>
          )}
      </>
    )}
    
  </div>
</div>


          ))
        ) : (
          <section class="page_4041">
            <div class="container">
              <div class="row">
                <div class="col-sm-12 ">
                  <div class="col-sm-10 col-sm-offset-1  text-center">
                    <div class="four_zero_four_bg1">
                      <h1 class="text-center ">No Data Found</h1>
                    </div>
  
                    <div class="contant_box_4041">
                      <h3 class="h2">Look like you're lost</h3>
  
                      <p>the items you are looking not available!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        </div>
        
        <ResponsivePagination current={Current} total={Total} onPageChange={Calling} />
        {registrationStatus && (
        <div style={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: 'green', color: 'white', padding: 16, borderRadius: 8 }}>
          {registrationStatus}
        </div>
      )}
    </>

  );
  }
export { Home };
