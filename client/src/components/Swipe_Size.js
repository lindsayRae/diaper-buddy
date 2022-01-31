import React, { useState } from 'react';

import CardHeading from '../components/CardHeading';
import CountForm from '../components/CountForm';
import './Swipe_Size.css';
import babyNB from '../images/babyNB.png';
import baby1 from '../images/baby1.png';
import baby2 from '../images/baby2.png';
import baby3 from '../images/baby3.png';
import baby4 from '../images/baby4.png';

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
    index: 0,
    count: 20,
  },
  {
    heading: 'Size One',
    weight: '8 - 14 lbs',
    img: baby1,
    index: 1,
    count: 100,
  },
  {
    heading: 'Size Two',
    weight: '12 - 18 lbs',
    img: baby2,
    index: 2,
    count: 0,
  },
  {
    heading: 'Size Three',
    weight: '16 -28 lbs',
    img: baby3,
    index: 3,
    count: 250,
  },
  {
    heading: 'Size Four',
    weight: '22 - 37 lbs',
    img: baby4,
    index: 4,
    count: 20,
  },
];

function SwipeSize() {
  const updateDiaperSelection = (index) => {
    let currentObj = sizeTitles.find((x) => x.index === index);
    console.log(currentObj);
    setCurrentSize(currentObj);
  };
  const [currentSize, setCurrentSize] = useState({
    heading: 'Newborn',
    weight: 'less than 10 lbs',
    img: babyNB,
    index: 0,
    count: 20,
  });

  return (
    <>
      <section className='section'>
        <CardHeading currentSize={currentSize} />
      </section>
      <section className='section'>
        <Swiper
          spaceBetween={20}
          slidesPerView={'auto'}
          centeredSlides={false}
          onSlideChange={(swiper) => console.log(swiper)}
          onSwiper={(swiper) => console.log(swiper)}
          onTransitionEnd={(swiper) => updateDiaperSelection(swiper.realIndex)}
        >
          {sizeTitles.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className='size-swipe-container'>
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
