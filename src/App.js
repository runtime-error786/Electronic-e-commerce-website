import React from 'react';
import { BrowserRouter , Route, Routes, useParams } from 'react-router-dom';
import { Nav } from './pag/Navbar';
import { Signup } from './pag/Signup';
import { Signin } from './pag/Signin';
import { Add } from './pag/Add';
import { UserProfile } from './pag/Profile';
import { Delete } from './pag/Delete';
import { Update } from './pag/Update';
import { CProfile } from './pag/Cusprofile';
import { Chatbot } from './pag/Chat';
import Chatgpt from './pag/Chat';
import { Mainaa } from './pag/Chat';
import { Home } from './pag/Home';
import { Cart } from './pag/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { Ca, Role } from './Action';
import { Error } from './pag/Error';
const ProtectedRoute = ({ path, element }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.Rolee);
  dispatch(Role());
  const { type } = useParams();

  if (role === "Admin" && (path === "/add" || path === "/delete" || path === "/update" || path === "/profile")) {
    return element;
  } else if (role === "Customer" && (path === "/cat/:type" || path === "/help" || path === "/Cprofile" || path==="/cart")) {
    if (type && type !== "all" && !["mobile", "laptop", "headphones", "other"].includes(type)) {
      return <Error />;
    }
    return element;
  } else if (role === "guest" && (path === "/signin" || path === "/signup" || (path === "/cat/:type" && (!type || type === "all")))) {
    return element;
  } else {
    return <Error />;
  }
};



function App() {
  const dispatch = useDispatch();
  dispatch(Role());
  dispatch(Ca());
  return (
    <>
      <BrowserRouter >
        <Nav />
        <Routes>
        {/* guest */}
        <Route path="/signup" element={<ProtectedRoute path="/signup" element={<Signup />}></ProtectedRoute>}></Route>
        <Route path="/signin" element={<ProtectedRoute path="/signin" element={<Signin />}></ProtectedRoute>}></Route>
        {/* customer */}
        <Route path="/cart" element={<ProtectedRoute path="/cart" element={<Cart/>}></ProtectedRoute>}></Route>
        <Route path="/cat/:type" element={<ProtectedRoute path="/cat/:type" element={<Home />}></ProtectedRoute>}></Route>
        <Route path="/help" element={<ProtectedRoute path="/help" element={<Mainaa />}></ProtectedRoute>}></Route>
        <Route path="/Cprofile" element={<ProtectedRoute path="/Cprofile" element={<CProfile />}></ProtectedRoute>}></Route>
        {/* admin */}
        <Route path="/add" element={<ProtectedRoute path="/add" element={<Add />}></ProtectedRoute>}></Route>
        <Route path="/delete" element={<ProtectedRoute path="/delete" element={<Delete />}></ProtectedRoute>}></Route>
        <Route path="/update" element={<ProtectedRoute path="/update" element={<Update />}></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute path="/profile" element={<UserProfile />}></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
