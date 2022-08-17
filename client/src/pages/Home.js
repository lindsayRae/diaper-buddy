import React, { useState, useContext, useEffect } from 'react';

import SwipeSize from '../components/Swipe_Size';
import Navbar from '../components/Nav/Navbar';
import Logout from '../components/Logout';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');

  const [babyName, setBabyName] = useState('');
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

    setBabyName(currentChildData.firstName);
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
          <div className='logout-container'>
            <div>{babyName}'s Diapers</div>
            <Logout user={user} setUser={setUser} />
          </div>
          <h1>Home</h1>
        </div>
      </section>
      <section>
        <SwipeSize />
      </section>
      <Navbar />
    </div>
  );
};

export default Home;
