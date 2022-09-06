import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// Pages
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Activate from './components/SignIn/Activate';
import Reactivated from './components/SignIn/Reactivated';
import StartPassReset from './pages/StartPassReset';
import SetNewPass from './pages/SetNewPassword';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/activate' element={<Activate />} />
          <Route path='/reactivate' element={<Reactivated />} />
          <Route path='/startpassreset' element={<StartPassReset />} />
          <Route path='/pass-reset' element={<SetNewPass />} />

          <Route path='/home' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
