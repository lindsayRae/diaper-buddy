import React from 'react';

import LogoHeading from '../components/LogoHeading';
import RegisterForm from '../components/RegisterForm';

const Register = ({ history }) => {
  console.log(history);
  return (
    <div className='background-purple'>
      <LogoHeading />
      <RegisterForm />
    </div>
  );
};

export default Register;
