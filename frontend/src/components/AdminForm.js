import React, { useState } from 'react';
import axios from 'axios';
import './AdminForm.css';
import { ToastContainer } from 'react-toastify';
import { handleerror, handlesuccess } from '../toast';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    price: '',
    discount: '',
    sizes: [], 
    colors: [], 
    category: 'Air Jordan',
    stock: '',
    origin: '',
    gender: 'Men',
    highlights: '',
  });

  const [files, setFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const [loading,setLoading]= useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          [name]: [...prev[name], value], 
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value),
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          form.append(key, item);
        });
      } else {
        form.append(key, value);
      }
    });
    Object.entries(files).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
    try {
      const token = localStorage.getItem('AdminToken')
      const response = await axios.post('http://localhost:4500/create', form, {
        headers: { 'Content-Type': 'multipart/form-data' , Authorization : `Bearer ${token}` },
      });
      if (response) {
        setLoading(false)
        handlesuccess('Product added successfully!');
      }
    } catch (error) {
      setLoading(false)
      handleerror('Failed to add product. Please try again.');
    }
  };
  return (
    <div className="adminmain">
      <div className="adminhead">
        <h6>Upload New Item</h6>
        <p>The details filled will be saved in the database</p>
      </div>
      <div className="producttitle">
        <label htmlFor="title">Product Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="productdetail">
        <label htmlFor="detail">Product Detail</label>
        <input
          type="text"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
        />
        <p>Write a Few Sentences about the product</p>
      </div>

      <div className="twosides">
        <div className="leftside">
          <div className="firstone">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="firstsecond">
            <label htmlFor="sizes">Select Size:</label>
            <div className="contain">
              {[5, 6, 7, 8, 9, 10, 11, 12,'S','M','L','XL','XXL'].map((size) => (
                <div className="selectcheck" key={size}>
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={formData.sizes.includes(size.toString())}
                    onChange={handleChange}
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="category">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Air Jordan">Air Jordan</option>
              <option value="Nike City">Nike City</option>
              <option value="Nike Vomero">Nike Vomero</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
        </div>

        <div className="rightside">
          <div className="disc">
            <label htmlFor="discount">Discount Percentage</label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className="colourcheck">
            <label htmlFor="colors">Select Colors:</label>
            <div className="contain">
              {['Blue', 'Grey', 'White', 'Green', 'Black', 'Red', 'Yellow', 'Brown'].map(
                (color) => (
                  <div className="checkcolors" key={color}>
                    <input
                      type="checkbox"
                      name="colors"
                      value={color}
                      checked={formData.colors.includes(color)}
                      onChange={handleChange}
                    />
                    <label htmlFor={color}>{color}</label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="gender">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Men">Men</option>
              <option value="Women">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>
      </div>
      <div className="stock">
        <label htmlFor="stock">Stocks</label>
        <input
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>
      <div className="Country">
        <label htmlFor="origin">Country of Origin</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
      </div>
      <div className="last">
        <div className="coverphoto">
          <label htmlFor="image1">Cover Photo</label>
          <input type="file" name="image1" onChange={handleFileChange} />
        </div>
        <div className="coverphoto">
          <label htmlFor="image2">Image 1</label>
          <input type="file" name="image2" onChange={handleFileChange} />
        </div>
        <div className="coverphoto">
          <label htmlFor="image3">Image 2</label>
          <input type="file" name="image3" onChange={handleFileChange} />
        </div>
        <div className="coverphoto">
          <label htmlFor="image4">Image 3</label>
          <input type="file" name="image4" onChange={handleFileChange} />
        </div>
        <div className="coverphoto">
          <label htmlFor="image5">Image 4</label>
          <input type="file" name="image5" onChange={handleFileChange} />
        </div>
        <div className="highlight">
          <label htmlFor="highlights">Highlights (separate with commas)</label>
          <input
            type="text"
            name="highlights"
            value={formData.highlights}
            onChange={handleChange}
            placeholder="e.g. Comfortable, Durable, Stylish"
          />
        </div>
      </div>
      <div className="submit-btn">
      <button type="submit" className="submitbut" onClick={handleSubmit}>
        Submit
      </button>
      {loading &&
        <div className="upload-animation">
        <p>Uploading..</p>
        <div className="spinner"></div>
      </div>
      }
      
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default AdminForm;