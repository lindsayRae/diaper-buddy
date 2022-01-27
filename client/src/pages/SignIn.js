import React from 'react';

import LogoHeading from '../components/LogoHeading';
import SignInNav from '../components/SignInNav';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
  return (
    <div className='background-purple'>
      <LogoHeading />
      <SignInNav />
      <SignInForm />
    </div>
  );
};

export default SignIn;
