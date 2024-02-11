import React, {useEffect} from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import {useNavigate} from "react-router-dom";

function Navbar(props){
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/")
    }
    
    const handleAbout = () => {
        navigate("/About")
    }
    const handleContact = () => {
        navigate("/Footer")
    }
    const handleTours = () => {
        navigate("/Tours")
    }
    const handleLogin = () => {
        navigate("/Login")
    }
    const handleAccount = () => {
        navigate("/AccountDetails")
    }
    
    const handleLogoutClick = () => {
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

    useEffect(() => { 
        fetch("http://localhost:3001/checkLoginStatus", {
            method:"GET",
            credentials: "include",
        }).then((response) => response.json())
        .then((data) => {
          if (data.loggedIn) { 
            props.setUsername(data.username);
          }
        }) 
    },[props.username])

    return(
        <div className="navbar">
            <div className="navbar--header">
                <div className="navbar--logo" onClick={handleHome}><MdOutlineTravelExplore className="navbar--logoicon" /> VoXite</div>
                <div className="navbar--section">
                    <div className="navbar--lists">
                        <div className="navbar--item" onClick={handleHome}>Home</div>
                        <div className="navbar--item" onClick={handleTours}>Tours</div>
                        <div className="navbar--item" onClick={handleAbout}>About</div>
                        <div className="navbar--item" onClick={handleContact}>Contact</div>
                        {props.username? (
                            <>    
                                <div className="navbar--item" onClick={handleAccount}>Hi, {props.username}</div>
                                <h3 className="navbar--item" onClick={handleLogoutClick}>
                                    Log Out
                                </h3>
                            </>
                        ) : (
                            <div className="navbar--item" onClick={handleLogin}>Login</div>
                        )}
                    </div>
                    <button className="navbar--btn" onClick={handleTours}>BOOK NOW</button>
                </div>
            </div>
        </div>
    )
};

export default Navbar