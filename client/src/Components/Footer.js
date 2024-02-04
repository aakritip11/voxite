import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import video1 from '../Assets/video1.mp4'
import {FiSend} from 'react-icons/fi'
import {MdOutlineTravelExplore} from 'react-icons/md'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FaHome} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'

import Aos from "aos";
import 'aos/dist/aos.css'

function Footer(){
    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/")
    }

    return(
        <div className="footer">
            <div className="footer--videoDiv">
                <video src={video1} loop autoPlay muted type="video/mp4"></video>
            </div>
            <div className="footer--container">
                <div className="footer--contactDiv">
                    <div data-aos="fade-up" className="footer--text">
                        <div className="footer--small">KEEP IN TOUCH</div>
                        <h2 className="footer--h2">Travel with us</h2>
                    </div>
                    <div className="footer--inputDiv">
                        <input data-aos="fade-up" type="text" placeholder="Enter Email Address"/>
                        <button data-aos="fade-up" className="footer--btn" type="submit">
                            SEND <FiSend className="footer--sendicon"/>
                        </button>
                    </div>
                </div>
                <div className="footer--card">
                    <div className="footer--cardintro">
                        <div className="navbar--logo" onClick={handleHome}><MdOutlineTravelExplore className="navbar--logoicon" /> VoXite</div>
                        <div data-aos="fade-up" className="footer--paragraph">
                            Welcome to our website! We are a passionate team dedicated to providing you with the best travel experiences. With a focus on adventure, relaxation, and cultural immersion, we offer something for everyone. Our personalized itineraries, accommodations, transportation, and guided tours are designed to create unforgettable journeys that go beyond traditional tourist attractions. We value sustainability and responsible tourism, actively supporting local communities and conservation efforts. Let us be your guide as you explore the world, create lasting memories, and embark on a journey of discovery. Start your travel adventure with us today!
                        </div>
                        <div data-aos="fade-up" className="footer--socials">
                            <AiOutlineTwitter className="footer--socialsicon"/>
                            <AiFillYoutube className="footer--socialsicon"/>
                            <AiFillInstagram className="footer--socialsicon"/>
                            <FaHome className="footer--socialsicon"/>
                        </div>
                    </div>
                    <div className="footer--links">
                        <div data-aos="fade-up" data-aos-duration="3000" className="footer--linkGroup">
                            <span className="footer--groupTitle">
                                OUR AGENCY
                            </span>
                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Services
                            </div>
                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Insurance
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Agency
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Tourism
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Payment
                            </div>

                        </div>
                        <div data-aos="fade-up" data-aos-duration="3000" className="footer--linkGroup">
                            <span className="footer--groupTitle">
                                PARTNERS
                            </span>
                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Bookings
                            </div>
                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Rentcars
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                HostelWord
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Trivago
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                TripAdvisor
                            </div>

                        </div>
                        <div data-aos="fade-up" data-aos-duration="3000" className="footer--linkGroup">
                            <span className="footer--groupTitle">
                                LAST MINUTE
                            </span>
                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                London
                            </div>
                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                California
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Indonesia
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Europe
                            </div>

                            <div className="footer--list">
                                <FiChevronRight className="icon"/>
                                Oceania
                            </div>
                        </div>
                        <div className="footer--Div">
                            <div className="footer--small">BEST TRAVEL WEBSITE THEME</div>
                            <div className="footer--small">COPYRIGHTS RESERVED - ISRATECH 2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer