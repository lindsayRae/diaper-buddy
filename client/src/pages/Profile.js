import React, { useState, useContext, useEffect } from 'react';
import Modal from '../components/Modal/Modal';
import EditProfile from '../components/EditProfile';
import Logout from '../components/Logout';
import Navbar from '../components/Nav/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdLogin, MdLogout } from 'react-icons/md';
import './Profile.css';
import dotsH from '../images/horizontalDots.png';
import dotsV from '../images/verticalDots.png';
import { GrMail } from 'react-icons/gr';
import { HiOutlineKey } from 'react-icons/hi';

const Profile = () => {
  const [password, setPassword] = useState('12345678');
  const [modalVisible, setModalVisible] = useState(false);
  const [purchased, setPurchased] = useState(0);
  const [used, setUsed] = useState(0);
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    buildUI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const inventoryData = async () => {
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
    } catch (error) {
      setError(error.message);
    }
  };
  const buildUI = async () => {
    let results = await inventoryData();

    const totalPurchased = results
      .map((item) => item.purchased)
      .reduce((prev, next) => prev + next);

    //? const totalUsed =
    //? setUsed()
    setPurchased(totalPurchased);
  };

  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <div className='logout-container'>
            <div></div>
            <Logout user={user} setUser={setUser} />
          </div>
          <h1>Profile</h1>
        </div>
      </section>
      <section className='section'>
        <div className='profile-heading'>
          <h2 className='profile-name'>{user.firstName}</h2>
          <button className='btn-link' onClick={() => setModalVisible(true)}>
            Edit
          </button>
        </div>
      </section>
      <section className='section'>
        <h3 style={{ fontWeight: '600' }}>
          Diaper Insight for {localStorage.getItem('babyName')}
        </h3>
        <div className='insight-container'>
          <div className='insight-purchased'>
            <div className='insight-count'>{purchased}</div>
            <div className='insight-title'>Total Diapers Purchased</div>
            <img src={dotsH} alt='' className='dots-h' />
            <MdLogin size={50} className='insight-icon' />
          </div>
          <div className='insight-used'>
            <div className='insight-count'>{used}</div>
            <div className='insight-title'>Total Diapers Used</div>
            <img src={dotsV} alt='' className='dots-v' />
            <MdLogout size={50} className='insight-icon' />
          </div>
        </div>
      </section>
      <section className='section'>
        <h3 style={{ fontWeight: '600' }}>Username & Password</h3>
        <div className='contact-container'>
          <div className='profile-icons'>
            <GrMail size={24} />
          </div>
          <div className='profile-text-container'>
            <p>Email Address</p>
            <div>{user.email}</div>
          </div>
        </div>
        <div className='contact-container'>
          <div className='profile-icons'>
            <HiOutlineKey size={24} />
          </div>
          <div className='profile-text-container'>
            <p>Password</p>
            <div style={{ display: 'flex' }}>
              <input
                readOnly
                type={'password'}
                className='profile-pass'
                value={password}
              />
            </div>
          </div>
        </div>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        <EditProfile
          userData={user}
          setUser={setUser}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
      <Navbar />
    </div>
  );
};

export default Profile;
