import React, { useState } from 'react';

import Navbar from '../components/Nav/Navbar';

const Settings = () => {
  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <h1>Settings</h1>
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Settings;
