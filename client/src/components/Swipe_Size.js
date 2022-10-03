import React, { useState, useEffect, useContext, useRef } from 'react';

import { UserContext } from '../context/UserContext';
import HistoryList from '../components/HistoryList';
import HistoryGraph from '../components/HistoryGraph';
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
import Toast from '../components/Toast/Toast';
import { CSSTransition } from 'react-transition-group';

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
  const [sizeId, setSizeId] = useState();
  const [slideChange, setSlideChange] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);

  const [error, setError] = useState();
  const [addAmt, setAddAmt] = useState(0);
  const [historyContent, setHistoryContent] = useState('List');
  const [historyText, setHistoryText] = useState('Graph');
  const [historyData, setHistoryData] = useState('');
  const [lowAlertAmount, setLowAlertAmount] = useState();
  const [lowAlertSent, setLowAlertSent] = useState(undefined);

  const [list, setList] = useState([]);
  const [inProp, setInProp] = useState(false);
  let toastProperties = null;
  const showToast = (type, description) => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: list.length + 1,
          description: 'Saved',
          backgroundColor: '#5cb85c',
        };
        break;
      case 'sent':
        toastProperties = {
          id: list.length + 1,
          description: 'Low alert has been emailed to you.',
          backgroundColor: '#5cb85c',
        };
        break;
      case 'info':
        toastProperties = {
          id: list.length + 1,
          description: description,
          backgroundColor: '#5bc0de',
        };
        break;
      case 'danger':
        toastProperties = {
          id: list.length + 1,
          description: 'This is a error',
          backgroundColor: '#d9534f',
        };
        break;
      default:
        toastProperties = [];
    }

    setList([...list, toastProperties]);
  };
  const userID = user._id;
  const sliderRef = useRef();
  //console.log(user);
  const updateLowAlert = async (status) => {
    let body = {
      kid_id: user.currentChild,
      alertStatus: status,
      firstName: user.firstName,
      email: user.email,
      lowAlertAmount: lowAlertAmount,
    };
    try {
      const url = `/api/kids/alertStatus/${user._id}`;

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
      console.log('/alertStatus/', data);
      if (data.message) {
        console.error(data.message);
        setError(data.message);
        return;
      }
      if (data.emailed) {
        showToast('sent');
      }
      setLowAlertSent(status);
    } catch (error) {
      console.error(error);
    }
  };
  const checkLowAlertStatus = (onHand) => {
    if (lowAlertSent === undefined || lowAlertAmount == 0) {
      return;
    } else if (!lowAlertSent && onHand <= lowAlertAmount) {
      console.log('** send low alert email, then updateLowAlert');
      // send lowAlertEmail -> set
      updateLowAlert(true); // -> show toast email sent
    } else if (lowAlertSent && onHand > lowAlertAmount) {
      updateLowAlert(false);
    } else {
      console.log('no update needed...');
    }
  };
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
      setViewableSize(useableSize);
    } else {
      useableSize = viewableSize;
    }
    let currentData = inventoryData.find((x) => x.size == useableSize);
    setSizeId(currentData._id);
    setCurrentSizeData(currentData);
    await setDisplayCount(currentData.onHand);

    checkLowAlertStatus(currentData.onHand);
    if (!slideChange) {
      sliderRef.current.swiper.slideTo(currentSize);
    }
    updateUsedHistory(currentData._id);

    setTimeout(() => {
      setInProp(false);
    }, 1000);
  };
  useEffect(async () => {
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
        console.error(data.message);
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
        console.error(data.message);
        setError(data.message);
        return;
      }
      setLowAlertAmount(data.lowAlert);
      setLowAlertSent(data.lowAlertSent);
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
    updateUsedHistory(currentData._id);
    setSizeId(currentData._id);
  };

  const transformUsedDataStructure = (data) => {
    const counts = data.reduce((partialCounts, datum) => {
      if (partialCounts[datum.entryDate] === undefined) {
        partialCounts[datum.entryDate] = datum.count;
      } else {
        partialCounts[datum.entryDate] += datum.count;
      }

      return partialCounts;
    }, {});

    const newData = Object.entries(counts).map((entry) => {
      return {
        entryDate: entry[0],
        count: entry[1],
      };
    });

    setHistoryData(newData);
  };

  const updateUsedHistory = async (size_id) => {
    try {
      const url = `/api/used/${size_id}`;
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
      setError('');

      transformUsedDataStructure(data.used);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const addDiaper = async (e) => {
    e.preventDefault();

    if (addAmt == 0) {
      setError('Please enter amount you would like to add.');
      return;
    }
    setError('');
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
        console.error(data.message);
        setError(data.message);
        return;
      }

      setAddAmt(0);
      loadTitleCard();
      setInProp(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const fmtTodayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  };
  const decrementInventoryOnHand = async () => {
    let body = {
      kid_id: user.currentChild,
      size: viewableSize,
    };

    try {
      const url = `/api/inventory/decOnHandOne`;

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
        console.error(data.message);
        setError(data.message);
        return;
      }
      loadTitleCard();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const incrementUsedRecords = async (size_id) => {
    let body = {
      entryDate: fmtTodayDate(),
    };

    try {
      const url = `/api/used/add/${size_id}`;

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
        console.error(data.message);
        setError(data.message);
        return;
      }

      return data;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const removeDiaper = async (e) => {
    e.preventDefault();

    let sizeData = JSON.parse(sessionStorage.getItem('sizeData'));
    let currSize = sizeData.find((el) => el.size == viewableSize);
    await incrementUsedRecords(currSize._id);
    await decrementInventoryOnHand(currSize._id);
    setInProp(true);
  };
  const toggle = (e) => {
    let currentText = e.target.innerText;
    if (currentText === 'Graph') {
      setHistoryText('List');
      setHistoryContent('Graph');
    } else {
      setHistoryText('Graph');
      setHistoryContent('List');
    }
  };
  return (
    <>
      <Toast toastList={list} position='top-left' setList={setList} />
      <section className='section'>
        <div className='full-card'>
          <div className='card-count-text'>
            <CSSTransition in={inProp} timeout={2500} classNames='my-node'>
              <div className='diaper-ct'>{displayCount}</div>
            </CSSTransition>

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

          <button className='btn btn-danger' onClick={removeDiaper}>
            Remove
          </button>
        </form>
      </section>
      <section className='section'>
        <div className='history-title'>
          <h2>Diaper History</h2>
          <button className='btn-link' onClick={toggle}>
            {historyText}
          </button>
        </div>
        {historyContent === 'List' && (
          <HistoryList
            history={historyData}
            sizeId={sizeId}
            kidId={user.currentChild}
            loadTitleCard={loadTitleCard}
            decrementInventoryOnHand={decrementInventoryOnHand}
          />
        )}
        {historyContent === 'Graph' && (
          <HistoryGraph history={historyData} sizeId={sizeId} />
        )}
      </section>
      {error && (
        <p style={{ color: '#d9534f', padding: '0 20px', textAlign: 'center' }}>
          {error}
        </p>
      )}
      <div style={{ height: '90px' }}></div>
    </>
  );
}

export default SwipeSize;
