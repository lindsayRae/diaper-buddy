import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoHeading from '../components/LogoHeading';

const SetNewPassword = () => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validResetLink, setValidResetLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  return (
    <div className='background-purple'>
      <LogoHeading />
      <section className='block'>
        <h1 className='reset-heading'>Password Reset</h1>
        {!loading && (
          <>
            <p className='reset-description'>Enter in a new password.</p>
            <form>
              <div className='input-password'>
                <input
                  className='input'
                  type='password'
                  placeholder='New Password'
                  onChange={(event) => {
                    setError('');
                    setPassword(event.target.value);
                  }}
                />
                <span className='show'>
                  <a>Show</a>
                </span>
              </div>
              <div className='input-password'>
                <input
                  className='input'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={(event) => {
                    setError('');
                    setConfirmPassword(event.target.value);
                  }}
                />
                <span className='show'>
                  <a>Show</a>
                </span>
              </div>
              <button type='submit' className='btn btn-lt'>
                Set Password
              </button>
            </form>
            <p className='forgot'>
              <NavLink to='/'>Back to Sign In</NavLink>
            </p>
          </>
        )}
        {loading && (
          <>
            <h1 className='reset-heading' style={{ marginTop: '0' }}>
              Was Successful
            </h1>
            <div style={{ marginTop: '55px' }}>
              <NavLink to='/'>
                <button className='btn btn-lt'>Back to Sign In</button>
              </NavLink>
            </div>
          </>
        )}
        {error && (
          <p style={{ color: '#F94687', textAlign: 'center' }}>{error}</p>
        )}
      </section>
    </div>
  );
};

export default SetNewPassword;
