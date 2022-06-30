import React, { useState, useEffect, useContext, useRef } from 'react';

import { UserContext } from '../context/UserContext';
import CardHeading from '../components/CardHeading';
import CountForm from '../components/CountForm';
import './Swipe_Size.css';
import babyPR from '../images/babyPR.png';
import babyNB from '../images/babyNB.png';
import baby1 from '../images/baby1.png';
import baby2 from '../images/baby2.png';
import baby3 from '../images/baby3.png';
import baby4 from '../images/baby4.png';
import './CardHeading.css';
import vector3 from '../images/Vector3.png';

import {
  Swiper,
  SwiperSlide,
} from '../../node_modules/swiper/react/swiper-react';

import '../../node_modules/swiper/swiper-bundle.min.css';

const sizeTitles = [
  {
    heading: 'Newborn',
    weight: 'less than 10 lbs',
    img: babyNB,
    size: 0,
  },
  {
    heading: 'Size One',
    weight: '8 - 14 lbs',
    img: baby1,
    size: 1,
  },
  {
    heading: 'Size Two',
    weight: '12 - 18 lbs',
    img: baby2,
    size: 2,
  },
  {
    heading: 'Size Three',
    weight: '16 -28 lbs',
    img: baby3,
    size: 3,
  },
  {
    heading: 'Size Four',
    weight: '22 - 37 lbs',
    img: baby4,
    size: 4,
  },
];

function SwipeSize() {
  const { user } = useContext(UserContext);
  const [viewableSize, setViewableSize] = useState();
  const [displayCount, setDisplayCount] = useState(0);

  const [totalInventory, setTotalInventory] = useState();
  const [currentSizeData, setCurrentSizeData] = useState();
  const [slideChange, setSlideChange] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);

  const [error, setError] = useState();
  const [addAmt, setAddAmt] = useState(0);
  const userID = user._id;
  const sliderRef = useRef();

  const loadTitleCard = async () => {
    let data = await getKidData();
    let inventoryData = await getInventoryRecord();

    setTotalInventory(inventoryData);
    let currentSize;
    switch (data.currentSize) {
      case 'Newborn':
        currentSize = 0;
        break;
      case 'Size 1':
        currentSize = 1;
        break;
      case 'Size 2':
        currentSize = 2;
        break;
      case 'Size 3':
        currentSize = 3;
        break;
      case 'Size 4':
        currentSize = 4;
        break;
    }

    let useableSize;
    if (!viewableSize) {
      useableSize = currentSize;
    } else {
      useableSize = viewableSize;
    }
    let currentData = inventoryData.find((x) => x.size == useableSize);
    setCurrentSizeData(currentData);
    setDisplayCount(currentData.onHand);
    if (!slideChange) {
      sliderRef.current.swiper.slideTo(currentSize);
    }
  };
  useEffect(async () => {
    console.log('useEffect...');
    loadTitleCard();
  }, []);

  const getInventoryRecord = async () => {
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
  const getKidData = async () => {
    try {
      const url = `/api/kids/${userID}/${user.currentChild}`;
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
        console.log(data);
        setError(data.message);
        return;
      }
      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const updateDiaperTitleCard = (size) => {
    setViewableSize(size);
    let currentData = totalInventory.find((x) => x.size == size);
    setDisplayCount(currentData.onHand);
  };

  const addDiaper = async (e) => {
    e.preventDefault();

    let body = {
      kid_id: user.currentChild,
      purchased: addAmt,
      size: viewableSize,
    };

    try {
      const url = `/api/inventory/purchased`;

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
        return;
      }
      console.log(data);
      setAddAmt(0);
      loadTitleCard();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const removeDiaper = () => {
    // POST request
  };

  return (
    <>
      <section className='section'>
        <div className='full-card'>
          <div className='card-count-text'>
            <div className='diaper-ct'>{displayCount}</div>
            <h2>
              {viewableSize == 0 ? 'Newborn' : `Size ${viewableSize}`} diapers
              on hand.
            </h2>
          </div>
          <img src={vector3} alt='vector3' className='img-absolute' />
        </div>
      </section>
      <section className='section'>
        <Swiper
          ref={sliderRef}
          spaceBetween={30}
          initialSlide={viewableSize}
          slidesPerView={'auto'}
          centeredSlides={false}
          onSlideChange={(swiper) => {
            // runs on page load, and first slide
            setViewableSize(swiper.realIndex);
            updateDiaperTitleCard(swiper.realIndex);
          }}
          //onSwiper={(swiper) => {}
          // onTransitionEnd={(swiper) => console.log(swiper)} // runs on page load and first slide
          onSliderFirstMove={(swiper) => setSlideChange(true)}
        >
          {sizeTitles.map((item, index) => {
            return (
              <SwiperSlide key={index} className='size-container'>
                <div className='size-swipe-card'>
                  <img src={item.img} />
                  <div className='size-swipe-text'>
                    <h2 className='size-heading'>{item.heading}</h2>
                    <div className='size-weight-title'>Average Weight</div>
                    <div className='size-weight'>{item.weight}</div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section className='section'>
        {/* <CountForm /> */}
        <form>
          <div className='input-add-container'>
            <input
              type='number'
              className='input-add'
              placeholder='0'
              value={addAmt}
              onChange={(e) => setAddAmt(e.target.value)}
            />
            <button className='btn btn-blue-light' onClick={addDiaper}>
              Add
            </button>
          </div>

          <button className='btn btn-danger'>Remove</button>
        </form>
      </section>
      {error && (
        <p style={{ color: '#d9534f', padding: '0 20px', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </>
  );
}

export default SwipeSize;
