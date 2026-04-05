import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    telNum: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    username: '',
    email: '',
    telNum: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.telNum.trim()) {
      errors.telNum = 'Telephone number is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        telNum: formData.telNum,
        password: formData.password,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/index.php`,
        userData
      );
      if (res.data.success) {
        setMessage(res.data.success);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(res.data.error);
      }
    }
  };
  return (
    <div className='register-page'>
      <div className='register-container'>
        <div className='register'>
          <div className='text'>Sign Up</div>
          <div className='underline'></div>
          <div className='inputs'>
            {message && <p className='message'>{message}</p>}
            <div className='input'>
              <i
                classname='register-icons'
                class='fa-regular fa-user'
              ></i>
              <input
                type='text'
                placeholder='Full Name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              <span className='error'>{formErrors.name}</span>
            </div>
            <div className='input'>
              <i
                className='register-icons'
                class='fa-solid fa-user'
              ></i>{' '}
              <input
                type='text'
                placeholder='Username'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
              <span className='error'>{formErrors.username}</span>
            </div>
            <div className='input'>
              <i
                className='register-icons'
                class='fa-solid fa-envelope'
              ></i>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className='error'>{formErrors.email}</span>
            </div>
            <div className='input'>
              <i
                className='register-icons'
                class='fa-solid fa-phone'
              ></i>
              <input
                type='tel'
                placeholder='Contact Number'
                name='telNum'
                value={formData.telNum}
                onChange={handleInputChange}
              />
              <span className='error'>{formErrors.telNum}</span>
            </div>
            <div className='input'>
              <i
                className='register-icons'
                class='fa-solid fa-lock'
              ></i>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className='error'>{formErrors.password}</span>
            </div>
            <div className='input'>
              <i
                className='register-icons'
                class='fa-solid fa-lock'
              ></i>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span className='error'>{formErrors.confirmPassword}</span>
            </div>
          </div>
          <div
            className='submit-container'
            onClick={handleRegistration}
          >
            <Link
              to='/register'
              className='link'
            >
              <div className='submit'>Sign up</div>
            </Link>
            <Link
              to='/login'
              className='link'
            >
              <div className='submit'>Login</div>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
