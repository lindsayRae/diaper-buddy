import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import EditProfile from '../components/EditProfile';
import Logout from '../components/Logout';
import Navbar from '../components/Nav/Navbar';
import { MdLogin, MdLogout } from 'react-icons/md';
import './Profile.css';
import dotsH from '../images/horizontalDots.png';
import dotsV from '../images/verticalDots.png';
import { GrMail } from 'react-icons/gr';
import { HiOutlineKey } from 'react-icons/hi';

const Profile = () => {
  const [password, setPassword] = useState('12345678');
  const [passwordShown, setPasswordShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='background-light'>
      <section className='section'>
        <div className='page-title'>
          <div className='logout-container'>
            <div></div>
            <Logout />
          </div>
          <h1>Profile</h1>
        </div>
      </section>
      <section className='section'>
        <div className='profile-heading'>
          <h2>Lindsay Aiello</h2>
          <button className='btn-link' onClick={() => setModalVisible(true)}>
            Edit
          </button>
        </div>
        <div className='subtitle'>Mom</div>
      </section>
      <section className='section'>
        <h3 style={{ fontWeight: '600' }}>Diaper Insight</h3>
        <div className='insight-container'>
          <div className='insight-purchased'>
            <div className='insight-count'>568</div>
            <div className='insight-title'>Total Diapers Purchased</div>
            <img src={dotsH} alt='' className='dots-h' />
            <MdLogin size={50} className='insight-icon' />
          </div>
          <div className='insight-used'>
            <div className='insight-count'>423</div>
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
            <div>lbarnett712@gmail.com</div>
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
                type={passwordShown ? 'text' : 'password'}
                className='profile-pass'
                value={password}
              />
              <button
                className='btn-link'
                id='togglePass'
                onClick={togglePassword}
              >
                {passwordShown ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        <EditProfile
          modalData={modalData}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
      <Navbar />
    </div>
  );
};

export default Profile;
