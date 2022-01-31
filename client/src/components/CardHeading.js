import React from 'react';
import './CardHeading.css';
import vector3 from '../images/Vector3.png';
const CardHeading = (props) => {
  let size = props.currentSize;
  return (
    <div className='full-card'>
      <div className='diaper-ct'>{size.count}</div>
      <h2>
        {size.heading} Diapers <br />
        on hand
      </h2>
      <img src={vector3} alt='vector3' className='img-absolute' />
    </div>
  );
};

export default CardHeading;
