import React from 'react';
import { Link } from 'react-router-dom';
import Tours from './Tours';
import Home from './Home';

const HomeWithTours = (props) => {
  // Assuming Data is an array of tour items
  const limitedData = props.Data.slice(0, props.initialTourCount);

  return (
    <>
      <Home />
      <Tours Data={limitedData} />
      {props.Data.length > props.initialTourCount && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/tours" style={{ color: 'hsl(201, 33%, 16%)', fontWeight:'600', textDecoration: 'none', fontSize: '1rem' }}>Explore More</Link>

        </div>
      )}
    </>
  );
};

export default HomeWithTours;
