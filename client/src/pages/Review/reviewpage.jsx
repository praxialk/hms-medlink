import React, { useState } from 'react';
import './reviewpage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

function ReviewForm() {
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    selectedDoctor: '',
    rating: '',
    feedback: '',
  });

  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      name: reviewData.name,
      email: reviewData.email,
      doc_name: reviewData.selectedDoctor,
      rating: reviewData.rating,
      feedback: reviewData.feedback,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/Ratings.php`,
      requestData
    );

    if (res.data.success) {
      setTimeout(() => {
        navigate('/Review&Feedback/ReadReviews');
      }, 2000);
    } else {
      setMessage(res.data.error);
    }
  };
  const handleInputChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='review-page-wrapper'>
      <Navbar />
      <div className='review-content'>
        <script src='https://use.fontawesome.com/a6f0361695.js'></script>
        <h2 id='fh2'>Your Feedback is Valued !!!</h2>

        {message && <span className='message-banner'>{message}</span>}

        <form
          id='feedback'
          onSubmit={handleSubmit}
        >
          <div className='pinfo'>Your personal info</div>

          <div className='form-group'>
            <div className='col-md-4 inputGroupContainer'>
              <div className='input-group'>
                <span className='input-group-addon'>
                  <i className='fa fa-user'></i>
                </span>
                <input
                  className='form-control'
                  type='text'
                  name='name'
                  value={reviewData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className='form-group'>
            <div className='col-md-4 inputGroupContainer'>
              <div className='input-group'>
                <span className='input-group-addon'>
                  <i className='fa fa-envelope'></i>
                </span>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  value={reviewData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className='form-group'>
            <div className='col-md-4 inputGroupContainer'>
              <div className='input-group'>
                <span className='input-group-addon'>
                  <i className='fa fa-envelope'></i>
                </span>
                <select
                  className='form-control'
                  placeholder='Doctor'
                  name='selectedDoctor'
                  value={reviewData.selectedDoctor}
                  onChange={handleInputChange}
                  required
                >
                  <option value='Doctor'>Select a Doctor</option>
                  <option value='Dr. Malik perera - consulting doctor'>
                    Dr. Malik Perera - consulting doctor
                  </option>
                  <option value='Dr. Shanthi Fernando - consulting doctor'>
                    Dr. Shanthi Fernando - consulting doctor
                  </option>
                  <option value='Dr. Nimal Silva - consulting doctor'>
                    Dr. Nimal Silva - consulting doctor
                  </option>
                  <option value='Dr. Anusha Bandara- consulting doctor'>
                    Dr. Anusha Bandara- consulting doctor
                  </option>

                  <option value='Dr. Nadeeka Perera - Pediatrician'>
                    Dr. Nadeeka Perera - Pediatrician
                  </option>
                  <option value='Dr. Rajitha Fernando - Orthopedic Surgeon'>
                    Dr. Rajitha Fernando - Orthopedic Surgeon
                  </option>
                  <option value='Dr. Priyanthi Ranasinghe - Dermatologist'>
                    Dr. Priyanthi Ranasinghe - Dermatologist
                  </option>
                  <option value='Dr. Dinesh Bandara - Cardiologist'>
                    Dr. Dinesh Bandara - Cardiologist
                  </option>
                  <option value='Dr. Sanduni Perera - Pediatrician'>
                    Dr. Sanduni Perera - Pediatrician
                  </option>
                  <option value='Dr. Ranil Jayawardena - Orthopedic Surgeon'>
                    Dr. Ranil Jayawardena - Orthopedic Surgeon
                  </option>
                  <option value='Dr. Dilini Karunaratne - Dermatologist'>
                    Dr. Dilini Karunaratne - Dermatologist
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className='pinfo'>Rate our overall services.</div>

          <div className='form-group'>
            <div className='col-md-4 inputGroupContainer'>
              <div className='input-group'>
                <span className='input-group-addon'>
                  <i className='fa fa-heart'></i>
                </span>
                <select
                  className='form-control'
                  name='rating'
                  value={reviewData.rating}
                  onChange={handleInputChange}
                  required
                >
                  <option value='1star'>Select a Rating</option>
                  <option value='1star'>1</option>
                  <option value='2stars'>2</option>
                  <option value='3stars'>3</option>
                  <option value='4stars'>4</option>
                  <option value='5stars'>5</option>
                </select>
              </div>
            </div>
          </div>

          <div className='pinfo'>Write your feedback.</div>

          <div className='form-group'>
            <div className='col-md-4 inputGroupContainer'>
              <div className='input-group'>
                <span className='input-group-addon'>
                  <i className='fa fa-pencil'></i>
                </span>
                <textarea
                  className='form-control'
                  name='feedback'
                  value={reviewData.feedback}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='reviewsubmit'
          >
            Submit
          </button>
        </form>
        <div className='feedbacks'>
          <Link to='ReadReviews'>Reviews and Feedbacks</Link>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
