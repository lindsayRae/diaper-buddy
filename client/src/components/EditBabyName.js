import React, { useState } from 'react';

import { FaBaby } from 'react-icons/fa';

import './Inputs.css';
const EditBabyName = ({ modalData, closeModal }) => {
  const [name, setName] = useState('Roman');
  return (
    <form>
      <h1>Edit Baby Name</h1>
      <div className='input-line-container'>
        <FaBaby size={24} className='edit-count-icon' />
        <input
          type='text'
          className='input-line'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default EditBabyName;
