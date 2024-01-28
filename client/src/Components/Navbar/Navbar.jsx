import React, { useState } from "react";
import "./navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = ({ authenticated }, props) => {
  const [active, setActive] = useState("navBar");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  const handleAccount = () => {
    navigate('/Loge');
  }
  const handleAccountPage = () => {
    navigate('/AccountPage')
  }

  const handleLogout = () => {
    fetch("http://localhost:3001/logout",{
        method:"GET",
        credentials:"include",
    }).then((response) => {
        props.setUsername("");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        navigate("/");
    })
}

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1>
              <MdOutlineTravelExplore className="icon" /> VoXite
            </h1>
          </Link>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="/Tours" className="navLink">
                Tours
              </Link>
            </li>
            <li className="navItem">
              <Link to="/About" className="navLink">
                About
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">
                Contact
              </Link>
            </li>
            <li className="navItem">
                {/* {props.username? (
                    <>
                        <p onClick={handleAccountPage}>Hi, {props.username}</p>
                        <h3 className="navbar--account" onClick={handleLogout}>
                            Log Out
                        </h3>
                    </>
                ) : (
                  <h3 className="navbar--account" onClick={handleAccount}>
                    Log In
                  </h3>
                )} */}
              {console.log("Hi"+props.username+"Hi")}
              {props.username? (
                <div className="dropdown">
                  <div className="navLink" onClick={handleAccountPage}>
                    {/* <FaUserCircle className="icon" /> */}
                    Hi, {props.username}
                  </div>
                  <h3 className="navbar--account" onClick={handleLogout}>
                      Log Out
                  </h3>

                </div>
              ) : (
                <Link to="/Loge" className="navLink">
                  {/* <FaSignInAlt className="icon" /> */}
                  Login
                </Link>
              )}
            </li>
            <button className="btn">
              <Link to="/Book2">BOOK NOW</Link>
            </button>
          </ul>
          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggleNavbar"></div>
      </header>
    </section>
  );
};

export default Navbar;
