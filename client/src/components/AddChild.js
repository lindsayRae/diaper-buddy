import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { FaBaby } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';

import './Inputs.css';
const brandList = [
  { value: 'Huggies', label: 'Huggies' },
  { value: 'Kirkland', label: 'Kirkland' },
  { value: 'Pampers', label: 'Pampers' },
  { value: "Parent's Choice", label: "Parent's Choice" },
  { value: 'Up & Up', label: 'Up & Up' },
];
const sizeList = [
  { value: 'Newborn', label: 'Newborn' },
  { value: 'Size 1', label: 'Size 1' },
  { value: 'Size 2', label: 'Size 2' },
  { value: 'Size 3', label: 'Size 3' },
  { value: 'Size 4', label: 'Size 4' },
];
const alertList = [
  { value: '0', label: 'None' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

const AddChild = ({ modalData, closeModal, user, setUser, setPage }) => {
  const [baby, setBaby] = useState('');
  const [brandOption, setBrandOption] = useState();
  const [sizeOption, setSizeOption] = useState();
  const [alertOption, setAlertOption] = useState();
  const [error, setError] = useState('');

  const updateUserData = async (kid_id) => {
    const user_id = user.user._id;
    let body = {
      kidID: kid_id,
    };
    try {
      const res = await fetch(`/api/users/update/${user_id}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': user.jwt,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      user.user.currentChild = data.currentChild;
      setUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
      return data;
    } catch (error) {
      setError(error.message);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!baby) {
      return setError('You must add a baby name.');
    }
    if (!brandOption) {
      return setError('You must select a brand preference.');
    }
    if (!sizeOption) {
      return setError('You must select the current size.');
    }
    if (!alertOption) {
      return setError('You must select a low alert.');
    }

    let body = {
      user_id: user.user._id,
      firstName: baby,
      brandPreference: brandOption.value,
      currentSize: sizeOption.value,
      lowAlert: alertOption.value,
    };

    try {
      const res = await fetch(`/api/kids`, {
        method: 'POST',
        headers: {
          'x-auth-token': user.jwt,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      if (data.status == 400) {
        setError(data.message);
        return;
      }

      let userData = await updateUserData(data._id);

      if (userData) {
        setPage();
        setError('');
        closeModal();
      }
    } catch (error) {
      console.log(error);
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
          className='select-icon'
          style={{ marginTop: '6px' }}
        />
        <Select
          className='settings-select'
          onChange={setBrandOption}
          options={brandList}
          value={brandOption}
          placeholder={'Select Brand Preference'}
        />
      </div>
      <div className='input-line-container'>
        <TiSortNumerically
          size={24}
          className='select-icon'
          style={{ marginTop: '4px' }}
        />
        <Select
          className='settings-select'
          onChange={setSizeOption}
          options={sizeList}
          value={sizeOption}
          placeholder={'Select Current Size'}
        />
      </div>

      <div className='input-line-container'>
        <AiOutlineBell
          size={24}
          className='select-icon'
          style={{ marginTop: '5px' }}
        />
        <Select
          className='settings-select'
          onChange={setAlertOption}
          options={alertList}
          value={alertOption}
          placeholder={'Select Low Alert'}
        />
      </div>
      {error && (
        <p style={{ textAlign: 'center', color: '#f94687' }}>{error}</p>
      )}
      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default AddChild;
