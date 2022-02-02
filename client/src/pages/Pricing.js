import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import vector4 from '../images/Vector4.png';

const Pricing = () => {
  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <div>Roman's Diapers</div>
          <h1>Pricing</h1>
        </div>
      </section>
      <section className='section'>
        <div className='full-card'>
          <div className='diaper-ct'>3</div>
          <h2>days before you run out of diapers</h2>
          <img src={vector4} alt='vector4' className='img-absolute' />
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Pricing;
