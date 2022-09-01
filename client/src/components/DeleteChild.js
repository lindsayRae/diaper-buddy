import React, { useState, useContext } from 'react';

import './Inputs.css';

const DeleteChild = ({ user, closeModal, setNewCurrentChild }) => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    const url = `/api/kids/${user._id}`;
    let sizeData = JSON.parse(sessionStorage.getItem('sizeData'));

    let body = {
      kid_id: user.currentChild,
      id0: sizeData[0]._id,
      id1: sizeData[1]._id,
      id2: sizeData[2]._id,
      id3: sizeData[3]._id,
      id4: sizeData[4]._id,
    };

    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };
      const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: headers,
      });
      const data = await res.json();
      console.log(data);

      if (data.message) {
        setError(data.message);
        return false;
      }
      setNewCurrentChild(data, closeModal);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Are you sure you want to delete {localStorage.getItem('babyName')}?
      </h1>
      <div>
        <button className='btn btn-lt' onClick={handleSubmit}>
          YES
        </button>
        <button
          className='btn btn-danger'
          onClick={closeModal}
          style={{ marginTop: '20px' }}
        >
          NO, CANCEL
        </button>
      </div>
      {error && (
        <p style={{ color: '#d9534f', padding: '0 20px', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default DeleteChild;
