import React, { useState } from 'react';
import { MdOutlineInventory } from 'react-icons/md';
import { GrMail } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import { MdBadge } from 'react-icons/md';
import { HiOutlineKey } from 'react-icons/hi';
import './Inputs.css';
const EditProfile = ({ modalData, closeModal }) => {
  const [email, setEmail] = useState('lbarnett712@gmail.com');
  const [name, setName] = useState('Lindsay Aiello');
  const [title, setTitle] = useState('Mom');
  const [password, setPassword] = useState('1234567');

  return (
    <form>
      <h1>Edit Profile</h1>
      <div className='input-line-container'>
        <GrMail size={24} className='edit-count-icon' />
        <input
          type='email'
          className='input-line'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='input-line-container'>
        <FaUser size={24} className='edit-count-icon' />
        <input
          type='text'
          className='input-line'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='input-line-container'>
        <MdBadge size={24} className='edit-count-icon' />
        <input
          type='text'
          className='input-line'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='input-line-container'>
        <HiOutlineKey size={24} className='edit-count-icon' />
        <input
          type='password'
          className='input-line'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default EditProfile;
