import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LogoHeading from '../components/LogoHeading';
import queryString from 'query-string';
import { UserContext } from '../context/UserContext';

const SetNewPassword = () => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validResetLink, setValidResetLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let params = queryString.parse(window.location.search);

  useEffect(() => {
    validateAccount();
  }, []);

  const validateAccount = async () => {
    const body = {
      email: params.email,
      GUID: params.guid,
    };

    let url = `/api/activate`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.message) {
        setLoading(false);
        setValidResetLink(false);
        setError(data.message);
        return;
      }

      setValidResetLink(true);
      setLoading(false);

      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    let body = {
      email: params.email,
      password: password,
      user_id: user._id,
    };

    try {
      const res = await fetch('/api/users/newpass', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log('data', data);
      if (data.message) {
        setLoading(false);
        setValidResetLink(false);
        setError(data.message);
        return;
      }
      setError('');
      setLoading(false);
      setValidResetLink(false);
      setPasswordSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className='background-purple'>
      <LogoHeading />
      <section className='block'>
        <h1 className='reset-heading'>Password Reset</h1>
        {loading && (
          <>
            <h2 className='reset-heading'>Verifying Account... Please wait</h2>
            <div style={{ marginTop: '55px' }}>
              <NavLink to='/'>
                <button className='btn btn-lt'>Back to Sign In</button>
              </NavLink>
            </div>
          </>
        )}
        {!loading && !passwordSuccess && validResetLink && (
          <>
            <p className='reset-description'>Enter in a new password.</p>
            <form onSubmit={handleSubmit}>
              <div className='input-password'>
                <input
                  className='input'
                  type={passwordShown ? 'text' : 'password'}
                  placeholder='New Password'
                  onChange={(event) => {
                    setError('');
                    setPassword(event.target.value);
                  }}
                  autoComplete='off'
                />
                <span className='show'>
                  <a onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown ? 'Hide' : 'Show'}
                  </a>
                </span>
              </div>
              <div className='input-password'>
                <input
                  className='input'
                  type={passwordShown2 ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  onChange={(event) => {
                    setError('');
                    setConfirmPassword(event.target.value);
                  }}
                  autoComplete='off'
                />
                <span className='show'>
                  <a onClick={() => setPasswordShown2(!passwordShown2)}>
                    {passwordShown2 ? 'Hide' : 'Show'}
                  </a>
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
        {!loading && passwordSuccess && (
          <>
            <h1 className='reset-heading' style={{ marginTop: '0' }}>
              was successful.
            </h1>

            <div className='splash-buttons' style={{ marginTop: '30px' }}>
              <NavLink to='/'>
                <button className='btn btn-primary'>Back to Sign In</button>
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
