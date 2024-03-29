import React, { useState, useContext, useEffect } from 'react';
import Modal from '../components/Modal/Modal';
import EditProfile from '../components/EditProfile';
import Navbar from '../components/Nav/Navbar';
import DeactivateAccount from '../components/DeactivateAccount';
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
  const [isEdit, setIsEdit] = useState(false);
  const [isDeactivateAccount, setIsDeactivateAccount] = useState(false);
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
  const closeModal = () => {
    setModalVisible(false);
    setIsEdit(false);
    setIsDeactivateAccount(false);
  };
  const openEditModal = () => {
    setModalVisible(true);
    setIsDeactivateAccount(false);
    setIsEdit(true);
  };
  const openDeleteModal = () => {
    setModalVisible(true);
    setIsEdit(false);
    setIsDeactivateAccount(true);
  };
  const usedData = async () => {
    let sizeData = JSON.parse(sessionStorage.getItem('sizeData'));
    let idArr = sizeData.map((el) => el._id);

    try {
      const url = `/api/used/${idArr[0]}/${idArr[1]}/${idArr[2]}/${idArr[3]}/${idArr[4]} `;
      console.log(url);
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
      console.log(data);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };
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
    let purchasedResults = await inventoryData();
    let usedResults = await usedData();

    const totalPurchased = purchasedResults
      .map((item) => item.purchased)
      .reduce((prev, next) => prev + next);
    const totalUsed = usedResults.reduce(
      (acc, o) => acc + parseInt(o.used.length),
      0
    );

    setUsed(totalUsed);
    setPurchased(totalPurchased);
  };

  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <h1>Profile</h1>
        </div>
      </section>
      <section className='section' style={{ paddingTop: '1rem' }}>
        <div className='profile-heading'>
          <h2 className='profile-name'>{user.firstName}</h2>
          <button className='btn-link' onClick={() => openEditModal()}>
            Edit
          </button>
        </div>
      </section>
      <section className='section' style={{ paddingTop: '1rem' }}>
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
      <section
        className='section'
        style={{ paddingTop: '1rem', paddingBottom: '100px' }}
      >
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
        <div style={{ marginTop: '3rem' }}>
          <button
            type='button'
            className='btn-link btn-link-danger'
            onClick={() => {
              openDeleteModal();
            }}
          >
            Deactivate My Account
          </button>
        </div>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        {isEdit && (
          <EditProfile
            userData={user}
            setUser={setUser}
            closeModal={closeModal}
          />
        )}
        {isDeactivateAccount && (
          <DeactivateAccount
            user={user}
            setUser={setUser}
            closeModal={closeModal}
          />
        )}
      </Modal>
      <Navbar setUser={setUser} />
    </div>
  );
};

export default Profile;
