import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import Aos from "aos";
import 'aos/dist/aos.css'

function Tours(props){
    const navigate = useNavigate();
  
    useEffect(() => {
      Aos.init({ duration: 2000 });
      
    }, []);

    const LongText = ({ text, maxLength }) => {
      const [showFullText, setShowFullText] = useState(false);
  
      const toggleTextVisibility = () => {
        setShowFullText(!showFullText);
      };
  
      return (
        <>
          {showFullText ? (
            <p>{text}</p>
          ) : (
            <p>
              {text.slice(0, maxLength)}...{' '}
              <span onClick={toggleTextVisibility}>Read More</span>
            </p>
          )}
        </>
      );
    };
  
    return(
        <div className="tours">
            <div className="tours--secTitle">
                <h2 className="tours--homeTitle">"Unforgettable Landscapes: Discover Nature's Masterpieces"</h2>
                <h3 data-aos="fade-right" className="tours--title">
                    Exciting Tours
                </h3>
            </div>
            <div className="tours--card">
                {props.Data.map(({ id, imgSrc, destTitle, location, grade, fees, description }) => (
                    <div key={id} data-aos="fade-up" className="tours--singleDestination">
                        <div className="tours--imageDiv">
                            <img src={imgSrc} alt={destTitle} />
                        </div>
                        <div className="tours--cardInfo">
                            <h4 className="tours--destTitle">{destTitle}</h4>
                            <span className="tours--continent">
                                <HiOutlineLocationMarker className="tours--locationicon" />
                                <span className="tours--name">{location}</span>
                            </span>
                            <div className="tours--fees">
                                <div className="tours--grade">
                                    <span>
                                    {grade}
                                    {/* <small>+1</small> */}
                                    </span>
                                </div>
                                <div className="tours--price">
                                    <h5>{fees}</h5>
                                </div>
                            </div>
                            <div className="tours--desc">
                                <LongText text={description} maxLength={100} />
                            </div>
                            <Link to={`/TourDetails/${id}`} className="tours--btn">
                                DETAILS <HiOutlineClipboardCheck className="tours--detailsicon" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tours