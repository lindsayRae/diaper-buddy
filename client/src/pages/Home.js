import React, { useState, useContext, useEffect } from 'react';

import SwipeSize from '../components/Swipe_Size';
import HistoryList from '../components/HistoryList';
import HistoryGraph from '../components/HistoryGraph';
import Navbar from '../components/Nav/Navbar';
import Logout from '../components/Logout';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  const [historyContent, setHistoryContent] = useState('List');
  const [historyText, setHistoryText] = useState('Graph');
  const [babyName, setBabyName] = useState('');
  const [babyData, setBabyData] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    console.log('uesEffect ran in Home component');
    buildUI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userID = user.user._id;
  const buildUI = async () => {
    const kids = await getKidData();

    let currentID = user.user.currentChild;
    let currentChildData = kids.find((x) => x._id === currentID);
    console.log(currentChildData);
    setBabyName(currentChildData.firstName);
    setBabyData(currentChildData);
  };
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
  //buildUI();

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
      <section className='section'>
        <div className='history-title'>
          <h2>Diaper History</h2>
          <button className='btn-link' onClick={toggle}>
            {historyText}
          </button>
        </div>
        {historyContent === 'List' && <HistoryList />}
        {historyContent === 'Graph' && (
          <HistoryGraph history={babyData.diaperHistory} />
        )}
      </section>
      <div style={{ height: '90px' }}></div>
      <Navbar />
    </div>
  );
};

export default Home;
