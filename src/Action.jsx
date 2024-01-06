import axios from 'axios';
let Search = (n)=>{
    return{
        type:"Search",
        payload:n
    }
}

let Se = (n)=>{
  return{
      type:"Show",
      payload:n
  }
}


const Ca = () => {
  return async (dispatch) => {
    try {
      // Make a request to the backend API to get the cart count
      const response = await axios.post('http://localhost:2001/cartcount', {}, { withCredentials: true });

      // Extract the cart count from the response
      const cartCount = response.data.cartCount;

      // Dispatch the action with the received cart count
      dispatch({
        type: 'coca',
        payload: cartCount,
      });
    } catch (error) {
      console.error('Error fetching cart count:', error);
      // Handle errors appropriately, such as dispatching an error action
    }
  };
};

const Role =() => {
  return async (dispatch) => {
    try {
      // Make a request to the backend API to get the user's role
      const response = await axios.get('http://localhost:2001/getRole', {
        withCredentials: true,
      });

      // Extract the role from the response
      const role = response.data.role;

      // Dispatch the Role action with the received role
      dispatch({
        type: 'role',
        payload: role,
      });
    } catch (error) {
      console.error('Error fetching role:', error);
      // Handle errors appropriately, such as dispatching an error action
    }
  };
};

let NullSearch = (n)=>{
    return {
        type:"Search",
        payload:""
    }
}

let total = (n)=>{
    return{
        type:"total",
        payload:n
    }
}



const totalPrice = (cart) => {
  const total = cart.reduce((acc, product) => acc + product.total, 0);
  return {
    type: 'totalp',
    payload: total,
  };
};


let current = (n)=>{
    return{
        type:"current",
        payload:n
    }
}
const fetchProducts = (search,cr) => {
    return async (dispatch) => {
      try {
        // Make the API request to get product data
        const response = await axios.get('http://localhost:2001/products', {
          params: {
            search: search,
            cr:cr
          },
        });
        
        // Dispatch the action with the fetched data
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: response.data.products,
        });

        dispatch({
            type: 'total',
            payload: response.data.totalPages
          });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  };
  
  const fetchProducts1 = (search,cr,pr) => {
    return async (dispatch) => {
      try {
        // Make the API request to get product data
        const response = await axios.get('http://localhost:2001/products12', {
          params: {
            search: search,
            cr:cr,
            pr:pr,
          },
        });
        
        // Dispatch the action with the fetched data
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: response.data.products,
        });

        dispatch({
            type: 'total',
            payload: response.data.totalPages
          });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  };

  const fetchProducts2 = () => {
    return async (dispatch) => {
      try {
        // Make the API request to get cart data with credentials
        const response = await axios.get('http://localhost:2001/getcart', {
          withCredentials: true,
        });
  
        // Dispatch the action with the fetched data
        dispatch({
          type: 'FETCH_CPRODUCTS',
          payload: response.data.products,
        });
  
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };
  };
  

  const fetchProducts3 = (e,pname) => {
    return async (dispatch) => {
      try {
        // Make the API request to get cart data with credentials and send 'e' as a parameter
        const response = await axios.get('http://localhost:2001/upqty', {
          params: { pname,e }, // Include 'e' as a parameter
          withCredentials: true,
        });
  
        // Dispatch the action with the fetched data
        dispatch({
          type: 'FETCH_CPRODUCTS',
          payload: response.data.products,
        });
  
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };
  };
  
  const fetchProducts4 = (pname) => {
    return async (dispatch) => {
      try {
        // Make the API request to get cart data with credentials and send 'e' as a parameter
        const response = await axios.get('http://localhost:2001/rem', {
          params: { pname }, // Include 'e' as a parameter
          withCredentials: true,
        });
        const response1 = await axios.post('http://localhost:2001/cartcount', {}, { withCredentials: true });

        // Extract the cart count from the response
        const cartCount = response1.data.cartCount;
  
        // Dispatch the action with the received cart count
        dispatch({
          type: 'coca',
          payload: cartCount,
        });
        // Dispatch the action with the fetched data
        dispatch({
          type: 'FETCH_CPRODUCTS',
          payload: response.data.cart,
        });
  
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };
  };
  
const deleteProducts = (pid) => {
    return async (dispatch) => {
      try {
        // Make the API request to get product data
        const response = axios.delete(`http://localhost:2001/products/${pid}`);
        
        // Dispatch the action with the fetched data
        if (response.status === 200) {
            // If the deletion is successful, dispatch the DELETE_PRODUCT action
            dispatch({
              type: 'FETCH_PRODUCTS',
              payload: response.data.products,
            });
          } else {
            // If there is an error, handle it accordingly
            console.error('Failed to delete product:', response.statusText);
          }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  };
  
  
export { fetchProducts,deleteProducts,Search,total,current,NullSearch,fetchProducts1,fetchProducts2,fetchProducts3,fetchProducts4,totalPrice,Role,Se,Ca};

