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
  const { user, setUser } = useContext(UserContext);
  //const [childData, setChildData] = useState(currentChildData);
  const [viewableSize, setViewableSize] = useState();
  const [displayCount, setDisplayCount] = useState(0);
  const [error, setError] = useState('');
  const userID = user.user._id;
  const sliderRef = useRef();

  useEffect(async () => {
    console.log('useEffect ran in SwipeSize component');
    let data = await getKidData();

    // if (data.length === 1) {
    console.log(data);
    setViewableSize(data[0].currentSize);
    console.log(viewableSize);
    sliderRef.current.swiper.slideTo(data[0].currentSize);
    // }
  }, []);

  const getKidData = async () => {
    try {
      const url = `/api/kids/${userID}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': user.jwt,
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

  const currentInventory = (inventory, newSize) => {
    console.log(inventory);
    // console.log(viewableSize);
    // let obj = inventory.filter((x) => x.size == newSize);
    // //console.log(obj);
    // let count = obj[0].purchased - obj[0].used;
    // //  console.log(count);
    // setDisplayCount(count);
  };

  const updateDiaperTitleCard = (size) => {
    console.log('***', size);
    // let currentObj = sizeTitles.find((x) => x.size === size);

    setViewableSize(size);

    // currentInventory(childData.inventory, currentObj.size);
  };

  const addDiaper = () => {
    // POST request
    //setChildData(data)
  };

  const removeDiaper = () => {
    // POST request
    //setChildData(data)
  };

  return (
    <>
      <section className='section'>
        <div className='full-card'>
          <div className='card-count-text'>
            <div className='diaper-ct'>{displayCount}</div>
            <h2>Size {viewableSize} diapers on hand</h2>
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
            console.log(swiper);
            updateDiaperTitleCard(swiper.realIndex);
          }}
          // onSwiper={(swiper) => {
          //   console.log(swiper);
          //   updateDiaperTitleCard(viewableSize);
          // }}
          // onTransitionEnd={(swiper) => console.log(swiper)}
          // onSliderFirstMove={(swiper) => {
          //   console.log(swiper);
          //   updateDiaperTitleCard(swiper.realIndex);
          // }}
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
        <CountForm />
      </section>
    </>
  );
}

export default SwipeSize;
