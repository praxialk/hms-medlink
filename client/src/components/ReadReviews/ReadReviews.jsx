import React, { useCallback, useEffect, useState } from 'react';
import './ReadReviews.css';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

function ReadReviews() {
  const [reviews, setReviews] = useState([]);
  const { isLoggedIn } = useAuth();
  const getReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Ratings.php`
      );
      setReviews(response.data);
      localStorage.setItem('Reviews', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('Reviews'));

    if (storedUsers) {
      setReviews(storedUsers);
      getReviews();
    } else {
      getReviews();
    }
  }, [getReviews]);
  return (
    <div>
      <Navbar />
      <header className='review-header'>
        <div className='container'>
          <div className='containerleft'>
            <h1>Welcome to Med Link: Reviews and Doctor Details</h1>
            <p>
              Med Link is your trusted platform for managing hospital operations
              and patient care. Explore reviews from patients and get details
              about our dedicated team of doctors.
            </p>
            <p>
              We are committed to providing top-notch healthcare services and
              ensuring the well-being of our patients.
            </p>
            {isLoggedIn ? (
              <Link
                className='review-link'
                to='/Review&Feedback'
              >
                <button>Post a Patient Feedback</button>
              </Link>
            ) : (
              <Link
                className='review-link'
                to='/Login'
              >
                <button>Post a Patient Feedback</button>
              </Link>
            )}
          </div>
          <div className='containerright'>
            {(Array.isArray(reviews) ? reviews : []).map((review, index) => (
              <div
                className='review-card'
                key={index}
              >
                <div className='Reviewcontent'>
                  <span>
                    <i className='ri-double-quotes-l'></i>
                  </span>
                  <div className='Reviewdetails'>
                    <h3>{review.doc_name} ----</h3>
                    <p>{review.feedback}</p>
                    <h4>- {review.email}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default ReadReviews;
