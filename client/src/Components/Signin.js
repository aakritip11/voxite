import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [passwordmatch, setPasswordMatch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //   const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const handleLoginClick = () => {
        navigate('/Login');
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleCPasswordChange = (e) => {
        setCPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "" || name === "" || phone === "" || cpassword === "") {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        if (password !== cpassword) {
            setPasswordMatch("Password don't match.");
            return;
        }

        fetch("http://localhost:3001/register", {
            method: "POST",
            // crossDomain: true, 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
                cpassword,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("signin failed");
            }
        })
        .then((data) => {
            console.log(data, "userRegister");
            if(data.status=="ok") {
              alert("Registration Successful");
              navigate("/");
              }
              else{
                alert("User Already Exists");
                navigate("/Login");
              }
          })
        .catch((error) => {
            console.error(error);
            alert("Something went wrong during signing in");
        });
    };

    return (
        <div className="account">
            <div className="account--left">
                "Wander, Explore, Discover: Unleash Your Inner Traveler"
            </div>
            <div className="account--right">
                <div className="account--rightheader">
                    <h1>Log in to Voxite</h1>
                    <h4 className="account--gotoreg">Don't have an account?<p className="account--gotoreglink" onClick={handleLoginClick}>Login</p></h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
                        <input
                        type="password"
                        id="pass"
                        placeholder="************"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                    </div>
                    <h4 className="account--gotoreg">
                        By clicking Sign Up, you agree to our <p className="account--gotoreglink">Terms & Conditions</p>
                    </h4>
                    <br/>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    
                    <button type="button" className="account--btn" onClick={handleSubmit}>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;