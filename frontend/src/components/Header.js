import React, { useEffect, useState } from 'react'
import './Header.css'
import image1 from '../assets/nikelandpage.jpg'
import image2 from '../assets/nikelandpage (1).jpg'
import shoe1 from '../assets/NIKE+C1TY -White-2.png'
import shoe2 from '../assets/NIKE+ZOOM+VOMERO+ROAMblue-2.png'
import shoe3 from '../assets/AIR+JORDAN+1+MID BW-2.png'
import video from '../assets/videoplayback-nike.mp4'
import img1 from '../assets/zoom-vomero-roam.png'
import img2 from '../assets/AIR+JORDAN+1+LOW.png'
import img3 from '../assets/NIKE+C1TY -White.png'
import img4 from '../assets/AS+M+NK+IMP+LGHT+WINDRNNER+JKT.png'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Header() {
  const [windowDimension,setWindowDimension] = useState({
    winWidth : window.innerWidth,
    winHeight: window.innerHeight
  })

  const[showIcons,setshowIcons]=useState(true)
  const[showkid,setshowkid]=useState(true)
  const[showshoe,setshowshoe]=useState(true)
  const[showcloth,setshowcloth]=useState(true)

const [product, setProducts] = useState([])

  const seticon = () => {
    if (windowDimension.winWidth < 768) { 
      setshowIcons(prevState => !prevState);
    }
  };
  
  const setshoe=()=>{
    if (windowDimension.winWidth < 768) { 
      setshowshoe(prevState => !prevState);
    }
  }

  const setcloth=()=>{
    if (windowDimension.winWidth < 768) { 
      setshowcloth(prevState => !prevState);
    }
  }
  const setkid=()=>{
    if (windowDimension.winWidth < 768) { 
      setshowkid(prevState => !prevState);
    }
  }

  const navigate = useNavigate()
  const handleHome = ()=>{
    navigate('/home')
  }
  
  useEffect(() => {
   if(windowDimension.winWidth<768)
   {
    setshowIcons(false)
    setshowkid(false)
    setshowcloth(false)
    setshowshoe(false)
   }
   else
   {
    setshowIcons(true)
    setshowkid(true)
    setshowcloth(true)
    setshowshoe(true)
   }
  }, [windowDimension.winWidth])

  const detectSize =()=>{
    setWindowDimension({
      winWidth : window.innerWidth,
      winHeight: window.innerHeight
    })
  }
  useEffect(()=>{
    window.addEventListener("resize",detectSize)
    return ()=>{
      window.removeEventListener("resize",detectSize);
    }
  },[windowDimension])

  const handleScroll=(direction)=>{
    const container=document.querySelector('.new-arrival-products')
    const scrollamount=300;
    if(direction==='left')
    {
      container.scrollLeft-=scrollamount
    }
    else
    {
      container.scrollLeft+=scrollamount
    }
  }

const handleScroll2=(direction)=>{
  const container=document.querySelector('.sport-container')
  const scrollamount=300;
  if(direction==='left')
  {
    container.scrollLeft-=scrollamount
  }
  else
  {
    container.scrollLeft+=scrollamount
    }
  }

const [selectedcategory,setselectedcategory]=useState('')
const Handlefirst = (category) => {
  setselectedcategory(category);
  navigate('/home', { state: { selectedcategory: category } }); 
};

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4500/getallproducts"
      );
      const sorted=response.data.products.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
      setProducts(sorted.slice(0, 5));
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };
  fetchProducts();
}, []);

