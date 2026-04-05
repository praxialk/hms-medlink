import React, { useState } from 'react';
import hospitalsData from './hospitals.json'; // Import the JSON data
import './map.css'; // Import CSS file for styling
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const NearbyHospitals = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [emergency, setEmergency] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [error, setError] = useState('');
  const { isLoggedIn } = useAuth();

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleEmergencyChange = (event) => {
    setEmergency(event.target.value);
  };

  const handleSearch = () => {
    if (!location || !emergency) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!isValidDistrict(location)) {
      setError('Please enter a valid Sri Lankan district.');
      return;
    }

    setNearbyHospitals([]);

    // Filter hospitals based on the district containing the location
    const nearby = hospitalsData.hospitals.filter((hospital) =>
      hospital.district.toLowerCase().includes(location.toLowerCase())
    );
    setNearbyHospitals(nearby);
    setError('');
    if (nearby.length === 0) {
      setNearbyHospitals([]);
      setError(`Cannot find any hospitals related to ${location}.`);
      return;
    }
  };

  const isValidDistrict = (district) => {
    const sriLankanDistricts = [
      'ampara',
      'anuradhapura',
      'badulla',
      'batticaloa',
      'colombo',
      'galle',
      'gampaha',
      'hambantota',
      'jaffna',
      'kalutara',
      'kandy',
      'kegalle',
      'kilinochchi',
      'kurunegala',
      'mannar',
      'matale',
      'matara',
      'moneragala',
      'mullaitivu',
      'nuwaraeliya',
      'polonnaruwa',
      'puttalam',
      'ratnapura',
      'trincomalee',
      'vavuniya',
    ];

    return sriLankanDistricts.includes(district.toLowerCase());
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='search-container'>
          <div className='input-container'>
            <label htmlFor='district'>District:</label>
            <input
              type='text'
              id='district'
              value={location}
              onChange={handleLocationChange}
              placeholder='Enter district'
            />
          </div>
          <div className='input-container'>
            <label htmlFor='emergency'>Emergency:</label>
            <input
              type='text'
              id='emergency'
              value={emergency}
              onChange={handleEmergencyChange}
              placeholder='Enter emergency type'
            />
          </div>
        </div>
        <button
          onClick={isLoggedIn ? handleSearch : () => navigate('/login')}
          className='but-container'
        >
          Search
        </button>

        {error && <p className='error-message'>{error}</p>}
        <div className='hospitals-container'>
          {nearbyHospitals.map((hospital, index) => (
            <div
              key={index}
              className='hospital-box'
            >
              <h3>{hospital.name}</h3>
              <p className='hospital-name'> {hospital.address}</p>
              <p className='hospital-name'> {hospital.email}</p>
              <p className='hospital-name'> {hospital.contact_no}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='footer-con'>
        <Footer />
      </div>
    </div>
  );
};

export default NearbyHospitals;
