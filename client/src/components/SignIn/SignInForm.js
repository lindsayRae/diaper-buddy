import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../components/Inputs.css';
import './SignIn.css';

const SignInForm = ({ history }) => {
  return (
    <div className='block' style={{ paddingTop: '0' }}>
      <form>
        <input className='input' placeholder='Email' />
        <div className='input-password'>
          <input className='input' placeholder='Password' />
          {/* <span className='show'>
            <a>Show</a>
          </span> */}
        </div>
        <NavLink to='/home'>
          <button className='btn btn-lt'>Sign In</button>
        </NavLink>
      </form>
      <p className='forgot'>
        <NavLink to='/passwordreset'>Forgot Password</NavLink>
      </p>
    </div>
  );
};

export default SignInForm;
