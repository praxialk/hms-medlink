import React, { useState } from 'react';
import './contact.css';
import Navbar from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [contactErrors, setContactErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleInputChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!contactData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!contactData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!contactData.message.trim()) {
      errors.message = 'Message is required';
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const dataToSend = {
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/contact.php`,
          dataToSend
        );

        if (response.data.success) {
          setSubmissionMessage('Your message has been sent successfully.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setSubmissionMessage('Error: Message could not be sent.');
        }
      } catch (error) {
        setSubmissionMessage('Error: Message could not be sent.');
      }
    }
  };

  return (
    <div className='contact-page'>
      <Navbar />
      <header className='contact-header'>
        <h1>Contact Us</h1>
      </header>
      <main className='contact-main'>
        <section className='contact-info'>
          <h2>Contact Information</h2>
          <p className='contact-para'>
            If you have any questions or need assistance, please don't hesitate
            to get in touch with us.
          </p>
          <ul>
            <li>
              <strong>Address:</strong> MedLink Hospital, 123, Hospital Road,
              Colombo 01000, Sri Lanka
            </li>
            <li>
              <strong>Phone:</strong> +94 11 1234567
            </li>
            <li>
              <strong>Email:</strong> info@medlinkhospital.lk
            </li>
          </ul>
        </section>
        <section className='contact-form'>
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                name='name'
                required
                value={contactData.name}
                onChange={handleInputChange}
              />
              <span className='error'>{contactErrors.name}</span>
            </div>
            <div className='input-group'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                required
                value={contactData.email}
                onChange={handleInputChange}
              />
              <span className='error'>{contactErrors.email}</span>
            </div>
            <div className='input-group'>
              <label htmlFor='message'>Message:</label>
              <textarea
                id='message'
                name='message'
                rows='4'
                required
                value={contactData.message}
                onChange={handleInputChange}
              ></textarea>
              <span className='error'>{contactErrors.message}</span>
            </div>
            <div className='input-group'>
              <button type='submit'>Submit</button>
            </div>
          </form>
          {submissionMessage && (
            <p className='submission-message'>{submissionMessage}</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Contact;
