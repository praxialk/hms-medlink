import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import Chat from '../ChatRoom/ChatRoom';
import { useAuth } from '../../AuthContext/AuthContext';
import './DoctorInterface.css';

const DoctorPanel = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const { doctorId, setDoctorId } = useAuth();

  useEffect(() => {
    const storedDoctorId = localStorage.getItem('userId');
    console.log('Stored Doctor ID:', storedDoctorId);
    if (storedDoctorId) {
      setDoctorId(storedDoctorId);
    }
  }, [setDoctorId]);

  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/emergency.php?doc_Id=${doctorId}`
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response data');
        }

        setEmergencyRequests(response.data);
      } catch (error) {
        console.error('Error:', error.message);
        setEmergencyRequests([]);
      }
    };

    if (doctorId) {
      fetchEmergencyRequests();
    }
  }, [doctorId]);
  return (
    <div>
      <Navbar />
      <div className='doctor-panel-container'>
        <h2>Emergency Requests</h2>
        <ul className='emergency-list'>
          {emergencyRequests.map((request, index) => (
            <li
              key={index}
              className='emergency-item'
            >
              <h3>Condition: {request.condition_patient}</h3>
              <p>Location: {request.location}</p>
              <p>Urgency: {request.urgency}</p>
              <p>Doctor: {request.selected_doctor}</p>
              <p>Room id to join: {request.room_id}</p>
              <p>Doctor Requested By: {request.patient_name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='chat-container'>
        <Chat />
      </div>
    </div>
  );
};

export default DoctorPanel;
