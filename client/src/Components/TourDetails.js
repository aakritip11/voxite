import { useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';

function TourDetails(props){
    const { id } = useParams();

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const tour = props.Data.find((item) => item.id === parseInt(id));

    const navigate = useNavigate();

    if (!tour) {
        return <p>Tour not found.</p>;
    }
    return(
        <div className="tourdetails">
            <div className="tourdetails--info" data-aos="fade-up">
                <h2 className="tourdetails--title">{tour.destTitle}</h2>
                <div className="tourdetails--content">
                    <div className="tourdetails--image" data-aos="fade-up">
                        <img src={tour.imgSrc} alt='' />
                    </div>
                    <div className="tourdetails--description" data-aos="fade-up">
                        <h3>{tour.location}</h3>
                        <p>{tour.description}</p>
                        <div className="tourdetails--fees">
                            <div className="tourdetails--price">
                                <h5>Fees: {tour.fees}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="tourdetails--btn" onClick={() => navigate('/tours')}>
                    BACK 
                </button>
                
                <button className="tourdetails--btn" onClick={() => navigate(`/booknow/${id}`)}>
                    BOOK NOW
                </button>
            </div>
        </div>
    );
};

export default TourDetails