import React, { useEffect, useState } from 'react'
import './UserOrderPage.css'
import axios from 'axios'
import { handleerror, handlesuccess } from '../toast'
import { ToastContainer } from 'react-toastify'

const UserOrderPage = () => {
  const [orderProducts, setOrderProducts] = useState([])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('UserToken')
      const response = await axios.get(
        `https://nike-swe2.onrender.com/order/fetchbyuser`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response) {
        const filteredData = response.data.details.map((order) => {
          const product = order.products.filter(
            (item) => item.status !== 'Cancelled'
          )
          return { ...order, products: product }
        })
        setOrderProducts(filteredData)
      }
    } catch (error) {
      handleerror(error.response?.data?.message || 'Failed to fetch orders')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrderStatus = async (id, productId, status) => {
    try {
      const token = localStorage.getItem('UserToken')
      const response = await axios.put(
        `https://nike-swe2.onrender.com/order/update/${id}/product/${productId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.status === 200) {
        handlesuccess('Order status updated successfully!')
        fetchOrders() 
      }
    } catch (error) {
      handleerror(error.response?.data?.message || 'Error updating status')
    }
  }

  return (
    <div className="userorder">
      {orderProducts && orderProducts.length > 0 ? (
        orderProducts.flatMap((item, index) =>
          item.products.map((products, pindex) => (
            <div className="user-order-container" key={`${index}-${pindex}`}>
              <img
                className="order-image"
                src={products.product.image[0]}
                alt="shoe"
              />
              <div className="user-order-detail">
                <h4>{products.product.title}</h4>
                <p>{products.product.category}</p>
                <p>Size: {products.size}</p>
                <p>Qty: {products.quantity}</p>
                <h6>Status: {products.status}</h6>
                <h4>
                  MRP: ₹{products.product.discountPrice * products.quantity}
                </h4>
                <button
                  className="cancel"
                  style={{display:products.status === 'Delivered' ? 'none' : 'block'} }
                  onClick={() =>
                    updateOrderStatus(item._id, products._id, 'Cancelled')
                  }
                  
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))
        )
      ) : (
        <p>No Orders</p>
      )}
      <ToastContainer />
    </div>
  )
}

export default UserOrderPage
