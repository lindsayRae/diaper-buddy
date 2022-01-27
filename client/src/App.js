import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// Pages
import SignIn from './pages/SignIn';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
