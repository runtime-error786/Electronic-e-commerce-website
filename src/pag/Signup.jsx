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
import { Se } from "../Action";
// Inside your component...
import { useDispatch } from "react-redux";
const showToast = (message) => {
  if (message !== null && message !== undefined && message !== "") {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4500,
      zIndex: 9999, // Set a higher zIndex
    });
  }
};


function Signup()
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

    const [email1, setEmail1] = useState("");
    const [pass1, setPass1] = useState("");
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [isSignIn1, setIsSignIn1] = useState(true);

    const fileInputRef = useRef(null);
    let di = useDispatch();
    di(Se("n"));
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
          let response = await axios.get(`http://localhost:2001/signin`,{
            params:{email1,pass1},
            withCredentials: true
          });
      
          setEmail1("");
          setPass1("");
      
          if (response.status === 200) {
            setRegistrationStatus(prev=>"Sign in successful");
            // Handle successful sign-in, e.g., redirect or update UI
          } else {
            setRegistrationStatus(prev=>"Invalid Credentials");
          }
        } catch (error) {
          console.error('Error:', error);
          setEmail1("");
          setPass1("");
      
          if (error.response && error.response.status === 400) {
            setRegistrationStatus(prev=>"Invalid Credentials");
          } else {
            setRegistrationStatus(prev=>"Something went wrong");
          }
        }
      };
      
      let signsend = async () => {
        try {
          // Check if any of the required fields is empty
          
          if (!firstName || !lastName || !phone || !email || !city || !country || !pass || !cpass) {
            setRegistrationStatus("All fields are required");
            return;
        }
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
          } else  if (response.status === 201) {
            // Registration successful
            setRegistrationStatus("All fields are required");
          }  else {
            // Registration failed
            if (response.status === 203) {
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
        
       <form id="f1">
       <div className="s">
      <div   className="d1">
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          
          className="mb-2 ms-5 mt-5 d"
          required
        />
      </div>

      <div  className="d1">
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          
          className="mb-2 ms-5 d"
          required
        />
      </div>

      <div  className="d1">
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          
          className="mb-2 ms-5 d"
          required
        />
      </div>

      <div  className="d1">
   
  <input
    type="text"
    id="phone"
    name="phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Enter phone number"
    
    className="mb-2 ms-5 d"
    required
  />
</div>


      <div  className="d1">
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          placeholder="Enter city"
         
          className="mb-2 ms-5 d"
          required
        />
      </div>
      <div  className="d1">
        <input
          type="country"
          id="country"
          name="country"
          value={country}
          onChange={(e) => setcountry(e.target.value)}
          placeholder="Enter country"
          
          className="mb-2 ms-5 d"
          required
        />
      </div>
      <div  className="d1">
        <input
          type="pass"
          id="pass"
          name="pass"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
          placeholder="Enter password"
          
          className="mb-2 ms-5 d"
          required
        />
      </div>
      <div  className="d1">
        <input
          type="cpass"
          id="cpass"
          name="cpass"
          value={cpass}
          onChange={(e) => setcpass(e.target.value)}
          placeholder="Enter confirm password"
          
          className="mb-2 ms-5 d"
          required
        />
      </div>

      <div className="d1">
      <input
  type="file"
  id="profilePic"
  name="profilePic"
  accept="image/*"
  style={{ borderRadius: "7px", width: "30%", height: "40px" }}
  className="mb-2 ms-5 d"
  onChange={(e) => handleImageUpload(e)}
  ref={fileInputRef} 
/>

       

</div>
</div>

  <button id="h1" type="button" className="btn btn-secondary"  onClick={()=>{
    signsend();
  }}>
      Submit
    </button>
    
    </form>
    <div >
    <img
      id="i1"
      className="jkj"
      src="https://cdn-icons-png.flaticon.com/512/6159/6159448.png"
      alt="icon"
      
    />
  </div>
     <ToastContainer />


        </>
    );
}

export {Signup};
