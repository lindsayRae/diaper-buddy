import React from 'react';

const CountForm = () => {
  return (
    <form>
      <div className='input-add-container'>
        <input type='number' className='input-add' placeholder='0' />
        <button className='btn btn-blue-light'>Add</button>
      </div>

      <button className='btn btn-danger'>Remove</button>
    </form>
  );
};

export default CountForm;
