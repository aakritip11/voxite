import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //   const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const handleRegisterClick = () => {
        navigate('/Signin');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setErrorMessage("Please fill in all the fields.");
            return;
        }
        fetch("http://localhost:3001/login", {
            method: "POST",
            // crossDomain: true, 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("login failed");
            }
        })
        .then((data) => {
            if (data.token) {
                setToken(data.token);
                console.log(data);
                // data.add("email",email);
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", email);
            //   setAuthenticated(true);
                props.setUsername(data.username);
                props.setEmail(email);
                navigate("/");
            } else {
                throw new Error("Token not received");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Something went wrong during account");
        });
    };

    // Fetch user data when the component mounts or when the token changes
    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = () => {
    fetch("http://localhost:3001/userdata", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },
        body: JSON.stringify({ token }),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Failed to fetch user data");
        }
    })
    .then((data) => {
        console.log(data);
        if (data.status === "ok") {
            // Handle the received user data as needed
            console.log("User data:", data.data);
        } else {
            throw new Error("User not found");
        }
    })
    .catch((error) => {
        console.error(error);
        setErrorMessage("Something went wrong while fetching user data");
    });
    }

    return (
        <div className="account">
            <div className="account--left">
                "Tailored Travel Experiences: Creating Your Perfect Journey"
            </div>
            <div className="account--right">
                <div className="account--rightheader">
                    <h1>Log in to Voxite</h1>
                    <h4 className="account--gotoreg">Don't have an account?<p className="account--gotoreglink" onClick={handleRegisterClick}>Sign Up</p></h4>
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

export default Login;