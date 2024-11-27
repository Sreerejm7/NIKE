import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaIndianRupeeSign } from "react-icons/fa6";
import './ProductOverview.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleerror,handlesuccess } from '../toast';

const ProductOverview = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://nike-swe2.onrender.com/getproduct/${id}`);
        const productData = response.data.products;
        setProduct(productData);
        if (productData.image?.length > 0) {
          setSelectedImage(productData.image[0]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      handleerror('Please select a size before adding to the bag.');
      return;
    }
    const token = localStorage.getItem('UserToken')
    if (!token) {
      handleerror('You need to log in to add items to the bag.');
      return;
    }

    try {
      const token = localStorage.getItem('UserToken')
      const response = await axios.post(
        `https://nike-swe2.onrender.com/addtocart/${id}`,
        { size: selectedSize },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(response){
      handlesuccess('Product added to bag successfully!');
      navigate('/cart');
    } 
    } catch (err) {
      console.error('Failed to add product to cart:', err.response?.data?.message || err.message);
      handleerror('Failed to add product to the bag.');
    }
  };

  const handleFavourite= async ()=>{
    if (!selectedSize) {
      handleerror('Please select a size before adding to the bag.');
      return;
    }
      const token = localStorage.getItem('UserToken')
      if(!token){
        handleerror("Please Login First")
      }

      try {
        const token = localStorage.getItem('UserToken')
        const url = `https://nike-swe2.onrender.com/addtofavourite/${id}`
        const response = await axios.post(url,{size:selectedSize},{headers :{Authorization : `Bearer ${token}`}})
        if(response){
          handlesuccess(response.data.message)
          setTimeout(() => {
            navigate('/favourite')
          }, 1500);
        }
      } catch (error) {
        handleerror("Failed to Add products to Favourite")
      }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overview-container">
      <div className="image-display">
        <div className="small-image-dis">
          {product.image?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product View ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              className={selectedImage === image ? 'selected-image' : ''}
            />
          ))}
        </div>
        <div className="large-image-dis">
          <img className="center-image" src={selectedImage} alt="Main Product View" />
        </div>
      </div>
      <div className="detail-display">
        <div className="name-shoe">
          <h3>{product.title}</h3>
          <p className="cat-name">Gender: {product.gender}</p>
          <h6>MRP: <FaIndianRupeeSign /> {product.discountPrice}</h6>
          <p className="tax">
            Inclusive of all taxes <br />
            Also includes all applicable duties
          </p>
        </div>
        <div className="size-shoe">
          <p>Size</p>
          <div className="size-chart">
            {product.sizes?.map((size, index) => (
              <button
                className={`size ${selectedSize === size ? 'selected' : ''}`}
                key={index}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="bag-fav">
          <button className="add-bag" onClick={handleAddToCart}>
            Add to Bag
          </button>
          <button className="fav" onClick={handleFavourite}>Favourite</button>
        </div>
        <div className="detail">
          <p>{product.detail}</p>
        </div>
        <div className="highlight">
          <p><b>Highlights:</b> {product.highlights}</p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProductOverview;
