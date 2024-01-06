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
import { Role } from "../Action";
import { Se } from "../Action";
// Inside your component...
import { useDispatch, useSelector } from 'react-redux';

const showToast = (message) => {
  if (message !== null && message !== undefined && message !== "") {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4500,
      zIndex: 9999, // Set a higher zIndex
    });
  }
};


function Signin()
{
   

    

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phone,setPhone]=useState();
    let [city,setcity]=useState("");
    let [country,setcountry]=useState("");
    let [pass,setpass] = useState("");
    let [cpass,setcpass] = useState("");
    let [im,setim] = useState(null);
    let [passwordError, setPasswordError] = useState("");
    let [uploadSuccess, setUploadSuccess] = useState(false);
    let [registrationStatus, setRegistrationStatus] = useState("");
    let [sel,setSel]=useState("in");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [email1, setEmail1] = useState("");
    const [pass1, setPass1] = useState("");
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [isSignIn1, setIsSignIn1] = useState(true);
    const dispatch = useDispatch();
    const rol = useSelector((state) => state.Rolee);
   
    const fileInputRef = useRef(null);
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
    
    
     const signsend1 = async () => {
  try {
    // Make a GET request
    let response = await axios.get(`http://localhost:2001/signin`, {
      params: { email1, pass1 },
      withCredentials: true
    });
    const response1 = await axios.get('http://localhost:2001/getRole', {
      withCredentials: true,
    });

    // Extract the role from the response
    const role = response1.data.role;
    setEmail1("");
    setPass1("");

    

    if (response.status === 200) {
      setRegistrationStatus(prev => "Sign in successful");

      dispatch(Role());
      if (role === 'Admin') {
        navigate('/update');
      } else if (role === 'Customer') {
        navigate('/cat/all');
      }
      
    
    } else {
      setRegistrationStatus(prev => "Invalid Credentials");
    }
  } catch (error) {
    console.error('Error:', error);
    setEmail1("");
    setPass1("");

    if (error.response && error.response.status === 400) {
      setRegistrationStatus(prev => "Invalid Credentials");
    } else {
      setRegistrationStatus(prev => "Something went wrong");
    }
  }
};

      let signsend = async () => {
        try {
          // Check if any of the required fields is empty
          
      
          // Check if passwords match
          if (pass !== cpass) {
            setRegistrationStatus("Password and Confirm Password do not match.");
            return;
          }
      
          // Clear any previous password error
          
      
          // Create FormData object and append form data
          let formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('city', city);
          formData.append('country', country);
          formData.append('password', pass);
          formData.append('confirmPassword', cpass);
          formData.append('profilePic', im);
      
          // Make the API call
          let response = await axios.post("http://localhost:2001/signup", formData);
      
          // Reset form fields on successful registration
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setcity("");
          setcountry("");
          setpass("");
          setcpass("");
          setim(null); // Reset image to null
          setUploadSuccess(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          // Handle the response from the API
          if (response.status === 200) {
            // Registration successful
            setRegistrationStatus("User registered successfully");
          } else {
            // Registration failed
            if (response.status === 400) {
              // User already found
              setRegistrationStatus("User already found");
            } else {
              // Other errors
              setRegistrationStatus("Something went wrong");
            }
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle errors from the API call
          setRegistrationStatus("Something went wrong");
        }
      };
      
      
    return(
        <>
        
       <form id="f22">
       <div className="s1">
      <div   className="d22">
                  <input
                    type="email"
                    className="mb-2 ms-5 d11"
                    id="email"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
      </div>

      <div  className="d22">
      <input
                    type="password"
                    className="mb-2 ms-5 d11"
                    id="pass"
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
      </div>

</div>

  <button id="h22" type="button" className="btn btn-secondary"  onClick={()=>{
    signsend1();
  }}>
      Submit
    </button>
    
    </form>
    
    <img
      id="i22"
      src="https://cdn-icons-png.flaticon.com/512/6671/6671894.png"
      alt="icon"
      
    />

     <ToastContainer />


        </>
    );
}

export {Signin};
