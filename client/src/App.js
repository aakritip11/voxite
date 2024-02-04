import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import About from './Components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tours from './Components/Tours';
import Data from './Components/Data';
import TourDetails from './Components/TourDetails';
import ScrollToTop from './Components/ScrollToTop';
import HomeWithTours from './Components/HomeWithTours';
import Login from './Components/Login';
import Signin from './Components/Signin';
import AccountDetails from './Components/AccountDetails';

function App(){
  const [username,setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState(" ");

  useEffect(()=>{
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
  },[])
  
  return (
    <Router>
      <ScrollToTop />
      <Navbar username={username} setUsername={setUsername}/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/accountdetails" element={<AccountDetails />} />
        <Route path="/login" element={<Login setUsername={setUsername} setEmail={setEmail}/>}/>
        <Route path="/signin" element={<Signin setUsername={setUsername} setEmail={setEmail}/>} />
        <Route path='/' element={<HomeWithTours initialTourCount={6} Data={Data}/>} />
        <Route path='/tours' element={<Tours Data={Data}/>} />
        <Route path='/tourdetails/:id' element={<TourDetails Data={Data}/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
