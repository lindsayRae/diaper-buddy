import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaDollarSign, FaUser, FaCog } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import './Navbar.css';

const tabs = [
  { route: '/home', icon: FaHome, label: 'Home' },
  { route: '/pricing', icon: FaDollarSign, label: 'Pricing' },
  { route: '/profile', icon: FaUser, label: 'Profile' },
  { route: '/settings', icon: FaCog, label: 'Settings' },
];
const Navbar = () => {
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
        <NavLink to='/pricing'>
          <div className='nav-links'>
            <BsCurrencyDollar size={28} />
            <div>Pricing</div>
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
    </nav>
  );
};

export default Navbar;
