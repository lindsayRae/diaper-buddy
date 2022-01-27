import React, { useState, useContext } from 'react';
import '../components/Inputs.css';
const SignInForm = ({ history }) => {
  return (
    <div className='block' style={{ paddingTop: '0' }}>
      <form>
        <input className='input' placeholder='Email' />
        <div className='input-password'>
          <input className='input' placeholder='Password' />
          <span className='show'>
            <a>Show</a>
          </span>
        </div>
        <button className='btn btn-lt'>Sign In</button>
      </form>
      <p className='forgot'>
        <a>Forgot Password</a>
      </p>
    </div>
  );
};

export default SignInForm;
