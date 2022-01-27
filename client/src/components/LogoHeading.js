import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../images/D_Logo.png';
import vector1 from '../images/Vector1.png';
import vector2 from '../images/Vector2.png';

const LogoHeading = () => {
  return (
    <>
      <section className='block logo-container'>
        <img src={logo} alt='Logo' />
        <img src={vector1} alt='vector1' className='vector-right' />
        <div className='overlay'></div>
      </section>
      <section className='block' style={{ paddingBottom: '10px' }}>
        <div className='d-flex landing-links'>
          <NavLink to='/'>
            <span>Sign In</span>
          </NavLink>
          <NavLink to='/register'>
            <span>Register</span>
          </NavLink>
        </div>
        <img src={vector2} alt='vector2' className='vector-left' />
      </section>
    </>
  );
};

export default LogoHeading;
