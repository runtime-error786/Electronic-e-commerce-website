import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProducts } from '../Action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { total, current, Search, NullSearch } from '../Action';
import axios from 'axios'; // Import axios for making HTTP requests
import { Se } from '../Action';
const Pop = ({ closePopup, selectedProduct, current, sear }) => {
  const [quantity, setQuantity] = useState(selectedProduct ? selectedProduct.quant : '');
  const [price, setPrice] = useState(selectedProduct ? selectedProduct.price : '');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {
    // Validate input values
    if (parseInt(quantity) <= 0 || parseInt(price) <= 0) {
      setErrorMessage('Values must be positive');
      return;
    }

    try {
      // Make the API call to update the product
      await axios.put('http://localhost:2001/updateProduct', {
        pname: selectedProduct.pname,
        newPrice: parseInt(price),
        newQuantity: parseInt(quantity),
      });

      dispatch(fetchProducts(sear, current));
      closePopup();
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle the error, you can set an error message or take other actions
    }
  };

  return (
    <>
      <div className="popup" style={{overflow:"auto"}}>
        <div className="popup-content">
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <h2>Update Product</h2>
          <h5  style={{overflow:"auto"}}>Prod.Name: {selectedProduct.pname}</h5>
          <h5>Category: {selectedProduct.category}</h5>
          <label style={{color:"white",fontSize:"larger"}}>Quantity:</label>
          <input
            type="number"
            value={quantity}
            style={{borderRadius:"10px",width:"70px"}}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <br></br>
          <label style={{color:"white",fontSize:"larger"}}>Price:</label>
          <input
            type="number"
            value={price}
            style={{borderRadius:"10px",width:"70px"}}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <button style={{backgroundColor:"#2d3436",color:"white",borderRadius:"10px"}} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};


  const Update = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsReducer);
    let Search1 = useSelector((state) => state.NameSI);
    let Total = useSelector((state) => state.Total);
    let Current = useSelector((state) => state.Current);
    let [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    let [cr,setcr] = useState(null);
    let [sea,setsea]=useState(null);
    dispatch(Se("y"));
    useEffect(() => {
      // Dispatch the action to fetch products when the component mounts
      dispatch(NullSearch('hello'));
      dispatch(current(0));
      dispatch(fetchProducts(Search1, Current));
    }, [dispatch]);
  
    useEffect(() => {
      // Dispatch the action to fetch products when the component mounts
      dispatch(fetchProducts(Search1, Current));
    }, [products]);
  
    const handleDelete = (productId) => {
      // Dispatch the action to delete the product
      dispatch(deleteProducts(productId));
    };
  
    const Calling = (newPage) => {
      if (newPage > Current) {
        dispatch(current(Current + 1));
      } else if (newPage < Current) {
        dispatch(current(Current - 1));
      }
    };
  
    const handleUpdate = (product) => {
      // Set the selected product in the state
      setSelectedProduct(product);
      // For demonstration purposes, I'm just showing the popup
      setcr(Current);
      setsea(Search1);
      setShowPopup(true);
    };
  
    const closePopup = () => {
      // Clear the selected product when the popup is closed
      setSelectedProduct(null);
      setShowPopup(false);
    };
  
    return (
      <>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div id="po1" key={product._id}>
              <div className="pla1">
                <p className="klk1">Name: {product.pname}</p>
                <p className="klk2">Qty: {product.quant}</p>
                <p className="klk3">Price: {product.price}</p>
                <p className="klk4">Category: {product.category}</p>
              </div>
              <button className="mnm1" onClick={() => handleUpdate(product)}>
                Update
              </button>
              <hr></hr>
            </div>
          ))
        ) : (
          <section class="page_404">
            <div class="container">
              <div class="row">
                <div class="col-sm-12 ">
                  <div class="col-sm-10 col-sm-offset-1  text-center">
                    <div class="four_zero_four_bg">
                      <h1 class="text-center ">No Data Found</h1>
                    </div>
  
                    <div class="contant_box_404">
                      <h3 class="h2">Look like you're lost</h3>
  
                      <p>the items you are looking not available!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
  
        {/* Update Form Popup */}
        {showPopup && <Pop closePopup={closePopup} selectedProduct={selectedProduct} current = {setcr} sear={Search1}/>}
  
        <ResponsivePagination current={Current} total={Total} onPageChange={Calling} />
        <ToastContainer />
      </>
    );
  };
  

export { Update };
