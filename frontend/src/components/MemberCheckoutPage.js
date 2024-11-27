import React, { useEffect, useState } from 'react'
import './MemberCheckoutPage.css'
import { FaIndianRupeeSign } from "react-icons/fa6";
import shoe from '../assets/AIR+JORDAN+1+LOW -4.png'
import axios from 'axios';
import { handleerror,handlesuccess } from '../toast';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MemberCheckoutPage = () => {
  const [checkoutProduct , setCheckoutProduct] = useState([])
  const [input, setinput] = useState({
    firstname:'',
    lastname:'',
    email:'',
    address:'',
    pincode:'',
    phone:'',
    alternativenumber:''

  })

  useEffect(()=>{
    const fetch= async  () =>{
    const token = localStorage.getItem('UserToken')
    const url = 'https://nike-swe2.onrender.com/fetchcart'
    const response = await axios.get(url,{headers :{Authorization :`Bearer ${token}`}}) 
    if(response){
      setCheckoutProduct(response.data.details)
    }
  }
    fetch()
  },[])

  const calculateTotal = () => {
    return checkoutProduct.reduce((total, item) => {  
      return total + (item.product.discountPrice * item.quantity)}, 0);
  };
  const dc=()=>{
     const sum=(calculateTotal()/100)*8
     return sum
  }

  const total=()=>{
     const sum=calculateTotal()+dc()
     return sum
  }

  const handleChange =(e)=>{
    const {name,value}= e.target
    setinput((prev)=> ({...prev, [name]:value}))
  }

  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {...input,
        Subtotal: calculateTotal(),
        delivery_charge: dc(),
        total: total(),
        products:checkoutProduct.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            size: item.size,
            price: item.product.discountPrice
        }))
    };
    try {
        const token = localStorage.getItem('UserToken');
        const response = await axios.post('https://nike-swe2.onrender.com/product/order', orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response) {
          handlesuccess(response.data.message)
          localStorage.setItem('cartReset','true')
          setTimeout(() => {
            navigate('/user/orders')
          }, 1200);
        } 
    } catch (error) {
        handleerror(error.response.data.message);
    }
  };

  return (
    <div className='checkout-container'>
      <div className="checkout-left">
        <h3>Delivery</h3>
        <div className="checkout-address-detail">
          <h4>Enter your name and address:</h4>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={input.firstname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={input.lastname}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={input.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={input.address}
        onChange={handleChange}
      />
      <input
        type="number"
        name="pincode"
        placeholder="Pincode"
        value={input.pincode}
        onChange={handleChange}
      />
      <input
        type="number"
        name="phone"
        placeholder="Mobile Number"
        value={input.phone}
        onChange={handleChange}
      />
      <input
        type="number"
        name="alternativenumber"
        placeholder="Alternative Mobile Number"
        value={input.alternativenumber}
        onChange={handleChange}
      />
          <button className='place-order' onClick={handleSubmit}>Place Order</button>
        </div>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>
        <div className="checkout-price-detail">
          <div className="checkout-price">
          <p>Subtotal:</p>
          <p>{<FaIndianRupeeSign/>}{calculateTotal()}</p>
          </div>

          <div className="checkout-delivery">
          <p>Delivert/Shipping:</p>
          <p> {<FaIndianRupeeSign/>}{dc()}</p>
          </div>
         
          <div className="checkout-total">
          <h6>Total:</h6>
          <h6>{<FaIndianRupeeSign/>}{total()}</h6>
          </div>
          
        </div>
        {checkoutProduct && checkoutProduct.length>0 ? (checkoutProduct.map((item,index)=>(
        <div className="checkout-prod-detail" key={index}>
          <div className="checkout-prod">
            <img className='checkout-image' src={item.product.image[0]} alt="shoe" />
          </div>
          <div className="checout-detail">
            <h6>{item.product.title}</h6>
            <p>{item.product.category}</p>
            <p>Qty: {item.quantity}</p>
            <p>Size: {item.size}</p>
            <p>Price :₹ {item.product.discountPrice}</p>
          </div>
        </div>
        ))):(<p>No Products</p>)}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default MemberCheckoutPage
