import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// Pages
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import NewPassword from './pages/SetNewPassword';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/passwordreset' element={<PasswordReset />} />

          <Route path='/home' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
