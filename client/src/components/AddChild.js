import React, { useState } from 'react';

import { FaBaby } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';

import './Inputs.css';
const AddChild = ({ modalData, closeModal, user }) => {
  const [baby, setBaby] = useState('');
  const [brand, setBrand] = useState('Brand Preference');
  const [currentSize, setCurrentSize] = useState('Current Size');
  const [lowAlert, setLowAlert] = useState('Low Alert');
  const [error, setError] = useState('');
  const handleAddSubmit = async (e) => {
    console.log('submitting form...');
    e.preventDefault();
    if (!baby) {
      return setError('You must add a baby name.');
    }
    if (brand === 'Brand Preference') {
      return setError('You must select a brand preference.');
    }
    if (currentSize === 'Current Size') {
      return setError('You must select the current size.');
    }
    if (lowAlert === 'Low Alert') {
      return setError('You must select a low alert.');
    }

    let body = {
      user_id: user.user._id,
      firstName: baby,
      brandPreference: brand,
      currentSize: currentSize,
      lowAlert: lowAlert,
    };
    console.log(body);
    try {
      const res = await fetch(`/api/kids`, {
        method: 'POST',
        headers: {
          'x-auth-token': user.jwt,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleAddSubmit}>
      <h1>Add Child</h1>
      <div className='input-line-container'>
        <FaBaby
          size={20}
          className='edit-count-icon'
          style={{ marginTop: '8px' }}
        />
        <input
          type='text'
          className='input-line input-name2'
          value={baby}
          onChange={(e) => setBaby(e.target.value)}
          placeholder='Baby Name'
        />
      </div>
      <div className='input-line-container'>
        <AiOutlineShoppingCart
          size={24}
          className='edit-count-icon'
          style={{ marginTop: '6px' }}
        />
        <select
          className='settings-select add'
          onChange={(e) => setBrand(e.target.value)}
        >
          <option>Brand Preference</option>
          <option>Huggies</option>
          <option>Kirkland</option>
          <option>Pampers</option>
          <option>Parent's Choice</option>
          <option>Up & Up</option>
        </select>
      </div>
      <div className='input-line-container'>
        <TiSortNumerically
          size={24}
          className='edit-count-icon'
          style={{ marginTop: '4px' }}
        />
        <select
          className='settings-select add'
          onChange={(e) => {
            setCurrentSize(e.target.value);
            //setCurrentSizeLabel(e.target.options[e.target.selectedIndex].text);
          }}
        >
          <option>Current Size</option>
          <option>Newborn</option>
          <option>Size 1</option>
          <option>Size 2</option>
          <option>Size 3</option>
          <option>Size 4</option>
        </select>
      </div>

      <div className='input-line-container'>
        <AiOutlineBell
          size={24}
          className='edit-count-icon'
          style={{ marginTop: '5px' }}
        />
        <select
          className='settings-select add'
          onChange={(e) => setLowAlert(e.target.value)}
        >
          <option>Low Alert</option>
          <option>None</option>
          <option>Less than 10</option>
          <option>Less than 20</option>
          <option>Less than 50</option>
          <option>Less than 100</option>
        </select>
      </div>
      {error && (
        <p style={{ textAlign: 'center', color: '#f94687' }}>{error}</p>
      )}
      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default AddChild;
