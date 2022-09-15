import React, { useState, useEffect, useContext, useRef } from 'react';

import vector4 from '../images/Vector4.png';
import SwipePrices from '../components/Swipe_Prices';
import Logout from '../components/Logout';
import Navbar from '../components/Nav/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

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

const sizeList = [
  { value: 'Newborn', label: 'Newborn' },
  { value: 'Size 1', label: 'Size 1' },
  { value: 'Size 2', label: 'Size 2' },
  { value: 'Size 3', label: 'Size 3' },
  { value: 'Size 4', label: 'Size 4' },
];
const Pricing = () => {
  const [sizeOption, setSizeOption] = useState({});
  const { user, setUser } = useContext(UserContext);
  const [kidName, setKidName] = useState('');
  const [days, setDays] = useState('');
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [brandPreference, setBrandPreference] = useState();
  const [slideChange, setSlideChange] = useState(false);
  const [error, setError] = useState();
  const sliderRef = useRef();
  const isAuthenticated = localStorage.getItem('userData');

  let navigate = useNavigate();

  const customStyles = {
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: '1.4rem',
      border: 'none',
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    getKidData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  // const sortedData = priceData.sort((a, b) =>
  //   a.unitPrice > b.unitPrice ? 1 : -1
  // );

  const fetchNewPricing = (size) => {
    console.log(size);
  };

  const getKidData = async () => {
    try {
      const url = `/api/kids/${user._id}/${user.currentChild}`;
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };

      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await res.json();

      let brandIndex;
      switch (data.brandPreference) {
        case 'Huggies':
          brandIndex = 0;
          break;
        case 'Pampers':
          brandIndex = 1;
          break;
        case 'Up & Up':
          brandIndex = 2;
          break;
        case "Parent's Choice":
          brandIndex = 3;
          break;
        case 'Kirkland':
          brandIndex = 4;
          break;
      }

      if (data.message) {
        console.log(data);
        setError(data.message);
        return;
      }
      setKidName(data.firstName);
      setSizeOption({
        label: data.currentSize,
        value: data.currentSize,
      });
      setCurrentBrandIndex(brandIndex);
      setBrandPreference(data.brandPreference);
      setRemainingDisplay(data.currentSize);

      if (!slideChange) {
        sliderRef.current.swiper.slideTo(brandIndex);
      }

      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const getInventoryData = async () => {
    try {
      const url = `/api/inventory/${user.currentChild}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };

      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await res.json();

      if (data.message) {
        setError(data.message);
        return;
      }
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const setRemainingDisplay = async (currSize) => {
    let data = await getInventoryData();
    let avgUsage = 10;
    if (currSize === 'Newborn') {
      currSize = 0;
    } else {
      currSize = currSize.slice(-1);
    }
    let onHand = data.find((x) => x.size == currSize).onHand;
    let daysRemaining = onHand / avgUsage;
    setDays(Math.floor(daysRemaining));
  };
  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <div className='logout-container'>
            <div>{kidName}'s Diapers</div>
            <Logout user={user} setUser={setUser} />
          </div>
          <h1>Pricing</h1>
        </div>
      </section>
      <section className='section'>
        <div className='full-card'>
          <div className='card-count-text'>
            <div className='diaper-ct'>{days}</div>
            <h2 className=''>
              {days === 1 ? 'Day' : 'Days'} before you run out of{' '}
              {sizeOption ? `${sizeOption.label} ` : ''}
              diapers
            </h2>
          </div>

          <img src={vector4} alt='vector4' className='img-absolute' />
        </div>
      </section>
      <section className='section'>
        <div className='lowest-heading-container'>
          <h2>Lowest Prices</h2>
          <Select
            styles={customStyles}
            menuPortalTarget={document.body}
            menuPosition={'fixed'}
            options={sizeList}
            value={sizeOption}
          />
        </div>
        <Swiper
          ref={sliderRef}
          spaceBetween={0}
          initialSlide={0}
          slidesPerView={'auto'}
          centeredSlides={true}
          onSlideChange={(swiper) => {
            //  console.log('slide change', swiper);
            setCurrentBrandIndex();
          }}
          //onSwiper={(swiper) => console.log(swiper)}
          onSliderFirstMove={(swiper) => setSlideChange(true)}
        >
          {priceData.map((item) => {
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
            Buy {brandPreference} at Lowest Price
          </button>
        </div>
      </section>
      <Navbar />
    </div>
  );
};

export default Pricing;
