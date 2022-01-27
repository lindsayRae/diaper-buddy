import React from 'react';
import { NavLink } from 'react-router-dom';
import vector2 from '../images/Vector2.png';

const SignInNav = () => {
  return (
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
  );
};

export default SignInNav;
