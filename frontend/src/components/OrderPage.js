import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";
import { handleerror } from "../toast";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("AdminToken");
      const response = await axios.get("http://localhost:4500/product/fetch", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const filtereddata=response.data.details.map(order => {const product=order.products.filter((item)=>item.status !== 'Delivered' && item.status !=='Rejected')
          return { ...order , products :product}
         })
        setOrders(filtereddata);
      }
    } catch (error) {
      handleerror(error.response.data.message);
    }
  };

  const updateOrderStatus = async (id, productId, status) => {
    try {
      const token = localStorage.getItem("AdminToken");
      const response = await axios.put(
        `http://localhost:4500/order/update/${id}/product/${productId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        fetchOrders(); 
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      handleerror(error.response?.data?.message || "Error updating status");
    }
  };

  const handleDelete = async (id,productId)=>{
    try {
      const token  = localStorage.getItem('AdminToken')
      const response = await axios.delete(`http://localhost:4500/order/delete/${id}/product/${productId}`,{headers : {Authorization : `Bearer ${token}`}})
      if (response.status === 200) {
        fetchOrders();
      }
    } catch (error) {
      handleerror(error.response.data.message)
    }
  }
  

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      <div className="fav-header">
        <h3>Orders</h3>
      </div>
      <div className="fav-items">
        {orders && orders.length > 0 ? (
          orders.flatMap((item, index) =>
            item.products.map((product, prodindex) => (
              <div className="fav-img-detail" key={`${index}-${prodindex}`}>
                <img
                  className="fav-img"
                  src={product.product.image[0]}
                  alt="shoe1"
                />
                <div className="fav-detail">
                  <div className="fav-nm-price">
                    <h6>{product.product.title}</h6>
                    <div className="fav-price-det">
                    <p className="subtotal">
                      Subtotal:{<FaIndianRupeeSign />} {product.product.discountPrice*product.quantity}
                    </p>
                    <p className="sub-delivery">
                      Delivery/Shipping: ₹ {product.product.discountPrice*8/100}
                    </p>
                    <p className="total">
                      Total: ₹ {product.product.discountPrice*product.quantity+product.product.discountPrice*8/100 }
                    </p>
                    </div>
                  </div>
                  <p className="fav-category">
                    {product.product.category}
                  </p>
                  <p className="fav-size">Size:{product.size}</p>
                  <p className="fav-discountprice">
                  MRP:{<FaIndianRupeeSign />} {product.product.discountPrice}
                  </p>
                  <p className="fav-qty">Qty:{product.quantity}</p>
                  <div className="fav-btn-div">
                    <button className="fav-btn" onClick={()=> updateOrderStatus(item._id,product._id, "Shipped")}>Shipped</button>
                    <button className="fav-btn" onClick={()=> updateOrderStatus(item._id,product._id, "Delivered")}>Delivered</button>
                    <button className="fav-btn"onClick={()=> updateOrderStatus(item._id,product._id, "Rejected")}>Reject Order</button>
                    <button className="fav-btn" style={{display:product.status==='Cancelled' ? 'block' :'none'}} onClick={()=>handleDelete(item._id,product._id)} >Delete</button>
                  </div>
                </div>
                <div className="addr">
                  <p>
                    Name: {item.name.firstname} {item.name.lastname}
                  </p>
                  <p>Phone Number: {item.phone}</p>
                  <p>Email: {item.email}</p>
                  <p>Address: {item.address}</p>
                  <p>Pin Code: {item.pincode}</p>
                  <p>MRP: {product.product.discountPrice}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p className={product.status ==='Dispatching' ? 'dispatching' :product.status === 'Shipped' ? 'Shipped' : 'Cancelled'}>Status: {product.status}</p>
                </div>
              </div>
            ))
          )
        ) : (
          <p>No Products</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
