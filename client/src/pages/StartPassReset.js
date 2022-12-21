import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import LogoHeading from '../components/LogoHeading';

const StartReset = () => {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      email: email,
    };

    //! Testing for sending email heroku
    let url = `/api/users/reset`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(res);

      if (res.status === 400) {
        setSent(true);
        return;
      }
      const data = await res.json();
      console.log('data', data);
      if (data) {
        setSent(true);
        localStorage.setItem('userData', JSON.stringify(data));
        setError('');
      } else {
        setError(
          'There was an issue sending your email. Please try again later.'
        );
        setSent(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setSent(false);
    }
  };

  return (
    <div className='background-purple'>
      <LogoHeading />
      <section className='block'>
        <h1 className='reset-heading'>Password Reset</h1>
        {!sent && (
          <>
            <p className='reset-description'>
              Enter in your email to start password reset.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                className='input'
                type='text'
                placeholder='Email'
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <button type='submit' className='btn btn-lt'>
                Send Email
              </button>
            </form>
            <p className='forgot'>
              <NavLink to='/'>Back to Sign In</NavLink>
            </p>
          </>
        )}
        {sent && (
          <>
            <p className='reset-description'>
              Please check your email to continue password reset.
            </p>
            <p className='back-signin'>
              <NavLink to='/'>Back to Sign In</NavLink>
            </p>
          </>
        )}
        {error && (
          <p style={{ color: '#F94687', textAlign: 'center' }}>{error}</p>
        )}
      </section>
    </div>
  );
};

export default StartReset;
