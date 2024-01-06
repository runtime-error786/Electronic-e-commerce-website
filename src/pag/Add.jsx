import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { openModal } from "./Navbar";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDispatch } from "react-redux";
// Inside your component...
import { Se } from "../Action";

const showToast = (message) => {
  if (message !== null && message !== undefined && message !== "") {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4500,
      zIndex: 9999, // Set a higher zIndex
    });
  }
};


function Add()
{
    let [pname, setpname] = useState("");
    let [price, setprice] = useState();
    let [desc, setdesc] = useState("");
    let [quant,setqu]=useState();
    let [im,setim] = useState(null);
    let [registrationStatus, setRegistrationStatus] = useState("");
    const fileInputRef = useRef(null);
    let [category, setCategory] = useState(""); // Added state for category
    const dispatch = useDispatch();
    dispatch(Se("n"));
    useEffect(() => {
      showToast(registrationStatus);
  
      // Reset registrationStatus after showing the toast
      setRegistrationStatus("");
    }, [registrationStatus]);
  

    const handleImageUpload = (e) => {
      const imageFile = e.target.files[0];
    
      if (imageFile) {
        // Use FileReader to read the contents of the selected file
       setim(imageFile);
      }
      
    };

    let signsend = async () => {
        try {
          // Check if any of the required fields is empty
         
          // Create FormData object and append form data
          let formData = new FormData();
          formData.append('pname', pname);
          formData.append('desc', desc);
          formData.append('quant', quant);
          formData.append('img', im);
          formData.append('price', price);
          formData.append('category', category); // Added category to form data
          // Make the API call
          let response = await axios.post("http://localhost:2001/add", formData);
         
          // Reset form fields on successful submission
          setpname("");
          setdesc("");
          setqu('');
          setim(null); // Reset image to null
          setprice('');
          setCategory(''); // Reset category to empty
          // Handle the response from the API
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          if (response.status === 200) {
            // Successful submission
            setRegistrationStatus("Product added successfully");
          } else if (response.status === 201) {
            // Product with the same name already exists
            setRegistrationStatus("Product with the same name already exists");
          }else if (response.status === 202) {
            // Product with the same name already exists
            setRegistrationStatus("please all fields");
          } else if (response.status === 203) {
            // Product with the same name already exists
            setRegistrationStatus("Quantity must be positive");
          } else if (response.status === 204) {
            // Product with the same name already exists
            setRegistrationStatus("Price must be positive");
          }  else {
            // Submission failed
            setRegistrationStatus("Something went wrong");
          }
        } catch (error) {
          console.error('Error:', error);
        
          // Handle errors from the API call
          
            setRegistrationStatus("something went wrong");
          
        }
      };
      
    
    
    return(
        <>
        
       <form id="f13">
       <div className="s3">
      <div   className="d13">
        <input
          type="text"
          id="fn"
          name="fn"
          value={pname}
          onChange={(e) => setpname(e.target.value)}
          placeholder="Enter product name"
          className="mb-2 ms-5 mt-5 d3"
          required
        />
      </div>

      <div  className="d13">
      <input
  id="ln"
  name="ln"
  value={desc}
  onChange={(e) => setdesc(e.target.value)}
  placeholder="Enter detailed explanation..."
  className="mb-2 ms-5 d3"
  rows="5" // You can adjust the number of rows to control the initial size of the text box
  required
></input>

      </div>
      <div className="d13">
            <select
              className="mb-2 ms-5 d3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="headphones">Headphones</option>
              <option value="other">Other</option>
            </select>
          </div>
      <div   className="d13">
        <input
          type="Number"
          id="fn"
          name="fn"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          placeholder="Enter product name"
          className="mb-2 ms-5 d3"
          required
        />
      </div>
      <div  className="d13">
        <input
          type="number"
          id="e"
          name="email"
          value={quant}
          onChange={(e) => setqu(e.target.value)}
          placeholder="Enter quanttity"
          className="mb-2 ms-5 d3"
          required
        />
      </div>
      <div className="d13">
      <input
  type="file"
  id="profilePic"
  name="profilePic"
  accept="image/*"
  style={{ borderRadius: "7px", width: "30%", height: "40px" }}
  className="mb-2 ms-5 d3"
  onChange={(e) => handleImageUpload(e)}
  ref={fileInputRef} 
/>
</div>
</div>

  <button id="h13" type="button" className="btn btn-secondary"  onClick={()=>{
         signsend();
  }}>
      Submit
    </button>
    
    </form>
    <div id="i13">
    <img
      id="i143"
      src="https://cdn.pixabay.com/photo/2017/07/15/19/42/train-track-2507499_1280.jpg"
      alt="icon"
      
    />
  </div>
     <ToastContainer />


        </>
    );
}

export {Add};
