import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Nav/Navbar';

export const Error = () => {
  return (
    <>
      <div className='error-page'>Error: Page not found :(</div>
      <p className='error-back'>
        Go back <NavLink to='/home'>home</NavLink>
      </p>
      <Navbar />
    </>
  );
};

export default Error;
