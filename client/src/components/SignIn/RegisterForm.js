import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../components/Inputs.css';
import './SignIn.css';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  //const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName) {
      setError('You must provide a First Name');
      return;
      // } else if (!lastName) {
      //   setError('You must provide a Last Name');
      //   return;
    } else if (!email) {
      setError('You must provide an email');
      return;
    } else if (!validateEmail(email)) {
      setError('You must provide an valid email');
      return;
    } else if (!password) {
      setError('You must provide a password');
      return;
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    } else if (!confirmPassword) {
      setError('You must confirm your password.');
      return;
    } else if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      } else {
        setUser(data);
        setEmailSent(true);
        localStorage.setItem('userData', JSON.stringify(data));
      }
    } catch (err) {
      setError('Something went wrong: ', err);
    }
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  return (
    <div className='block' style={{ paddingTop: '0' }}>
      {!emailSent && (
        <form onSubmit={handleSubmit}>
          <input
            className='input'
            type='text'
            placeholder='First Name'
            onChange={(event) => {
              setError('');
              setFirstName(event.target.value);
            }}
          />
          {/* <input
            className='input'
            type='text'
            placeholder='Last Name'
            onChange={(event) => {
              setError('');
              setLastName(event.target.value);
            }}
          /> */}
          <input
            className='input'
            type='email'
            placeholder='Email'
            onChange={(event) => {
              setError('');
              setEmail(event.target.value);
            }}
          />
          <div className='input-password'>
            <input
              className='input'
              type={passwordShown ? 'text' : 'password'}
              placeholder='Password'
              onChange={(event) => {
                setError('');
                setPassword(event.target.value);
              }}
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
            />
            <span className='show'>
              <a onClick={() => setPasswordShown2(!passwordShown2)}>
                {passwordShown2 ? 'Hide' : 'Show'}
              </a>
            </span>
          </div>
          {error && (
            <p
              style={{ color: '#F94687', marginTop: '0', textAlign: 'center' }}
            >
              {error}
            </p>
          )}
          <div className='terms'>
            By tapping 'Sign Up' button you accept terms and privacy conditions.
          </div>
          <button className='btn btn-lt' type='submit'>
            Sign Up
          </button>
        </form>
      )}
      {emailSent && (
        <div className='sent-container'>
          <h1 className=''>Registration email sent.</h1>
          <p className='center-text'>
            Please click the link in your email to finish registration.
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
