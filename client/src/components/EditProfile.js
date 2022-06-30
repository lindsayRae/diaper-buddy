import React, { useState } from 'react';
import { MdOutlineInventory } from 'react-icons/md';
import { GrMail } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import { MdBadge } from 'react-icons/md';
import { HiOutlineKey } from 'react-icons/hi';
import './Inputs.css';
const EditProfile = ({ userData, closeModal, setUser }) => {
  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.firstName);
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = userData._id;
    let body;
    if (password.length > 0) {
      body = {
        email: email,
        firstName: name,
        password: password,
      };
    } else {
      body = {
        email: email,
        firstName: name,
      };
    }

    try {
      const res = await fetch(`/api/users/update/${user_id}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      setUser(data);
      localStorage.setItem('userData', JSON.stringify(data));
      closeModal();
      return data;
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Profile</h1>
      <div className='input-line-container'>
        <GrMail size={24} className='edit-count-icon' />
        <input
          type='email'
          className='input-line'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
        />
      </div>
      <div className='input-line-container'>
        <FaUser size={24} className='edit-count-icon' />
        <input
          type='text'
          className='input-line profile-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
        />
      </div>

      <div className='input-line-container'>
        <HiOutlineKey size={24} className='edit-count-icon' />
        <input
          type='password'
          className='input-line'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
          placeholder='New Password'
        />
      </div>
      {error && (
        <p style={{ color: '#d9534f', padding: '0 20px', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default EditProfile;
