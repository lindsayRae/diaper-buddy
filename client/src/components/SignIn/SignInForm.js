import React, { useState, useContext } from 'react';

import Modal from '../Modal/Modal';
import Reactivate1 from '../Reactivate1';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../components/Inputs.css';
import vector2 from '../../images/Vector2.png';
import './SignIn.css';

const SignInForm = () => {
  let navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);
  const setSessionSizeData = async (kid_id) => {
    try {
      const res = await fetch(`/api/inventory/${kid_id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      sessionStorage.setItem('sizeData', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
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
      console.log('login data:', data);
      if (data.message === 'This user is deactivated') {
        // show modal
        //
        setModalVisible(true);
        return;
      }
      if (data.message) {
        setError(data.message);
        return;
      }

      setUser(data.user);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('jwt', data.jwt);
      if (data.user.currentChild.length == 0) {
        navigate('/settings');
      } else {
        navigate('/home');
        setSessionSizeData(data.user.currentChild);
      }
    } catch (err) {
      setError(`Something went wrong: ${err}`);
    }
  };
  return (
    <div className='block' style={{ paddingTop: '0' }}>
      {/* <img src={vector2} alt='vector2' className='vector-left' /> */}
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
      {/* <p className='forgot'>
        <NavLink to='#'>Forgot Password & Reactivate Account</NavLink>
      </p> */}
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        <Reactivate1
          password={password}
          email={email}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default SignInForm;
