import React from 'react';

import './Swipe_Prices.css';

function SwipePrices(props) {
  let item = props.item;

  return (
    <div className='price-swipe-card'>
      <img src={item.logo} />
      <h2>
        <a href={item.link} target='blank'>
          {item.storeName}
        </a>
      </h2>
      <div>
        {item.totalPrice} - {item.count} pk
      </div>
      <div className='unit-price'>${item.unitPrice.toFixed(2)} per diaper</div>
    </div>
  );
}

export default SwipePrices;
