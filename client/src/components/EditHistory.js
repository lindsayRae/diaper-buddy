import React, { useState } from 'react';
import { MdOutlineInventory } from 'react-icons/md';
import './Inputs.css';
const EditHistory = ({
  modalData,
  sizeId,
  closeModal,
  loadTitleCard,
  kidId,
  decrementOnHand,
}) => {
  const [startingCount, setStartingCount] = useState(modalData.count);
  const [newCount, setNewCount] = useState(modalData.count);
  const [date] = useState(modalData.entryDate);

  //?? decreaseUsedRecord() and addToInventoryRecordOnHand() run together
  const decreaseUsedRecord = async () => {
    let body = {
      date: date,
      newCount: Number(newCount),
    };

    try {
      const url = `/api/used/edit/decrease/${sizeId}`;
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };
      const res = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.message) {
        console.error(data.message);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToInventoryRecordOnHand = async () => {
    let body = {
      sizeId: sizeId,
      addAmt: startingCount - newCount,
    };

    try {
      const url = `/api/inventory/incOnHand/${kidId}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };
      const res = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.message) {
        console.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //?? increaseUsedRecord() and removeFromInventoryRecordOnHand() run together
  const increaseUsedRecord = async () => {
    let body = {
      date: date,
      startingCount: startingCount,
      newCount: Number(newCount),
    };

    try {
      const url = `/api/used/edit/increase/${sizeId}`;
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };
      const res = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.message) {
        console.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromInventoryRecordOnHand = async () => {
    let body = {
      sizeId: sizeId,
      removeAmt: newCount - startingCount,
    };

    try {
      const url = `/api/inventory/decOnHand/${kidId}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };
      const res = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.message) {
        console.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCount = async (e) => {
    e.preventDefault();
    if (newCount === startingCount) {
      console.log('need to change value');
      return;
    }
    //?    5 < 10 -> decreasing the used
    if (newCount < startingCount) {
      await decreaseUsedRecord();
      await addToInventoryRecordOnHand();
      loadTitleCard();
    } else {
      await increaseUsedRecord();
      await removeFromInventoryRecordOnHand();
      loadTitleCard();
    }
    // update used records - size_id
    // ADD x used records for specific date
    // REMOVE x used records for specific date
    // update inventoryRecords - by kid_id then size_id onHand number
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
          value={newCount}
          onChange={(e) => setNewCount(e.target.value)}
        />
      </div>

      <button className='btn btn-lt' onClick={updateCount}>
        Save
      </button>
    </form>
  );
};

export default EditHistory;
