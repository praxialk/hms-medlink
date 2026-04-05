import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthContext';
import './login.css';

export const Login = () => {
  const { login, setUsername, setDoctorId, setuserType, setUser_id } =
    useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/login.php`,
        formData
      );

      if (res.data.success) {
        setUsername(res.data.username);
        setMessage('Login successful');
        login();
        setuserType(res.data.userType);
        localStorage.setItem('userType', res.data.userType);

        setUser_id(res.data.user_id);
        localStorage.setItem('userId', res.data.user_id);

        if (res.data.userType === 'doctor') {
          setDoctorId(res.data.user_Id);
          navigate('/doc');
        } else if (res.data.userType === 'patient') {
          navigate('/');
        } else {
          setMessage('Invalid user type');
        }
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='login'>
      <span className='loginTitle'>Login</span>
      <div className='login-underline'></div>

      <p className='loginMessage'>{message}</p>

      <form
        className='loginForm'
        onSubmit={handleLogin}
      >
        <label>Email</label>
        <input
          className='loginInput'
          type='text'
          placeholder='Enter your email...'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          className='loginInput'
          type='password'
          placeholder='Enter your password...'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className='loginButton'>Login</button>
        <div className='loginRegisterButton'>
          <Link
            to='/register'
            className='link'
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
