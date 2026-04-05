import React, { useState } from 'react';
import { sliderItems } from './data';
import { Link } from 'react-router-dom';
import './slider.css';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : sliderItems.length - 1
      );
    } else {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  return (
    <div className='SliderContainer'>
      <div className='Arrow left' onClick={() => handleClick('left')}>
        <i className='fa-solid fa-arrow-left'></i>
      </div>
      <div
        className='Wrapper'
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item, index) => (
          <div
            key={item.id}
            className={`Slide ${index === slideIndex ? 'active' : ''}`}
          >
            <div className='SlideContent'>
              <div className='InfoContainer'>
                <h1 className='TitleText'>{item.title}</h1>
                <p className='Desc'>{item.desc}</p>
                {item.button && (
                  <Link to={item.route}>
                    <button className='Button'>{item.button}</button>
                  </Link>
                )}
              </div>
              <div className='ImgContainer'>
                <img className='Image' alt='' src={item.img} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='Arrow right' onClick={() => handleClick('right')}>
        <i className='fa-solid fa-arrow-right'></i>
      </div>
    </div>
  );
};

export default Slider;
