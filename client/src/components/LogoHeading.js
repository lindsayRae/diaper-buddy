import React from 'react';
import SignInNav from './SignInNav';

import logo from '../images/D_Logo.png';
import vector1 from '../images/Vector1.png';

const LogoHeading = () => {
  return (
    <>
      <section className='block logo-container'>
        <img src={logo} alt='Logo' />
        <img src={vector1} alt='vector1' className='vector-right' />
        <div className='overlay'></div>
      </section>
    </>
  );
};

export default LogoHeading;
