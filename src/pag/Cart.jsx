import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts2, fetchProducts3, deleteProducts, NullSearch, current, fetchProducts4,totalPrice } from '../Action';
import axios from 'axios';
import { Se } from '../Action';
import { Ca } from '../Action';
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartReducer);
  let Current = useSelector((state) => state.Current);
  const total = useSelector((state) => state.TotalCart);
  const rol = useSelector((state) => state.Rolee);
  dispatch(Se("n"));
  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(NullSearch("hello"));
    dispatch(current(0));
    dispatch(fetchProducts2());
    dispatch(totalPrice(products));
    dispatch(Ca());
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(fetchProducts2());
    dispatch(totalPrice(products));
  }, [products]);

  let handleDelete = (productName) => {
    // Dispatch the action to delete the product
    
    dispatch(fetchProducts4(productName));
    dispatch(totalPrice(products));
   
  };

  const changeQty = (e, productName) => {
    // Dispatch the action to update quantity
    
    dispatch(fetchProducts3(e, productName));
    dispatch(totalPrice(products));
  };

  let Jeck = async () => {
    try {
      const response = await axios.post('http://localhost:2001/checkout', {}, { withCredentials: true });
      dispatch(Ca());

      // If the checkout is successful, dispatch the action to fetch cart products
      if (response.status === 200) {
        dispatch(fetchProducts2());
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };
  
  return (
    <>
    <div className='o1'>
      {products.map((product) => (
        <div key={product.pname} id="z1">
          <div className='z2'>
            Name: {product.pname}
          </div>
          <div className='z3'>
            Price: {product.price}$
          </div>
          <div className='z4'>
            Qty: <input type='number' style={{borderRadius:"10px"}} value={product.quant} onChange={(e) => changeQty(e.target.value, product.pname)} />
          </div>
          <div className='z5'>
            Total: {product.total}$
          </div>
          <button className="z6" onClick={() => handleDelete(product.pname)}>Remove</button>
          <hr ></hr>
        </div>
      ))}
       <div className='z7'> Total bill : {total} $</div>
       <button className='z8' onClick={()=>{
        Jeck();
       }}>Checkout</button>
       </div>
    </>
  );
};

export { Cart };
