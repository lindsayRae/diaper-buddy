import React, { useState, useContext } from 'react';

import './Inputs.css';

const Reactivate1 = ({ password, email, closeModal }) => {
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(`/api/auth/reactivate`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!emailSent && (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            This account has been deactivated. Would you like to reactivate it?
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
            <p
              style={{
                color: '#d9534f',
                padding: '0 20px',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}
        </div>
      )}
      {emailSent && (
        <div className='sent-container '>
          <h1 className='text-dark'>Reactivation email sent.</h1>
          <p className='center-text text-dark'>
            Please click the link in your email to finish reactivating your
            account.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reactivate1;
