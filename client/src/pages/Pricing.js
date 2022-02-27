import React, { useState } from 'react';

import vector4 from '../images/Vector4.png';
import SwipePrices from '../components/Swipe_Prices';
import Logout from '../components/Logout';
import Navbar from '../components/Nav/Navbar';

import {
  Swiper,
  SwiperSlide,
} from '../../node_modules/swiper/react/swiper-react';
import '../../node_modules/swiper/swiper-bundle.min.css';
import './Pricing.css';
import huggies from '../images/huggies.png';
import pampers from '../images/favicon_Pampers_teal.svg';
import up from '../images/Up.png';
import parents from '../images/PCFlogo.png';
import costco from '../images/Costco.png';

const Pricing = () => {
  const [currentSize, setCurrentSize] = useState('nb');

  const priceData = [
    {
      brand: 'Huggies',
      logo: `${huggies}`,
      storeName: 'Target',
      storeLink: 'https://www.target.com/',
      totalPrice: '$50.80',
      count: '148',
      unitPrice: 0.34,
    },
    {
      brand: 'Pampers',
      logo: `${pampers}`,
      storeName: 'Walmart',
      storeLink: 'https://www.walmart.com/',
      totalPrice: '$51.00',
      count: '148',
      unitPrice: 0.35,
    },
    {
      brand: 'Up & Up',
      logo: `${up}`,
      storeName: 'Target',
      storeLink: 'https://www.target.com/',
      totalPrice: '$14.99',
      count: '124',
      unitPrice: 0.12,
    },
    {
      brand: "Parent's Choice",
      logo: `${parents}`,
      storeName: 'Walmart',
      storeLink: 'https://www.walmart.com/',
      totalPrice: '$4.38',
      count: '42',
      unitPrice: 0.1,
    },
    {
      brand: 'Kirkland',
      logo: `${costco}`,
      storeName: 'Costco',
      storeLink:
        'https://www.costco.com/kirkland-signature-diapers-sizes-3-6.product.100766695.html',
      totalPrice: '$42.99',
      count: '222',
      unitPrice: 0.19,
    },
  ];
  const sortedData = priceData.sort((a, b) =>
    a.unitPrice > b.unitPrice ? 1 : -1
  );

  const fetchNewPricing = (size) => {
    console.log(size);
  };
  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <div className='logout-container'>
            <div>Roman's Diapers</div>
            <Logout />
          </div>
          <h1>Pricing</h1>
        </div>
      </section>
      <section className='section'>
        <div className='full-card'>
          <div className='card-count-text'>
            <div className='diaper-ct'>3</div>
            <h2 className=''>Days before you run out of diapers</h2>
          </div>

          <img src={vector4} alt='vector4' className='img-absolute' />
        </div>
      </section>
      <section className='section'>
        <div className='lowest-heading-container'>
          <h2>Lowest Prices</h2>
          <select>
            <option>Newborn</option>
            <option>Size 1</option>
            <option>Size 2</option>
            <option>Size 3</option>
            <option>Size 4</option>
          </select>
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={'auto'}
          centeredSlides={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {sortedData.map((item) => {
            return (
              <SwiperSlide key={item.brand} className='price-container'>
                <SwipePrices item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className='buy-btn-container'>
          <button className='btn btn-blue'>Buy Lowest Price Diaper</button>
          <button className='btn btn-green'>
            Buy *Huggies at Lowest Price
          </button>
        </div>
      </section>
      <Navbar />
    </div>
  );
};

export default Pricing;
