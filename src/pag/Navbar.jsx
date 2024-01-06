import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Search} from "../Action";
import { current,Role } from "../Action";

let Signout = async (d,n) => {
  try {
    const response = await axios.post('http://localhost:2001/signout', {}, { withCredentials: true });
    d(Role());
    n("cat/all");
  } catch (e) {

  }
}

function Nav() {
  let Search1 = useSelector((state)=>state.NameSI);
  const role = useSelector((state) => state.Rolee);
  let Se = useSelector((state)=>state.Show);
  let coca = useSelector((state)=>state.coca);
  let di = useDispatch();
  let n = useNavigate();
  return (
    <>
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body" data-bs-theme="dark">
  <div className="container-fluid">
    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "60px" }}>
      <form className="d-flex" role="search" style={{color:"white"}}>
      {Se==="y" && (
      <>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "300px" }}
          value={Search1}
          onChange={(e)=>{
            di(Search(e.target.value));
            di(current(0));
          }}
        />
         </>
        )}
      </form>
    </div>
  </div>
</nav>
     
     

      <nav className="navbar navbar-expand-lg navbar-dark bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" style={{ fontSize: "30px", fontStyle: "italic" }}>
            SHOPi
          </NavLink>
          {role==="Customer" && (
            <>
            
            <NavLink to="/cart" className="nav-link order-lg-2">
  <button type="button" className="btn btn-outline-secondary me-2" style={{ fontSize: "18px" }}>
    <div className="bn" style={{ color: "white" }}>
      {coca > 99 ? '99+' : coca}
    </div>
    <i className="fa-solid fa-cart-shopping fa-bounce fa-2xl"></i>
  </button>
</NavLink>
            </>
          )}
          

          <button
   class="navbar-toggler"
   type="button"
   data-bs-toggle="collapse"
   data-bs-target="#navbarSupportedContent"
   aria-controls="navbarSupportedContent"
   aria-expanded="false"
   aria-label="Toggle navigation"
>
   <span class="navbar-toggler-icon"></span>
</button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: "20px" }}>
            {role==="Admin" &&(
              <>
              <li className="nav-item">
                <NavLink to="/add" className="nav-link">
                  Add
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/update" className="nav-link">
                  Update
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/delete" className="nav-link">
                  Delete
                </NavLink>
              </li>
              </>
            )}
            {role==="Customer" && (
              <>
              <li className="nav-item">
                <NavLink to="/cat/all" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cat/mobile" className="nav-link">
                  Mobile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cat/laptop" className="nav-link">
                  Laptop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cat/headphones" className="nav-link">
                  Headphones
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cat/other" className="nav-link">
                  Other
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/help" className="nav-link">
                  Help
                </NavLink>
              </li>
              </>
            )}
             
             {role==="guest" &&(
              <>
              <li className="nav-item">
                <NavLink to="/cat/all" className="nav-link">
                  Home
                </NavLink>
              </li>
              </>
             )}
            </ul>

            <div className="d-flex">
              {role==="guest" && (
                <>
                <NavLink to="/signin" className="nav-link">
              <button
        type="button"
        className="btn btn-outline-secondary me-2"
        style={{ fontSize: "18px" }}
       
      >
               Sign in
               </button> 
              </NavLink>
              <NavLink to="/signup" className="nav-link">
              <button
        type="button"
        className="btn btn-outline-secondary me-2"
        style={{ fontSize: "18px" }}
       
      >
               Sign up
               </button> 
              </NavLink>
              
                </>
              )}
              {role==="Customer" && (
                <>
                <NavLink className="nav-link">
                <button type="button" className="btn btn-outline-secondary me-2" style={{ fontSize: "18px" }} onClick={()=>{
                 Signout(di,n);
                }}>
                  Sign Out
                </button>
              </NavLink>
              <NavLink to="/Cprofile" className="nav-link order-lg-1">
                <button type="button" className="btn btn-outline-secondary me-2" style={{ fontSize: "18px" }}>
                  Profile
                </button>
              </NavLink>
                </>
              )}
              {role==="Admin" && (
                <>
                <NavLink className="nav-link">
                <button type="button" className="btn btn-outline-secondary me-2" style={{ fontSize: "18px" }} onClick={()=>{
                 Signout(di,n);
                }}>
                  Sign Out
                </button>
              </NavLink>
              <NavLink to="/profile" className="nav-link order-lg-1">
                <button type="button" className="btn btn-outline-secondary me-2" style={{ fontSize: "18px" }}>
                  Profile
                </button>
              </NavLink>
                </>
              )}
              
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export { Nav };
