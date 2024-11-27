import React, { useEffect, useState } from "react";
import "./FavouritePage.css";
import shoe1 from "../assets/NIKE+C1TY.png";
import { FaIndianRupeeSign } from "react-icons/fa6";
import heart from '../assets/filled-heart.png'
import { handleerror, handlesuccess } from "../toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const FavouritePage = () => {
  const [favProducts , setFavProducts] = useState([])
 

  const navigate = useNavigate()
  const fetch = async ()=>{
    const url = 'https://nike-swe2.onrender.com/fetchfavourite'
    const token = localStorage.getItem("UserToken")
    if(!token){
      handleerror("No Token Provided")
      navigate('/signin')
    }
    else{
      try {
        const response = await axios.get(url, {headers :{Authorization: `Bearer ${token}`}})
        if(response && response.data.details){
          setFavProducts(response.data.details)
        }
      } catch (error) {
        handleerror("Error while fetching products:", error);
      }
    }
  }
  useEffect(()=>{
    fetch()
  },[])

  const handleAddtoCart = async (Id , productId,selectedSize)=>{
    try {
      const token = localStorage.getItem('UserToken')
      const url = `https://nike-swe2.onrender.com/addtocart/${productId}`
      const response = await axios.post(url,{ size:selectedSize},{headers :{Authorization :`Bearer ${token}`}})
      if(response){
        
        setTimeout(() => {
          navigate('/cart')
          handleRemoveFromFavourite(Id)
        }, 2000);
      }
    } catch (error) {
      handleerror('Error while Adding to Cart')
    }
  }

  const handleRemoveFromFavourite = async (productId) => {
    try {
      const token = localStorage.getItem("UserToken");
      if (!token) {
        handleerror("No Token Provided. Please log in.");
        navigate("/signin");
        return;
      }
  
      const url = `https://nike-swe2.onrender.com/deletefavourite/${productId}`;
      const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
  
      if (response) {
        setFavProducts((prevProducts) =>
          prevProducts.filter((item) => item._id !== productId)
        );
      } else {
        handleerror(response.data.message || "Failed to remove the item.");
      }
    } catch (error) {
      handleerror(error.response?.data?.message || "Unexpected error occurred while removing the item.");
    }
  };

  
  
  
  return (
    <div className="fav-container">
      <div className="fav-header">
        <h3>Favourites</h3>
      </div>
      <div className="fav-items">
        {
          favProducts && favProducts.length >0 ? (favProducts.map((item,index)=>(
          
        <div className="fav-img-detail" key={index}>
          <img className="fav-img" src={item.product.image[0]} alt="shoe1" />
          <div className="fav-detail">
            <div className="fav-nm-price">
              <h6>{item.product.title}</h6>
              <p className="fav-price">MRP:{<FaIndianRupeeSign />} {item.product.discountPrice}</p>
            </div>
            <div className="fav-category">{item.product.category}</div>
            <div className="fav-">Size:{item.size}</div>size
            <div className="fav-btn-div">
            <button className="fav-btn" onClick={()=> handleAddtoCart(item._id,item.product._id,item.size)}>Add to Bag</button>
            <button className="fav-btn-rem" onClick={()=> handleRemoveFromFavourite(item._id)}>remove Favourite</button>
          </div>
          </div>
        </div>
          
        ))):(<p>No Favourite products</p>)
      }
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FavouritePage;
