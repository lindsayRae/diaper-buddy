import React, { useState, useContext, useEffect } from 'react';

import SwipeSize from '../components/Swipe_Size';
import Navbar from '../components/Nav/Navbar';

import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import babyNB from '../images/babyNB.png';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');

  const [babyName, setBabyName] = useState('');
  const [babyImg, setBabyImg] = useState(babyNB);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    buildUI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userID = user._id;
  const buildUI = async () => {
    const kids = await getKidData();

    let currentID = user.currentChild;
    let currentChildData = kids.find((x) => x._id === currentID);
    console.log(currentChildData);
    setBabyName(currentChildData.firstName);
    setBabyImg(currentChildData.imageUrl);
    // setBabyData(currentChildData);
    localStorage.setItem('babyName', currentChildData.firstName);
  };
  const getKidData = async () => {
    try {
      const url = `/api/kids/${userID}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };

      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      }
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <div style={{ display: 'flex' }}>
            <img
              src={babyImg}
              height='70'
              width='70'
              style={{ borderRadius: '10px' }}
            ></img>
            <div style={{ marginLeft: '4rem' }}>
              <div>{babyName}'s Diapers</div>
              <h1>Home</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <SwipeSize />
      </section>
      <Navbar setUser={setUser} />
    </div>
  );
};

export default Home;
