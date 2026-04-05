import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import Slider from '../../components/slider/slider';
import './homepage.css';
const Homepage = () => {
  return (
    <div>
      <Navbar />

      <Slider />

      <Footer />
    </div>
  );
};

export default Homepage;
