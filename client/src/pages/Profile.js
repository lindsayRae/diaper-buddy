import React, { useState } from 'react';

import Navbar from '../components/Navbar';

const Profile = () => {
  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <h1>Profile</h1>
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Profile;
