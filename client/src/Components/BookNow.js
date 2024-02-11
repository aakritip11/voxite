import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';

function BookNow(props) {
    const { id } = useParams();

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const tour = props.Data.find((item) => item.id === parseInt(id));

    const navigate = useNavigate();
    const [duration, setDuration] = useState('1N 2D'); // Default duration
    const [person, setPerson] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState(null);

    const handleDurationChange = (selectedDuration) => {
        setDuration(selectedDuration);
    };

    const handlePersonChange = (e) => {
        setPerson(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (duration === "" || person === ""){
            setErrorMessage("Please fill all the details.")
            return;
        }
        fetch("http://localhost:3001/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                tourId: id,
                tourName: tour.destTitle,
                location: tour.location,
                duration,
                numberOfPersons: parseInt(person),
                fees: tour.fees
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("booking failed");
            }
        })
        .then((data) => {
            console.log(data, "bookingStatus");
            if(data.status === "ok") {
                navigate(`/confirmbook/${id}/${duration}/${person}`);
            }
            else {
                throw new Error("Booking status not OK");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Something went wrong during booking");
        });
    };
    
    return(
        <div className="booknow">
            <h1 data-aos="fade-up" className="about--homeTitle">
                "Embrace the Adventure: Unforgettable Journeys Await"
                <br></br>
                <br></br>
                Book Now
            </h1>
            
            <div className="booknow--Div">
                <div className="booknow--container">
                    <div className="booknow--details">
                        <div className="booknow--firstpart">
                            <form onSubmit={handleSubmit}>
                                <h2 className="booknow--detailsdestTitle">Tour Name: {tour.destTitle}</h2>
                                <h2 className="booknow--detailsdestTitle">Location: {tour.location}</h2>
                                
                                <div className="form-group">
                                    <label htmlFor="name">Duration</label>
                                    <div className="radio-buttons">
                                        <input
                                            type="radio"
                                            id="1N 2D"
                                            name="duration"
                                            value="1N 2D"
                                            checked={duration === '1N 2D'}
                                            onChange={() => handleDurationChange('1N 2D')}
                                        />
                                        <label htmlFor="1N 2D">1N 2D</label>

                                        <input
                                            type="radio"
                                            id="2N 3D"
                                            name="duration"
                                            value="2N 3D"
                                            checked={duration === '2N 3D'}
                                            onChange={() => handleDurationChange('2N 3D')}
                                        />
                                        <label htmlFor="2N 3D">2N 3D</label>

                                        <input
                                            type="radio"
                                            id="3N 4D"
                                            name="duration"
                                            value="3N 4D"
                                            checked={duration === '3N 4D'}
                                            onChange={() => handleDurationChange('3N 4D')}
                                        />
                                        <label htmlFor="3N 4D">3N 4D</label>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="person">No. of Persons</label>
                                    <input
                                        type="person"
                                        id="person"
                                        placeholder="Enter no. of persons"
                                        value={person}
                                        onChange={handlePersonChange}
                                    />
                                </div>
                                
                                <h2 className="booknow--detailsdestTitle">Tour Fees: {tour.fees}</h2>
                                <br/>
                                {errorMessage && <p className="error">{errorMessage}</p>}
                                
                                <button type="submit" className="account--btn">Book Now</button>
                            </form>
                            <div className="booknow--detailsimgSrc">
                                <img src={tour.imgSrc} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookNow;
