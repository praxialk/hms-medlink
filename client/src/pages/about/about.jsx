import React from 'react';
import Navbar from '../../components/navbar/navbar';
import './about.css';

const About = () => {
  return (
    <div className='about-content'>
      <Navbar />
      <div>
        <header className='about-page'>
          <p className='about-intro'>
            MediLink Emergency Connect and Management System
          </p>
          <h1 className='about-heading'>Your Health, Our Priority</h1>
        </header>
        <section className='about-introduction-section'>
          <div className='about-container'>
            <h1 className='about-title'>About Us</h1>
            <p>
              MedLink is a cutting-edge healthcare platform dedicated to
              providing swift emergency medical assistance by connecting
              patients with doctors online. Our system facilitates real-time
              communication and enables patients to receive urgent medical
              guidance, ensuring timely interventions during critical
              situations..
            </p>
          </div>
        </section>
        <section className='about-mission-section'>
          <div className='about-container'>
            <h1 className='about-title'>Our Mission</h1>
            <p>
              Our mission is to redefine emergency healthcare delivery by
              offering a seamless channel for patients to access immediate
              medical advice and assistance from qualified professionals. We are
              committed to leveraging technology to enhance emergency response
              and save lives, making healthcare more accessible and effective
              for all.
            </p>
          </div>
        </section>
        <section className='about-vision-section'>
          <div className='about-container'>
            <h1 className='about-title'>Our Vision</h1>
            <p>
              At MedLink, we envision a world where everyone has easy access to
              the best healthcare resources. We strive to be a global leader in
              healthcare technology, continually innovating to meet the evolving
              needs of patients and medical professionals.
            </p>
          </div>
        </section>
        <section className='about-purpose-section'>
          <div className='about-container'>
            <h1 className='about-title'>Our Purpose</h1>
            <p>
              Our purpose is to bridge the gap between patients and emergency
              medical services, ensuring swift and effective responses to urgent
              healthcare needs. MedLink aims to be the trusted ally for
              individuals facing medical emergencies, providing reliable
              guidance and support to safeguard their well-being in critical
              moments.
            </p>
          </div>
        </section>
        <footer className='about-content-footer'>
          <div className='about-footer-container'>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://facebook.com/medlink'
              className='about-link'
            >
              <i className='fa fa-facebook-f fa-inverse fa-2x'></i>
            </a>
            &nbsp;
            <a
              target='_blank'
              rel='noreferrer'
              href='https://twitter.com/'
              className='about-link'
            >
              <i className='fa fa-twitter fa-inverse fa-2x'></i>
            </a>
            &nbsp;
            <a
              target='_blank'
              rel='noreferrer'
              href='https://instagram.com/medlink/'
              className='about-link'
            >
              <i className='fa fa-instagram fa-inverse fa-2x'></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