const Handlebuy=(id)=>{
  navigate(`/productoverview/${id}`)
}


  return (
    <header>
      <div className='container'>
        <div className="first">
        {windowDimension.winWidth >768?(
          <img className='img-fluid' src={image2} alt='image2' onClick={handleHome}/>
        ):(<img className='img-fluid' src={image1} alt='image1' onClick={handleHome}/>)}
        <div className="first-text">
          <p className='first-text-para'>Just In</p>
          <h2 className='first-text-header'>NOTHING BEATS THE CITY</h2>
          <p className='first-text-para2'>Build to overcome anything the city throws your way</p>
          <button className='first-text-butt' onClick={handleHome}>Shop</button>
        </div>
          <div className="second">
            <div className="text">
                Featured
            </div>
            <div className="shoecontent">
                <div className='image-container'>
                <img src={shoe1} alt="shoe" className='custom-img'/>
                <div className='overlay-text'>
                    <p>Run in the Rain</p>
                    <p>Nike City</p>
                    <button className='spanbut' onClick={()=> Handlefirst('Nike City')}>Shop</button>
                </div>
                </div>
                <div className='image-container'>
                <img src={shoe2} alt="shoe" className='custom-img'/>
                <div className='overlay-text'>
                    <p>Just In</p>
                    <p>Nike Zoom Vomero</p>
                    <button className='spanbut'  onClick={()=> Handlefirst('Nike Vomero')}>Shop</button>
                </div>
                </div>
                 <div className='image-container'>
                <img src={shoe3} alt="shoe" className='custom-img'/>
                <div className='overlay-text'>
                    <p>Just In</p>
                    <p> Air Jordan</p>
                    <button className='spanbut' onClick={()=> Handlefirst('Air Jordan')}>Shop</button>
                </div>
                </div>
                
            </div>

            <div className="third">
              <div className="new_arrival_nav">
                <div className="latest_arrival">
                  <h5>New Arrivals Just Landed</h5>
                </div>
                <div className="shop">
                  <button onClick={()=>handleScroll("left")}>{<FaAngleLeft />}</button>
                  <button onClick={()=>handleScroll("right")}>{<FaAngleRight />}</button>
                </div>
              </div>
              <div className="new-arrival-products">
                {product.map((item,index)=>(
                <div className="new-arrival-prod-det" key={index} onClick={()=>Handlebuy(item._id)}>
                  <img className='shoe-img' src={item.image[0]} alt="" />
                  <div className="det">
                    <p id='shoe-name'>{item.title}</p>
                    <p id='men'>{item.category}</p>
                    <p id='price'>MRP: {<FaRupeeSign/>}{item.discountPrice}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>

            <div className="fourth">
              <h5>Don't Miss</h5>
              <video className='videoplayback' autoPlay loop src={video} type='video/mp4'></video>
            </div>

            <div className="fifth">
              <p id='air'>Air Jordan 4 RM</p>
              <h1>RIDE EASY</h1>
              <p>with the new spin of AJ4 icon, tommorrow will be even faster</p>
              <div className="fifth-button">
                <button className='fifth-butt' onClick={()=> Handlefirst('Air Jordan')}>Shop</button>
              </div>
            </div>

            <div className="sixth">
              <div className="shop-by-category">
              <h5>Shop By Category</h5>
              <div className="shop">
                  <button onClick={()=>handleScroll2("left")}>{<FaAngleLeft />}</button>
                  <button onClick={()=>handleScroll2("right")}>{<FaAngleRight />}</button>
                </div>
              </div>
              <div className="sport-container">
                <div className="sport-item" onClick={()=> Handlefirst('Nike Vomero')}>
                  <img className='sp' src={img1} alt="" />
                  <button className='sport-button' >Nike Zoom Vomero</button>
                </div>

                <div className="sport-item" onClick={()=> Handlefirst('Air Jordan')}>
                  <img className='sp' src={img2} alt="" />
                  <button className='sport-button'>Air Jordan</button>
                </div>

                <div className="sport-item" onClick={()=> Handlefirst('Nike City')}>
                  <img className='sp' src={img3} alt="" />
                  <button className='sport-button'>Nike City</button>
                </div>

                <div className="sport-item" onClick={()=> Handlefirst('Clothing')}>
                  <img className='sp' src={img4} alt="" />
                  <button className='sport-button'>Cloths</button>
                </div>
  
              </div>
            </div>

            <div className="seventh">
              <div className="icons">
              <h5 onClick={seticon}>icons</h5>
            {showIcons && (
              <ul>
              <li>Air Force 1</li>
              <li>Huarache</li>
              <li>Air Max 90</li>
              <li>Air Max 95</li>
              <li>Air Max 97</li>
              <li>Air Max 270</li>
              <li>Air Max 720</li>
              <li>All Air Max</li>
              <li>VaporMax</li>
            </ul>
            )}

              </div>

              <div className="icons">
              <h5 onClick={setshoe}>Shoes</h5>
            {showshoe && (
              <ul>
              <li>All Shoes</li>
              <li>Custom Shoes</li>
              <li>Jordan Shoes</li>
              <li>Running Shoes</li>
              <li>Basketball Shoes</li>
              <li>Football Shoes</li>
              <li>Gym & Training Shoes</li>
              <li>LifeStyle Shoes</li>
            </ul>
            )}

              </div>

              <div className="icons">
              <h5 onClick={setcloth}> Clothing's</h5>
            {showcloth && (
              <ul>
              <li>All Clothing</li>
              <li>Modest Wear</li>
              <li>Hoodies & Pullovers</li>
              <li>Shirts & Tops</li>
              <li>Jackets</li>
              <li>Compression & Nike Pro</li>
              <li>Trousers & Leggings</li>
              <li>Shorts</li>
            </ul>
            )}

              </div>

              <div className="icons">
              <h5 onClick={setkid}>Kid's</h5>
            {showkid && (
              <ul>
              <li>Infant & Toddler Shoes</li>
              <li>Kid's Shoes</li>
              <li>Kid's Jordan Shoes</li>
              <li>Kid's Basketball Shoes</li>
              <li>Kid's Running Shoes</li>
              <li>Kid's Clothing</li>
              <li>Kid's Backpacks</li>
              <li>Kid's Socks</li>
            </ul>
            )}

              </div>
            </div>


          </div>

        </div>
      </div>
    </header>
  )
}

export default Header