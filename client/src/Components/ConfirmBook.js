import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';

function ConfirmBook(props) {
    const { id } = useParams();
    const { duration, person } = useParams();

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const tour = props.Data.find((item) => item.id === parseInt(id));
    const navigate = useNavigate();

    const handleConfirm = () =>{
        navigate('/Payment')
    }

    return (
        <div className='confirmbook--container'>
            <h1 data-aos="fade-up" className="about--homeTitle">
                "Embrace the Adventure: Unforgettable Journeys Await"
                <br></br>
                <br></br>
                Confirm your booking
            </h1>
            <div className="confirmbook">
                <div className="confirmbook--rightsection">
                    <div className="confirmbook--middle">
                        <div className="confirmbook--info">
                            <p className='confirmbook--tiletitle'>Personal Information</p>
                            <div className="confirmbook--tile">
                                <p className="confirmbook--leftusername">{props.username}</p>
                                <span className="confirmbook--tilename">Name</span>
                            </div>
                            <hr/>
                            <p className='confirmbook--tiletitle'>Contact information</p>
                            <div className="confirmbook--tile">
                                <p className="confirmbook--leftusername">{props.phone}</p>
                                <span className="confirmbook--tilename">Phone number</span>
                            </div>
                            <div className="confirmbook--tile">
                                <p className="confirmbook--leftusername">{props.email}</p>
                                <span className="confirmbook--tilename">Email</span>
                            </div>
                            <hr/>
                            <p className='confirmbook--tiletitle'>Address</p>
                            <div className='confirmbook--address'>
                                <div className="confirmbook--tile">
                                    <p className="confirmbook--leftusername">{props.country}</p>
                                    <span className="confirmbook--tilename">Country</span>
                                </div>
                                <div className="confirmbook--tile">
                                    <p className="confirmbook--leftusername">{props.city}</p>
                                    <span className="confirmbook--tilename">City</span>
                                </div>
                            </div>
                            <hr/>
                            <p className='confirmbook--tiletitle'>Tour Details</p>
                            <div className='confirmbook--address'>
                                <div className="confirmbook--tile">
                                    <p className="confirmbook--leftusername">{tour.destTitle}</p>
                                    <span className="confirmbook--tilename">Destination</span>
                                </div>
                                <div className="confirmbook--tile">
                                    <p className="confirmbook--leftusername">{tour.location}</p>
                                    <span className="confirmbook--tilename">Location</span>
                                </div>
                                <div className="confirmbook--tile">
                                    <p className="confirmbook--leftusername">{duration}</p>
                                    <span className="confirmbook--tilename">Duration</span>
                                </div>
                                <div className="confirmbook--tile">
                                    <p className="confirmbook--leftusername">{person}</p>
                                    <span className="confirmbook--tilename">No. of persons</span>
                                </div>
                            </div>
                        </div>
                
                        <div className="confirmbook--deactivate">
                            <p className="confirmbook--de">Booking Confirmation</p>
                            <div className="confirmbook--deactivatebtn">
                                <p className="confirmbook--deactivatemsg">Once you confirm your booking, there is no going back. Please be certain.</p>
                                <button className="confirmbook--debtn">Confirm Booking</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBook;
