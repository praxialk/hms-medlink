import React from 'react';
import './Services.css';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
const Services = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navbar />

      <div class='ServiceContainer'>
        <h1 className='heading'>Our Services</h1>
        <div class='row'>
          <div class='services'>
            {isLoggedIn ? (
              <Link
                to='/Appointment'
                className='link'
              >
                <h2 className='title-appo'>Appointments</h2>
                <p className='desc'>To make your appointments click here</p>
              </Link>
            ) : (
              <Link
                to='/Login'
                className='link'
              >
                <h2 className='title-appo'>Appointments</h2>
                <p className='desc'>To make your appointments click here</p>
              </Link>
            )}
          </div>
          <div class='services'>
            {isLoggedIn ? (
              <Link
                to='/Payments'
                className='link'
              >
                <h2 className='title-appo'>Payments</h2>
                <p className='desc'>To make your Payments click here</p>
              </Link>
            ) : (
              <Link
                to='/login'
                className='link'
              >
                <h2 className='title-appo'>Payments</h2>
                <p className='desc'>To make your Payments click here</p>
              </Link>
            )}
          </div>
          <div class='services'>
            {isLoggedIn ? (
              <Link
                to='/Review&Feedback'
                className='link'
              >
                <h2 className='title-appo'>Reviews & Ratings</h2>
                <p className='desc'>To Post/read Reviews click here</p>
              </Link>
            ) : (
              <Link
                to='/Review&Feedback/ReadReviews'
                className='link'
              >
                <h2 className='title-appo'>Reviews & Ratings</h2>
                <p className='desc'>To Post/read Reviews click here</p>
              </Link>
            )}
          </div>
          <div class='services'>
            <Link
              to='/Doctors'
              className='link'
            >
              <h2 className='title-appo'>Doctors</h2>
              <p className='desc'>To find Doctors click here</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
