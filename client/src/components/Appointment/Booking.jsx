import React, { useState } from 'react';
import './Booking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const { user_id } = useAuth();

  const [AppointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    appointmentDate: '',
    doctor: '',
    hospital: '',
    time: '',
    message: '',
  });

  const [AppointmentErrors, setAppointmentErrors] = useState({
    name: '',
    email: '',
    contactNumber: '',
    appointmentDate: '',
    doctor: '',
    hospital: '',
    time: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setAppointmentData({
      ...AppointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!AppointmentData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!AppointmentData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!AppointmentData.contactNumber.trim()) {
      errors.contactNumber = 'Contact Number is required';
    }
    if (!AppointmentData.appointmentDate.trim()) {
      errors.appointmentDate = 'Appointment Date is required';
    }
    if (!AppointmentData.doctor.trim()) {
      errors.doctor = 'Doctor is required';
    }
    if (
      !AppointmentData.hospital.trim() ||
      AppointmentData.hospital === 'Hospital '
    ) {
      errors.hospital = 'Please select a hospital';
    }
    if (!AppointmentData.time.trim()) {
      errors.time = 'Time is required';
    }

    setAppointmentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAppointment = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const requestData = {
        user_id: user_id,
        name: AppointmentData.name,
        email: AppointmentData.email,
        phone: AppointmentData.contactNumber,
        date: AppointmentData.appointmentDate,
        doctor: AppointmentData.doctor,
        hospital: AppointmentData.hospital,
        time: AppointmentData.time,
        message: AppointmentData.message,
      };
      console.log(requestData);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/appointment.php?user_id=${user_id}`,
        requestData
      );

      if (res.data.success) {
        console.log(res.data);
        setMessage('Appointment booked successfully.');
        setTimeout(() => {
          navigate('/User-Dashboard');
        }, 2000);
      } else {
        setMessage(res.data.error);
      }
    }
  };

  return (
    <div className='book-appointment-page'>
      <h1>Book Appointment</h1>
      {message && <p className='message'>{message}</p>}

      <form onSubmit={handleAppointment}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Full Name'
            name='name'
            value={AppointmentData.name}
            onChange={handleInputChange}
          />
          <span className='error'>{AppointmentErrors.name}</span>
        </div>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={AppointmentData.email}
            onChange={handleInputChange}
          />
          <span className='error'>{AppointmentErrors.email}</span>
        </div>

        <div className='form-group'>
          <input
            type='tel'
            placeholder='Contact Number'
            name='contactNumber'
            value={AppointmentData.contactNumber}
            onChange={handleInputChange}
          />
          <span className='error'>{AppointmentErrors.contactNumber}</span>
        </div>

        <div className='form-group'>
          <input
            type='date'
            placeholder='Appointment Date (MM/DD/YYYY)'
            name='appointmentDate'
            value={AppointmentData.appointmentDate}
            onChange={handleInputChange}
          />
          <span className='error'>{AppointmentErrors.appointmentDate}</span>
        </div>

        <div className='form-group'>
          <select
            name='hospital'
            value={AppointmentData.hospital}
            onChange={handleInputChange}
          >
            <option value='Hospital '>Select a hospital</option>
            <option value='Hospital A'>Hospital A</option>
            <option value='Hospital B'>Hospital B</option>
            <option value='Hospital C'>Hospital C</option>
          </select>
          <span className='error'>{AppointmentErrors.hospital}</span>
        </div>

        <div className='form-group'>
          <select
            placeholder='Doctor'
            name='doctor'
            value={AppointmentData.doctor}
            onChange={handleInputChange}
          >
            <option value='doctor'>Select a Doctor</option>
            <option value='Dr. Chaminda Silva - Cardiologist'>
              Dr. Chaminda Silva - Cardiologist
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
          <span className='error'>{AppointmentErrors.doctor}</span>
        </div>

        <div className='form-group'>
          <input
            type='time'
            placeholder='Time'
            name='time'
            value={AppointmentData.time}
            onChange={handleInputChange}
          />
          <span className='error'>{AppointmentErrors.time}</span>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='Your Message'
            name='message'
            value={AppointmentData.message}
            onChange={handleInputChange}
          />
          <span className='error'>{AppointmentErrors.message}</span>
        </div>

        <button type='submit'>Book Appointment</button>
      </form>
      <footer className='booking-footer'>
        <p>&copy; 2023 MedLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookAppointmentPage;
