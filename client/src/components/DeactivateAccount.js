import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inputs.css';

const DeactivateAccount = ({ user, closeModal, setUser }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `/api/users/activateStatus`;
    const body = {
      id: user._id,
      activateStatus: false,
    };

    try {
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
        setError(data.message);
        return false;
      }
      if (data) {
        localStorage.clear();
        navigate('/');
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Are you sure you want to deactivate your account?
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

export default DeactivateAccount;
