import React, { useState } from 'react'
import '../components/SignIn.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import logo from "../assets/favicon.ico";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleerror, handlesuccess } from '../toast';
import { ToastContainer } from 'react-toastify';

const SignIn = () => {

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
      const url = "http://localhost:4500/loginuser"
      const response = await axios.post(url,loginData)
      const token = response.data.AdminToken || response.data.UserToken;
      if (token) {
        localStorage.setItem(token=== response.data.AdminToken ?'AdminToken':'UserToken', token);
        localStorage.setItem('fname',response.data.user.firstname)
        handlesuccess(response.data.message);
        setTimeout(() => {
          let fname = response.data.user.firstname
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
      <Navbar/>
      <div className="signin">
        <div className="signup-container">
          <div className="nike-logo">
            <img src={logo} alt="nike-logo" />
          </div>
          <h4 className="sign-member">YOUR ACCOUNT FOR EVERTHING NIKE</h4>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              value={loginData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            <p className="policy">
              By logging in, you agree to Nike's{" "}
              <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
            </p>
            <button className="signup-button">LOGIN</button>
            <p className="log-p">
              Not a member? <Link to={"/signup"}>Join us</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer/>
      <Footer/>
    </div>
  )
}

export default SignIn
