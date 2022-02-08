import React, { useState } from 'react';
import { MdOutlineInventory } from 'react-icons/md';
import './Inputs.css';
const EditHistory = ({ modalData, closeModal }) => {
  const [count, setCount] = useState(modalData.count);

  const updateCount = (e) => {
    e.preventDefault();
    console.log(count);
    closeModal();
  };
  return (
    <form>
      <h1>{modalData.date}</h1>
      <div className='input-line-container'>
        <MdOutlineInventory size={24} className='edit-count-icon' />
        <input
          type='number'
          className='input-line'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <button className='btn btn-lt' onClick={updateCount}>
        Save
      </button>
    </form>
  );
};

export default EditHistory;
