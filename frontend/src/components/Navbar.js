import { useEffect, useState } from "react";
import React from "react";
import "./Navbar.css";
import nikelogo from "../assets/favicon.ico";
import hamburgericon from "../assets/hamburger.png";
import searchicon from "../assets/search.png";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [user, setUser] = useState(false);
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState(false);
  const loginoption = ["Find a Store", "Help", "Join us", "Login"];
  const loginuseroption = ["Find a Store", "Help", "Hi"];
  const adminoption = ["Add New Product", "Make Admin", "Orders", "Hi"];
  const [fname, setFname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    const adminToken = localStorage.getItem("AdminToken");

    if (adminToken) {
      setUser("admin");
    } else if (token) {
      setUser("user");
    }
    setFname(localStorage.getItem("fname"));
  }, []);

  const handleCart = () => {
    navigate("/cart");
  };

  const handleFavourite = () => {
    navigate("/favourite");
  };

  const handleOrder = () => {
    navigate("/user/orders");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("AdminToken") ||
      localStorage.removeItem("UserToken");
    localStorage.removeItem("fname");
    setUser(false);
  };

  setTimeout(() => {
    localStorage.removeItem("AdminToken") ||
      localStorage.removeItem("UserToken");
    localStorage.removeItem("fname");
    setUser(false);
  }, 3600000);
  const HandleAddnew = () => {
    navigate("/admin/addproduct");
  };

  const HandleAdmins = () => {
    navigate("/create/admin");
  };

  function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }

  function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

  function hideSidebarsub() {
    const sidebar = document.querySelector(".sidebar");
    const subsidebar = document.querySelector(".sidebar-sub");
    sidebar.style.display = "none";
    subsidebar.style.display = "none";
  }

  function showBack() {
    const subsidebar = document.querySelector(".sidebar-sub");
    subsidebar.style.display = "none";
  }

  function handleCategory(category) {
    setCat(category);
  }

  function subnavOpen() {
    setOpen(!open);
  }

  const handleLanding = () => {
    navigate("/landingpage");
  };

  const handleOrders = () => {
    navigate("/user/orders");
  };

  const handleBag = () => {
    navigate("/cart");
  };
  const Handleorderses = () => {
    navigate("/admin/orders/view");
  };

  return (
    <nav className="navbar">
      <div className="firstnav">
        <div className="logo">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="first-right">
          {user ? (
            <>
              {(user === "admin" ? adminoption : loginuseroption).map(
                (opt, index) => (
                  <div className="user-logined" key={index}>
                    {opt === "Hi" ? (
                      <div className="hi-menu">
                        <p>
                          {opt}, {fname} {<FaUser />}
                        </p>
                        <div className="hi-submenu">
                          <h5>Account</h5>
                          {user === "admin" ? (
                            <>
                              <p>Admin Panel</p>
                              <p onClick={handleLogout}>Logout</p>
                            </>
                          ) : (
                            <>
                              <p>Profile</p>
                              <p onClick={handleOrder}>Orders</p>
                              <p onClick={handleFavourite}>Favourites</p>
                              <p onClick={handleLogout}>Logout</p>
                            </>
                          )}
                        </div>
                      </div>
                    ) : opt === "Add New Product" ? (
                      <p onClick={HandleAddnew}>{opt}</p>
                    ) : opt === "Make Admin" ? (
                      <p onClick={HandleAdmins}>{opt}</p>
                    ) : opt === "Orders" ? (
                      <p onClick={Handleorderses}>{opt}</p>
                    ) : (
                      <p>{opt}</p>
                    )}
                  </div>
                )
              )}
            </>
          ) : (
            <>
              {loginoption.map((opt, index) => (
                <div className="user-logined" key={index}>
                  {opt === "Help" ? (
                    <div className="help-menu">
                      <p>{opt}</p>
                      <div className="submenu">
                        <p>Order Status</p>
                        <p>Dispatch</p>
                        <p>Delivery</p>
                        <p>Date of Arrival</p>
                      </div>
                    </div>
                  ) : opt === "Join us" ? (
                    <p onClick={handleSignup}>{opt}</p>
                  ) : opt === "Login" ? (
                    <p onClick={handleSignin}>{opt}</p>
                  ) : (
                    <p>{opt}</p>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="middle">
        <img src={nikelogo} alt="" onClick={handleLanding} />
        <div className="middle-middle">
          <ul>
            <li>New &Featured</li>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Sale</li>
            <li>SNKRS</li>
          </ul>
        </div>
        <div className="middle-right">
          <div className="search">
            <img className="search-button" src={searchicon} alt="sr" />
            <input
              className="search-input"
              type="search"
              placeholder="Search"
            />
          </div>
          <svg
            onClick={handleFavourite}
            style={{
              display: localStorage.getItem("AdminToken") ? "none" : "block",
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
          <svg
            onClick={handleCart}
            style={{
              display: localStorage.getItem("AdminToken") ? "none" : "block",
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
          </svg>
          <img
            className="hamburgericon"
            onClick={() => showSidebar()}
            src={hamburgericon}
            alt=""
          />
        </div>
      </div>

      <div className="sidebar">
        <div className="close">
          <svg
            onClick={() => hideSidebar()}
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#5f6368"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
        <ul>
          <li
            onClick={() => {
              handleCategory("new&featured");
              subnavOpen();
            }}
          >
            New & Featured
          </li>
          <li
            onClick={() => {
              handleCategory("men");
              subnavOpen();
            }}
          >
            Men
          </li>
          <li
            onClick={() => {
              handleCategory("women");
              subnavOpen();
            }}
          >
            Women
          </li>
          <li
            onClick={() => {
              handleCategory("kids");
              subnavOpen();
            }}
          >
            Kids
          </li>
          <li
            onClick={() => {
              handleCategory("sale");
              subnavOpen();
            }}
          >
            Sale
          </li>
          <li
            onClick={() => {
              handleCategory("snkrs");
              subnavOpen();
            }}
          >
            SNKRS
          </li>
        </ul>

        <div className="jordan">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <h6>Jordan</h6>
        </div>
        <div className="nike-member">
          <p>
            Become a Nike Member for the best products, inspiration and stories
            in sport. <b id="learn">Learn more</b>
          </p>
        </div>
        <div className="sidebar-buttons">
          <button
            className="join-us"
            style={{
              display:
                localStorage.getItem("UserToken") ||
                localStorage.getItem("AdminToken")
                  ? "none"
                  : "block",
            }}
            onClick={handleSignup}
          >
            Join Us
          </button>
          <button
            className="sign-in"
            style={{
              display:
                localStorage.getItem("UserToken") ||
                localStorage.getItem("AdminToken")
                  ? "none"
                  : "block",
            }}
            onClick={handleSignin}
          >
            Sign In
          </button>
          <button
            className="sign-in"
            style={{
              display:
                localStorage.getItem("UserToken") ||
                localStorage.getItem("AdminToken")
                  ? "block"
                  : "none",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="user-item-wrapper">
          <div className="help">
            <svg
              aria-hidden="true"
              class="nav-icon"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
              count="0"
            >
              <path
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="1.5"
                d="M11.99 18v-1.5M9 9.75a3 3 0 114.29 2.71c-.78.37-1.29 1.16-1.29 2.03V15m9.75-3c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25s9.75 4.365 9.75 9.75z"
              ></path>
            </svg>
            <h6>Help</h6>
          </div>
          <div className="bag" onClick={handleBag}>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
              ></path>
            </svg>
            <h6>Bag</h6>
          </div>
          <div className="orders" onClick={handleOrders}>
            <svg
              aria-hidden="true"
              class="nav-icon"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
              count="0"
            >
              <path
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="1.5"
                d="M12 13.5v-7c0-1.74 1.01-2.75 2.25-2.75h4.39l1.61 6m0 0H3.75m16.5 0v10.5H3.75V9.75m0 0l1.61-6h5.14"
              ></path>
            </svg>
            <h6>Orders</h6>
          </div>
          <div className="find-a-store">
            <svg
              aria-hidden="true"
              class="nav-icon"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
              count="0"
            >
              <path
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="1.5"
                d="M20.25 5.25V16.5c0 1.24-1.01 2.25-2.25 2.25H6c-1.24 0-2.25-1.01-2.25-2.25V5.25m4.5 13.25v-7.25h7.5v7.25M12 11.25v7.25M1.5 5.25h21"
              ></path>
            </svg>
            <h6>Find aStore</h6>
          </div>
        </div>
      </div>
      <div className={`sidebar-sub ${open ? "open" : ""}`}>
        {open && cat === "new&featured" ? (
          <>
            <div className="back-close">
              <svg
                onClick={() => showBack()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <svg
                onClick={() => hideSidebarsub()}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <h5>New & Featured</h5>

            <ul>
              <li>New Arrivals</li>
              <li>Bestsellers</li>
              <li>Featured</li>
              <li>Shop Icons</li>
              <li>Shop By Sport</li>
            </ul>
          </>
        ) : cat === "men" ? (
          <>
            <div className="back-close">
              <svg
                onClick={() => showBack()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <svg
                onClick={() => hideSidebarsub()}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <h5>Men</h5>
            <ul>
              <li>New Arrivals</li>
              <li>Bestsellers</li>
              <li>Shoes</li>
              <li>Clothing</li>
              <li>Shop By Sport</li>
              <li>Accessories and Equipment</li>
            </ul>
          </>
        ) : cat === "women" ? (
          <>
            <div className="back-close">
              <svg
                onClick={() => showBack()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <svg
                onClick={() => hideSidebarsub()}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <h5>Women</h5>
            <ul>
              <li>New Arrivals</li>
              <li>Bestsellers</li>
              <li>Shoes</li>
              <li>Clothing</li>
              <li>Shop By Sport</li>
              <li>Accessories and Equipment</li>
            </ul>
          </>
        ) : cat === "kids" ? (
          <>
            <div className="back-close">
              <svg
                onClick={() => showBack()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <svg
                onClick={() => hideSidebarsub()}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <h5>Kids</h5>
            <ul>
              <li>New Arrivals</li>
              <li>Bestsellers</li>
              <li>Shoes</li>
              <li>Clothing</li>
              <li>Shop By Sport</li>
              <li>Accessories and Equipment</li>
            </ul>
          </>
        ) : cat === "sale" ? (
          <>
            <div className="back-close">
              <svg
                onClick={() => showBack()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <svg
                onClick={() => hideSidebarsub()}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <h5>Sale</h5>
            <ul>
              <li>New Arrivals</li>
              <li>Bestsellers</li>
              <li>Shoes</li>
              <li>Clothing</li>
              <li>Shop By Sport</li>
              <li>Accessories and Equipment</li>
            </ul>
          </>
        ) : cat === "snkrs" ? (
          <>
            <div className="back-close">
              <svg
                onClick={() => showBack()}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
              <svg
                onClick={() => hideSidebarsub()}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <h5>SNKRS</h5>
            <ul>
              <li>New Arrivals</li>
              <li>Bestsellers</li>
              <li>Shoes</li>
              <li>Clothing</li>
              <li>Shop By Sport</li>
              <li>Accessories and Equipment</li>
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
