import React, { useState } from 'react';

import { FaBaby } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';
import { IoIosAddCircleOutline } from 'react-icons/io';

import './Inputs.css';
const AddChild = ({ modalData, closeModal }) => {
  const [baby, setBaby] = useState('Roman');
  const [brand, setBrand] = useState('Roman');
  const [currentSize, setCurrentSize] = useState('Roman');
  const [addSize, setAddSize] = useState('Roman');
  const [lowAlert, setLowAlert] = useState('Roman');
  return (
    <form>
      <h1>Add Child</h1>
      <div className='input-line-container'>
        <FaBaby
          size={20}
          className='edit-count-icon'
          style={{ marginTop: '8px' }}
        />
        <input
          type='text'
          className='input-line'
          value={baby}
          onChange={(e) => setBaby(e.target.value)}
        />
      </div>
      <div className='input-line-container'>
        <AiOutlineShoppingCart
          size={24}
          className='edit-count-icon'
          style={{ marginTop: '6px' }}
        />
        <select className='settings-select add'>
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
        <select className='settings-select add'>
          <option>Current Size</option>
          <option>Newborn</option>
          <option>Size 1</option>
          <option>Size 2</option>
          <option>Size 3</option>
          <option>Size 4</option>
        </select>
      </div>
      <div className='input-line-container'>
        <IoIosAddCircleOutline
          size={24}
          className='edit-count-icon'
          style={{ marginTop: '5px' }}
        />
        <select className='settings-select add'>
          <option>Add Size</option>
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
        <select className='settings-select add'>
          <option>Low Alert</option>
          <option>Less than 10</option>
          <option>Less than 20</option>
          <option>Less than 50</option>
          <option>Less than 100</option>
        </select>
      </div>
      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default AddChild;
