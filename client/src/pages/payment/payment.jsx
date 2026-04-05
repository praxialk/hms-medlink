import React, { useState } from 'react';
import './payment.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import Navbar from '../../components/navbar/navbar';

function PaymentPage() {
  const navigate = useNavigate();
  const { user_id } = useAuth();

  const [message, setMessage] = useState('');
  const [paymentData, setPaymentData] = useState({
    email: '',
    date: '',
    amount: '',
    expiryDate: '',
    cvv: '',
    cardNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber' && !/^[0-9]*$/.test(value)) {
      return;
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email: paymentData.email,
      amount: paymentData.amount,
      date: paymentData.date,
      user_id: user_id,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment.php?user_id=${user_id}`,
        requestData
      );

      if (res.data.success) {
        setMessage('Payment successful!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage(res.data.error || 'Payment failed.');
      }
    } catch (error) {
      setMessage(error.message || 'Payment failed.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='payment-page'>
        <div className='payment-card'>
          <div className='payment-image'>
            <img
              src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80'
              alt='Payment Checkout'
            />
          </div>
          <div className='payment-form'>
            <span className='payment-message'>{message}</span>

            <form
              onSubmit={handleSubmit}
              className='payment-details'
            >
              <h1>CheckOut</h1>
              <h2>Payment Information</h2>
              <label>Email</label>
              <input
                type='text'
                className='payment-input'
                name='email'
                required
                value={paymentData.email}
                onChange={handleInputChange}
              />
              <label>Amount</label>
              <input
                type='number'
                className='payment-input'
                name='amount'
                required
                value={paymentData.amount}
                onChange={handleInputChange}
              />
              <label>Transaction Date</label>
              <input
                type='date'
                className='payment-input'
                name='date'
                required
                value={paymentData.date}
                onChange={handleInputChange}
              />
              <label>Card Number</label>
              <input
                type='text'
                className='payment-input'
                name='cardNumber'
                required
                value={paymentData.cardNumber}
                onChange={handleInputChange}
              />
              <div className='payment-exp-cvv'>
                <label>Expiry Date</label>
                <input
                  type='date'
                  className='payment-input'
                  name='expiryDate'
                  required
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                />
                <label>CVV</label>
                <input
                  type='password'
                  className='payment-input'
                  name='cvv'
                  required
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type='submit'
                className='payment-button'
              >
                CheckOut
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
