import React, { useState, useContext } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../components/Inputs.css';
import './SignIn.css';

const SignInForm = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('You must provide an email and password.');
      return;
    }
    try {
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setError(data.message);
        return;
      }

      setUser(data);
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      setError(`Something went wrong: ${err}`);
    }
  };
  return (
    <div className='block' style={{ paddingTop: '0' }}>
      <form onSubmit={handleSubmit}>
        <input
          className='input'
          placeholder='Email'
          type='text'
          name='email'
          value={email}
          onChange={(event) => {
            setError('');
            setEmail(event.target.value);
          }}
          autoComplete='off'
        />
        <div className='input-password'>
          <input
            className='input'
            placeholder='Password'
            type='password'
            name='password'
            value={password}
            onChange={(event) => {
              setError('');
              setPassword(event.target.value);
            }}
            autoComplete='off'
          />
        </div>
        {error && <p className='error-msg'>{error}</p>}
        <button className='btn btn-lt'>Sign In</button>
      </form>
      <p className='forgot'>
        <NavLink to='/startpassreset'>Forgot Password</NavLink>
      </p>
    </div>
  );
};

export default SignInForm;
