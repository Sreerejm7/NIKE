import React from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import ProductOverViewPage from './pages/ProductOverViewPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Cart from './pages/Cart';
import Favourite from './pages/Favourite';
import MakeAdmin from './pages/MakeAdmin';
import Orders from './pages/Orders';
import MemberCheckout from './pages/MemberCheckout';
import UserOrders from './pages/UserOrders';





function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path='/landingpage' element={<LandingPage/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/admin/addproduct' element={<Admin/>}></Route>
        <Route path='/productoverview/:id' element={<ProductOverViewPage/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/favourite' element={<Favourite/>}></Route>
        <Route path='/create/admin' element={<MakeAdmin/>}></Route>
        <Route path='/admin/orders/view' element={<Orders/>}></Route>
        <Route path='/product/checkout' element={<MemberCheckout/>}></Route>
        <Route path='/user/orders' element={<UserOrders/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
