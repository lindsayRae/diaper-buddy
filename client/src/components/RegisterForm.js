import React, { useState, useContext } from 'react';
import '../components/Inputs.css';
const RegisterForm = ({ history }) => {
  return (
    <div className='block' style={{ paddingTop: '0' }}>
      <form>
        <input className='input' type='text' placeholder='Name' />
        <input className='input' type='email' placeholder='Email' />
        <div className='input-password'>
          <input className='input' placeholder='Password' />
          <span className='show'>
            <a>Show</a>
          </span>
        </div>
        <div className='terms'>
          By tapping 'Sign Up' button you accept terms and privacy conditions.
        </div>
        <button className='btn btn-lt'>Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterForm;
