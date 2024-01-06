import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProducts } from '../Action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { total, current,Search,NullSearch } from '../Action';
import { Se } from '../Action';
const Delete = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer);
  let Search1 = useSelector((state) => state.NameSI);
  let Total = useSelector((state) => state.Total);
  let Current = useSelector((state) => state.Current);
  let [d, setd] = useState('');
  dispatch(Se("y"));
  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(NullSearch("hello"));
    dispatch(current(0));
    dispatch(fetchProducts(Search1,Current));
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(fetchProducts(Search1,Current));
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
  return (
    <>
      {products && products.length > 0 ? (
  products.map((product) => (
    <div id="po">
    <div className='pla'>
      <p className='klk'>Name: {product.pname}</p>
    </div>

      <img
      className='jkj1'
        src={`http://localhost:2001${product.img}`}
        alt={product.pname}
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
      <button className="mnm" onClick={() => handleDelete(product.pname)}>Delete</button>
      <hr className='vv1'></hr>
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
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the items you are looking  not avaible!</p>
		
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
)}

      <ResponsivePagination current={Current} total={Total} onPageChange={Calling}/>
      <ToastContainer />
    </>
  );
};

export { Delete };
