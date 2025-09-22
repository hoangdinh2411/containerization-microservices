import React from 'react';
import airbean from '../assets/graphics/airbean-landing.svg';
import landingLeft from '../assets/graphics/intro-graphic-left.svg';
import landingRight from '../assets/graphics/intro-graphic-right.svg';
import {Link} from 'react-router-dom';

function Landing() {
  return (
    <div className='landing__container'>
      <img src={landingLeft} className="landingImage left" alt='left' />
      <Link
        to='/menu'
        className='airbean-link'
        title='Click to order cafe'
      >
        <img
          className='airbean'
          src={airbean}
          alt='airbean'
        />
      </Link>
      <img src={landingRight} className="landingImage right"  alt='right' />
    </div>
  );
}

export default Landing;
