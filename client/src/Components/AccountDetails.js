import React, { useState, useEffect } from 'react';
import avatar1 from "../Assets/img1.jpg";
import { useNavigate } from "react-router-dom";

function AccountDetails(props) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch("http://localhost:3001/logout",{
        method:"GET",
        credentials:"include",
    }).then((response) => {
        props.setUsername("");
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
  },[])

    return (
        <div className='accountdetails--container'>
            <div className="accountdetails">
                <div className="accountdetails--rightsection">
                    <div className="accountdetails--left">
                        <div className="accountdetails--profilepic">
                            <img src={avatar1} alt="/"/>
                            <p className="accountdetails--leftusername">{props.username}</p>
                            <button className="accountdetails--uploadbtn">Change Profile Photo</button>
                        </div>
                    </div>

                    <div className="accountdetails--middle">
                        <div className="accountdetails--info">
                            <p className='accountdetails--tiletitle'>Personal Information</p>
                            <div className="accountdetails--tile">
                                <p className="accountdetails--leftusername">{props.username}</p>
                                <span className="accountdetails--tilename">Name</span>
                            </div>
                            <hr/>
                            <p className='accountdetails--tiletitle'>Contact information</p>
                            <div className="accountdetails--tile">
                                <p className="accountdetails--leftusername">{props.phone}</p>
                                <span className="accountdetails--tilename">Phone number</span>
                            </div>
                            <div className="accountdetails--tile">
                                <p className="accountdetails--leftusername">{props.email}</p>
                                <span className="accountdetails--tilename">Email</span>
                            </div>
                            <hr/>
                            <p className='accountdetails--tiletitle'>Address</p>
                            <div className='accountdetails--address'>
                                <div className="accountdetails--tile">
                                    <p className="accountdetails--leftusername">{props.country}</p>
                                    <span className="accountdetails--tilename">Country</span>
                                </div>
                                <div className="accountdetails--tile">
                                    <p className="accountdetails--leftusername">{props.city}</p>   
                                    <span className="accountdetails--tilename">City</span>
                                </div>
                            </div>
                        </div>
                
                        <div className="accountdetails--deactivate">
                            <p className="accountdetails--de">Deactivate Account</p>
                            <div className="accountdetails--deactivatebtn">
                                <p className="accountdetails--deactivatemsg">Once you delete your account, there is no going back. Please be certain.</p>
                                <button className="accountdetails--debtn" onClick="/">Deactivate Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;