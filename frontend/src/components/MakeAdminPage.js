import React, { useState } from 'react'
import './MakeAdminPage.css'
import logo from "../assets/favicon.ico";
import axios from 'axios';
import { handleerror, handlesuccess } from '../toast';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MakeAdminPage = () => {
  const [loginData, setLoginData] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    const {name,value} = e.target
    setLoginData(prev =>({...prev , [name]:value}))
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      const url = "http://localhost:4500/makeadmin"
      const token = localStorage.getItem('AdminToken')
      const response = await axios.post(url,loginData,{headers :{Authorization :`Bearer ${token}`}})
      if(response){
        handlesuccess(response.data.message)
        setTimeout(() => {
          navigate('/landingpage')
        }, 2000);
      }
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        handleerror(error.response.data.message);
    } else {
        handleerror("An unexpected error occurred. Please try again.");
      }
    }
  }
  return (
    <div>
      <div className="make-admin">
        <div className="make-admin-container">
          <div className="nike-logo">
            <img src={logo} alt="nike-logo" />
          </div>
          <h4 className="sign-member">UNLEASH THE POWER OF LEADERSHIP AT NIKE</h4>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              value={loginData.email}
              onChange={handleChange}
            />

            
            <p className="policy">
              By logging in, you agree to Nike's{" "}
              <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
            </p>
            <button className="signup-button">ADD</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default MakeAdminPage
