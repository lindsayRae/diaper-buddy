import React, { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import queryString from 'query-string';
import LogoHeading from '../LogoHeading';

const Activate = () => {
  const [error, setError] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let params = queryString.parse(window.location.search);

  useEffect(() => {
    validateAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateAccount = async () => {
    const body = {
      email: params.email,
      GUID: params.guid,
    };

    let url = `/api/activate`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        //! REMEMBER headers are required
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      console.log(data);

      if (data.message) {
        setError(data.message);
        setIsActivated(false);
        return;
      }
      setUser(data);
      setIsActivated(true);
      localStorage.setItem('userData', JSON.stringify(data));
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsActivated(false);
    }
  };

  return (
    <div className='background-purple'>
      <LogoHeading />
      <div className='sent-container'>
        <h1 className='center-text'>
          {!isActivated ? 'Activating...' : 'Activated'}
        </h1>

        {isActivated && (
          <>
            <p className=''>
              Thank you for validating your email at: {params.email}
            </p>
            <div className='block'>
              <NavLink to='/'>
                <button className='btn btn-lt'>Login</button>
              </NavLink>
            </div>
          </>
        )}
        {error && <p className='error-msg'>{error}</p>}
      </div>
    </div>
  );
};

export default Activate;
