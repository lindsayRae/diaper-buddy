import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';

import './Navbar.css';

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    navigate('/');
  };
  return (
    <nav className='nav-container'>
      <div className='nav-item'>
        <NavLink to='/home'>
          <div className='nav-links'>
            <AiOutlineHome size={28} />
            <div>Home</div>
          </div>
        </NavLink>
      </div>
      <div className='nav-item'>
        <NavLink to='/profile'>
          <div className='nav-links'>
            <AiOutlineUser size={28} />
            <div>Profile</div>
          </div>
        </NavLink>
      </div>
      <div className='nav-item'>
        <NavLink to='/settings'>
          <div className='nav-links'>
            <AiOutlineSetting size={28} />
            <div>Settings</div>
          </div>
        </NavLink>
      </div>
      <div className='nav-item'>
        <div className='nav-links'>
          <MdOutlineLogout size={28} onClick={handleLogout} />
          <div>Log Out</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
