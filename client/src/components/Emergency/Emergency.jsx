import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import doctorsData from './data';
import './Emergency.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const EmergencyRequestForm = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    condition: '',
    location: '',
    urgency: '',
    selectedDoctor: '',
    roomId: '',
    patientName: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { condition, location, urgency, selectedDoctor, roomId, patientName } = formData;
    if (!condition.trim() || !location.trim() || !urgency.trim() || !selectedDoctor.trim() || !roomId.trim() || !patientName.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const doctor = doctorsData.find((d) => d.name === selectedDoctor);
      if (!doctor) throw new Error('Selected doctor not found.');
      const requestData = { ...formData, selectedDoctorId: doctor.id };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/emergency.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) throw new Error('Failed to send emergency request');
      setFormData({ condition: '', location: '', urgency: '', selectedDoctor: '', roomId: '', patientName: '' });
      setError('');
      if (isLoggedIn) navigate('/chat');
    } catch (err) {
      setError('Failed to send emergency request. Please try again.');
    }
  };

  const handleRoomIdChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData({ ...formData, roomId: value });
  };

  const urgencyClass =
    formData.urgency === 'High' ? 'urgency-high' :
      formData.urgency === 'Medium' ? 'urgency-medium' :
        formData.urgency === 'Low' ? 'urgency-low' : '';

  return (
    <div className='emergency-page'>
      <Navbar />
      <div className='emergency-hero'>

        {/* Left Panel */}
        <div className='emergency-left'>
          <div className='emergency-badge'>
            <span className='pulse-dot'></span>
            EMERGENCY SERVICES
          </div>
          <h1>Fast. <span>Reliable.</span> Life-Saving.</h1>
          <p>
            Our emergency response team is available 24/7. Submit your request and a dedicated doctor will be assigned immediately.
          </p>
          <div className='emergency-info-cards'>
            <div className='einfo-card'>
              <i className='ri-timer-flash-line'></i>
              <div>
                <strong>Average Response Time</strong>
                <span>Under 5 minutes</span>
              </div>
            </div>
            <div className='einfo-card'>
              <i className='ri-stethoscope-line'></i>
              <div>
                <strong>Expert Doctors On Call</strong>
                <span>Specialists available around the clock</span>
              </div>
            </div>
            <div className='einfo-card'>
              <i className='ri-shield-check-line'></i>
              <div>
                <strong>Secure & Confidential</strong>
                <span>Your data is fully protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className='emergency-right'>
          <div className='emergency-form-card'>
            <h2>Emergency Request Form</h2>
            <p className='form-subtitle'>Fill in the details below and we'll dispatch help immediately.</p>

            {error && (
              <div className='emergency-error'>
                <i className='ri-error-warning-line'></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className='efield'>
                <label><i className='ri-heart-pulse-line'></i>Condition</label>
                <textarea
                  name='condition'
                  value={formData.condition}
                  onChange={handleChange}
                  placeholder="Describe the patient's condition in detail..."
                  required
                />
              </div>

              <div className='form-row'>
                <div className='efield'>
                  <label><i className='ri-map-pin-line'></i>Location</label>
                  <input
                    type='text'
                    name='location'
                    value={formData.location}
                    onChange={handleChange}
                    placeholder='Ward / Room / Floor'
                    required
                  />
                </div>
                <div className='efield'>
                  <label><i className='ri-alarm-warning-line'></i>Urgency Level</label>
                  <select
                    name='urgency'
                    value={formData.urgency}
                    onChange={handleChange}
                    className={urgencyClass}
                    required
                  >
                    <option value=''>Select urgency</option>
                    <option value='High'>🔴 High</option>
                    <option value='Medium'>🟡 Medium</option>
                    <option value='Low'>🟢 Low</option>
                  </select>
                </div>
              </div>

              <div className='efield'>
                <label><i className='ri-user-heart-line'></i>Assign Doctor</label>
                <select
                  name='selectedDoctor'
                  value={formData.selectedDoctor}
                  onChange={handleChange}
                  required
                >
                  <option value=''>Select a doctor</option>
                  {doctorsData.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} — {doctor.experience} experience
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-row'>
                <div className='efield'>
                  <label><i className='ri-hotel-bed-line'></i>Room ID</label>
                  <input
                    type='text'
                    name='roomId'
                    value={formData.roomId}
                    onChange={handleRoomIdChange}
                    placeholder='4-digit room number'
                    required
                  />
                </div>
                <div className='efield'>
                  <label><i className='ri-user-line'></i>Patient Name</label>
                  <input
                    type='text'
                    name='patientName'
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder='Full name'
                    required
                  />
                </div>
              </div>

              <button type='submit' className={`emergency-submit ${!isLoggedIn ? 'login-required' : ''}`}>
                {isLoggedIn ? (
                  <><i className='ri-send-plane-2-line'></i> Submit Emergency Request</>
                ) : (
                  <><i className='ri-login-box-line'></i> Login to Submit Request</>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencyRequestForm;
