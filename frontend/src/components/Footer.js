import React from 'react'
import './Footer.css'
import { useState , useEffect } from 'react'

function Footer() {

  const [windowDimension,setWindowDimension] = useState({
    winWidth : window.innerWidth,
    winHeight: window.innerHeight
  })

  
  const[showresource,setshowresource]=useState(true)
  const[showhelp,setshowhelp]=useState(true)
  const[showcompanies,setshowcompanies]=useState(true)
  const[windowWidth,setWindowWidth]=useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize',HandleResize)
   }, [])

   const HandleResize=()=>{
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    if(windowWidth<960)
    {
     setshowhelp(false)
     setshowcompanies(false)
    }
    else
    {
     setshowresource(true)
     setshowhelp(true)
     setshowcompanies(true)
    }
    }, [windowWidth])

  const setResource = () => {
    if (windowDimension.winWidth < 960) { 
      setshowresource(prevState => !prevState);
    }
  };
  
  const setHelp=()=>{
    if (windowDimension.winWidth < 960) { 
      setshowhelp(prevState => !prevState);
    }
  }

  const setCompanies=()=>{
    if (windowDimension.winWidth < 960) { 
      setshowcompanies
      (prevState => !prevState);
    }
  }

  
  

  return (
    <div className="footer">
      <div className='footer-container'>
      <div className="footer-div">
        <h5 onClick={setResource}>Resources</h5>
        {showresource && (
          <ul>
          <p>Find a Store</p>
          <p>Become a Member</p>
          <p>Send Us Feedback</p>
          </ul>
        )}
      </div>

      <div className="footer-div">
        <h5 onClick={setHelp}>Help</h5>
        {showhelp && (
        <ul>
        <p>Get Help</p>
          <p>Order status</p>
          <p>Delivery</p>
          <p>Returns</p>
          <p>Payment Options</p>
          <p>Contact Us On Nike.com Inquiries</p>
          <p>XContact us On All Other Inquiries</p>
        </ul>
        )}
      </div>

      <div className="footer-div">
        <h5 onClick={setCompanies}>Companies</h5>
        {showcompanies && (
          <ul>
          <p>About Nike</p>
          <p>News</p>
          <p>Careers</p>
          <p>Investors</p>
          <p>Sustainability</p>
          </ul>
          )}
      </div>

      <div className="footer-div-loc">
      <svg aria-hidden="true" class="css-npy3on" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5" d="M21.75 12A9.75 9.75 0 0112 21.75M21.75 12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365 3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25 9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9 0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1 2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"></path></svg>
      <p>India</p>
       
      </div>
    </div>
    </div>
    
  )
}

export default Footer