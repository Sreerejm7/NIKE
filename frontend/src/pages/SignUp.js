import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/favicon.ico";
import { Link } from "react-router-dom";
import "../components/SignUp.css";
import axios from "axios";
import { handleerror, handlesuccess } from "../toast";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "https://nike-swe2.onrender.com/createuser";
      const response = await axios.post(url, formData);
      if (response) {
        handlesuccess("Registration Sucessfull" || response.data.message);
      }
    } catch (error) {
      handleerror(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="signup">
        <div className="signup-container">
          <div className="nike-logo">
            <img src={logo} alt="nike-logo" />
          </div>
          <h4 className="sign-member">BECOME A NIKE MEMBER</h4>
          <p className="member-p">
            Create your Nike Member profile and get first acess to the very best
            of Nike products. inspiration and community
          </p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dateOfBirth"
              placeholder="dd/mm/yyyy"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <p className="policy">
              By creating an account, you agree to Nike's{" "}
              <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
            </p>
            <button className="signup-button">JOIN US</button>
            <p className="log-p">
              Already a member? <Link to={"/signin"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default SignUp;
