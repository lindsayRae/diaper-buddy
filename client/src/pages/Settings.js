import React, { useState, useContext, useEffect } from 'react';
import Modal from '../components/Modal/Modal';
import AddChild from '../components/AddChild';
import Logout from '../components/Logout';
import Navbar from '../components/Nav/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import icon from '../images/icon.png';
import { FaBaby } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';
import './Settings.css';

const Settings = () => {
  const [baby, setBaby] = useState('');
  const [babyID, setBabyID] = useState('');
  const [brand, setBrand] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  const [currentSizeLabel, setCurrentSizeLabel] = useState('');
  const [lowAlert, setLowAlert] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [isAddChild, setIsAddChild] = useState(false);
  const [oneKid, setOneKid] = useState(true);
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  let navigate = useNavigate();
  console.log(user);
  useEffect(async () => {
    if (!isAuthenticated) {
      navigate('/');
    }
    console.log('in use effect');
    if (!modalVisible) {
      console.log('get current child');

      setPage();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setPage = async () => {
    let kids = await getKids();
    console.log(kids);
    if (!kids || kids.length === 0) return openAddChild();
    if (kids.length > 1) {
      setOneKid(false);
    } else {
      setBaby(kids[0].firstName);
      setBabyID(kids[0]._id);
      setBrand(kids[0].brandPreference);
      setCurrentSize(kids[0].currentSize);
      setLowAlert(kids[0].lowAlert);
    }
    // set select option to current child
  };
  const getKids = async () => {
    const user_ID = user.user._id;
    try {
      const url = `/api/kids/${user_ID}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': user.jwt,
      };
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await res.json();
      console.log('getKids data:', data);
      if (data.message) {
        setError(data.message);
        return;
      } else {
        return data;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const openAddChild = (e) => {
    setIsAddChild(true);
    setModalVisible(true);
  };

  const handleSubmit = async (e) => {
    console.log('submitting form...');
    e.preventDefault();
    let body = {
      user_id: user.user._id,
      _id: babyID,
      firstName: baby,
      brandPreference: brand,
      currentSize: currentSize,
      currentSizeLabel: currentSizeLabel,
      lowAlert: lowAlert,
    };

    try {
      const res = await fetch(`/api/kids`, {
        method: 'PUT',
        headers: {
          'x-auth-token': user.jwt,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <section className='section'>
        <div className='logout'>
          <Logout user={user} setUser={setUser} />
        </div>

        <div className='setting-heading'>
          <img src={icon} alt='icon' />
          <h1>Settings</h1>
        </div>
      </section>
      <section className='section' style={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          {oneKid ? (
            <div className='input-line-container'>
              <FaBaby
                size={20}
                className='edit-count-icon'
                style={{
                  marginTop: '8px',
                  width: '24px',
                }}
              />
              <input
                type='text'
                className='input-line input-name'
                value={baby}
                placeholder='Baby Name'
                style={{ marginLeft: '5px', paddingBottom: '25px' }}
                onChange={(e) => setBaby(e.target.value)}
              />
            </div>
          ) : (
            <div className='input-line-container'>
              <FaBaby
                size={20}
                className='edit-count-icon'
                style={{ marginTop: '6px' }}
              />
              <select
                className='settings-select'
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              >
                <option>Baby Name</option>
                <option>test</option>
              </select>
            </div>
          )}

          <div className='input-line-container'>
            <AiOutlineShoppingCart
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '6px' }}
            />
            <select
              className='settings-select'
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
            >
              <option value='0'>Brand Preference</option>
              <option value='huggies'>Huggies</option>
              <option value='kirkland'>Kirkland</option>
              <option value='pampers'>Pampers</option>
              <option value='parents'>Parent's Choice</option>
              <option value='up'>Up & Up</option>
            </select>
          </div>
          <div className='input-line-container'>
            <TiSortNumerically
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '4px' }}
            />
            <select
              className='settings-select'
              onChange={(e) => {
                setCurrentSize(e.target.value);
                setCurrentSizeLabel(
                  e.target.options[e.target.selectedIndex].text
                );
              }}
              value={currentSize}
            >
              <option value='-1'>Current Size</option>
              <option value='0'>Newborn</option>
              <option value='1'>Size 1</option>
              <option value='2'>Size 2</option>
              <option value='3'>Size 3</option>
              <option value='4'>Size 4</option>
            </select>
          </div>
          <div className='input-line-container'>
            <AiOutlineBell
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '5px' }}
            />
            <select
              className='settings-select'
              onChange={(e) => setLowAlert(e.target.value)}
              value={lowAlert}
            >
              <option value='0'>Low Alert</option>
              <option value='none'>None</option>
              <option value='10'>Less than 10</option>
              <option value='20'>Less than 20</option>
              <option value='50'>Less than 50</option>
              <option value='100'>Less than 100</option>
            </select>
          </div>

          <button className='btn btn-lt settings-btn'>Save</button>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button
              type='button'
              className='btn-link'
              onClick={() => {
                openAddChild();
              }}
            >
              Add Another Child
            </button>
          </div>
        </form>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        {isAddChild && (
          <AddChild
            user={user}
            modalData={modalData}
            closeModal={() => setModalVisible(false)}
            setPage={setPage}
          />
        )}
      </Modal>
      <Navbar />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Settings;
