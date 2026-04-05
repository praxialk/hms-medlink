import React from 'react';
import doctorsData from './data.js';
import './doctor.css';
import Navbar from '../../components/navbar/navbar.jsx';
import Footer from '../../components/footer/footer.jsx';

function DoctorsPage() {
  return (
    <div className='doctors-container'>
      <Navbar />
      <h1 className='doc-title'>Doctors</h1>
      <div className='doctor-list'>
        {doctorsData.map((doctor) => (
          <div
            className='doctor-card'
            key={doctor.id}
          >
            <div className='doctor-image'>
              <img
                src={doctor.img}
                alt='Doctor'
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if fallback also fails
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&color=fff&size=512`;
                }}
              />
            </div>
            <div className='doctor-details'>
              <h2 className='doc-name'>{doctor.name}</h2>
              <p>Specialty: {doctor.specialty}</p>
              <p>Experience: {doctor.experience}</p>
              <p>{doctor.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DoctorsPage;
