import React from 'react';

import LogoHeading from '../components/LogoHeading';
import SignInNav from '../components/SignIn/SignInNav';
import RegisterForm from '../components/SignIn/RegisterForm';

const Register = ({ history }) => {
  console.log(history);
  return (
    <div className='background-purple'>
      <LogoHeading />
      <SignInNav />
      <RegisterForm />
    </div>
  );
};

export default Register;
