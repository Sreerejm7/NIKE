import React, { useEffect, useState } from 'react';
import dustbin from '../assets/dustbin.png';
import './CartPage.css';
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import { handleerror } from '../toast';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [count,setCount] = useState(1)

  useEffect(() => {
    const fetch = async () => {
      const url = "https://nike-swe2.onrender.com/fetchcart";
      const token = localStorage.getItem("AdminToken") || localStorage.getItem('UserToken');
      if (!token) {
        handleerror("No Token Provided");
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        try {
          const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
          if (response && response.data.details) {
            setProducts(response.data.details);
            console.log(response.data.details); 
          }
        } catch (error) {
          handleerror("Error while fetching products:", error);
        }
      }
    };
    fetch();
  }, [navigate]);

  const handleRemoveFromCart = async(productId) => {
    try {
      const token = localStorage.getItem('UserToken')
      const response=await axios.delete(`https://nike-swe2.onrender.com/deletecart/${productId}`,{headers :{Authorization : `Bearer ${token}`}})
      if(response){
        setProducts((prevProducts) => prevProducts.filter((item) => item._id !== productId));
      }
    } catch (error) {
      handleerror("Error While Deleting Cart Items")
    }
    
  };

  const calculateTotal = () => {
    return products.reduce((total, item) => { const productCount = count[item._id] || 1; 
      return total + (item.product.discountPrice * productCount);}, 0);
  };
  const dc=()=>{
     const sum=(calculateTotal()/100)*8
     return sum
  }

  const total=()=>{
     const sum=calculateTotal()+dc()
     return sum
  }

  const handleChange = async (e,productId)=>{
    const {value} = e.target
    const newquantity=Number(value)
    setCount((prev)=>({...prev,[productId]:Number(value)}))
    try {
      const token=localStorage.getItem('UserToken')
      const response=await axios.put(`https://nike-swe2.onrender.com/updatecart/${productId}`,{quantity:newquantity},{headers : {Authorization :`Bearer ${token}`}})
    } catch (error) {
      handleerror(error.response.data.message)
    }
  }

  const handleCheckout =()=>{
    navigate(`/product/checkout`)
  }

  const clearcart=async()=>{
    try {
      const token = localStorage.getItem('UserToken')
      const response = await axios.delete('https://nike-swe2.onrender.com/clearcart',{headers :{Authorization :`Bearer ${token}`}})
    } catch (error) {
      handleerror(error.response.data.message)
    }
  }
  
  useEffect(() => {
   const status=localStorage.getItem('cartReset')
   if(status === 'true')
   {
    clearcart()
    localStorage.removeItem('cartReset')
   }
   else
  {
    // fetch()
  }
  }, [])
  

  return (
    <div className='cart-container'>
      <div className="cart-bag">
        <h6 className='cart-bag-heading'>Bag</h6>
        {products.length ? (
          products.map((item, index) => (
            <div className="cart-product" key={index}>
              <img className='cart-img' src={item.product.image[0]} alt="shoe" />
              <div className="cart-prod-detail">
                <div className="prod-name">
                  <p className='cart-pname'>{item.product.title}</p>
                  <p className='cart-price'>MRP: <FaIndianRupeeSign /> {item.product.discountPrice}</p>
                </div>
                <p className="cart-cat">{item.product.category}</p>
                <p>Size: {item.size}</p>
                <label className='qty-label' htmlFor="quantity">
                  Qty:
                  <input
                    className='qty'
                    type="number"
                    name='quantity'
                    min={1}
                    defaultValue={1}
                    value={count[item._id]}
                    onChange={(e)=>{handleChange(e,item._id)}}
                    
                  />
                </label>
                <img
                  className='dustbin'
                  src={dustbin}
                  alt="dustbin"
                  onClick={() => handleRemoveFromCart(item._id)} 
                />
              </div>
            </div>
          ))
        ) : (
          <p>No Products in Cart</p>
        )}
      </div>

      <div className="cart-summary">
        <h6>Summary</h6>
        <div className="summary-detail">
          <div className="cart-subtotal">
            <p>Subtotal:</p>
            <p>{<FaIndianRupeeSign />}{calculateTotal()}</p>
          </div>
          <div className="cart-delivery">
            <p>Estimated Delivery & Handling</p>
            <p>{<FaIndianRupeeSign />}{dc()}</p>
          </div>
          <div className="cart-total">
            <p>Total</p>
            <p>{<FaIndianRupeeSign />}{total()}</p>
          </div>
        </div>
        <div className="summary-button-div">
          <button className='member-button' onClick={()=> handleCheckout()}>Member Checkout</button>
        </div>
      </div>
      
    </div>
    
  );
};

export default CartPage;
