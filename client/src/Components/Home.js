import React, {useState, useEffect} from "react";
import video from '../Assets/video2.mp4'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from "react-router-dom";

function  Home(){
    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    const [isPhotoMoving, setIsPhotoMoving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsPhotoMoving(true);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();
    const handleExplore = () => {
        navigate("/Tours")
    }

    return(
        <div className="home">
            <div className="home--videoDiv">
                <video src={video} muted autoPlay loop type="video/mp4"></video>
            </div>
            <div className="home-container">
                <div className="home--textDiv">
                    <span data-aos="fade-up" className="home--small">
                        Our Packages
                    </span>
                    <h1 data-aos="fade-up" className="home--title">
                        Search your <h1 className="home--titleh">Holiday</h1>
                    </h1>
                </div>
                <div data-aos="fade-up" className="home--textDiv1">
                    <span data-aos="fade-up" className="home--small1">
                        ............Unleash Your Wanderlust............
                    </span>
                    <h1 className="home--title1">
                        Unforgettable Travel and Tourism Experiences
                    </h1>
                    <div className="home--explore">
                        <span className="home--explorebtn"onClick={handleExplore}>EXPLORE MORE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home