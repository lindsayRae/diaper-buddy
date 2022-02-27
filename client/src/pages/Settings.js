import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import EditBabyName from '../components/EditBabyName';
import AddChild from '../components/EditAddChild';
import Logout from '../components/Logout';
import icon from '../images/icon.png';
import { FaBaby } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';
import { IoIosAddCircleOutline } from 'react-icons/io';
import './Settings.css';

const Settings = () => {
  const [baby, setBaby] = useState('Roman');
  const [brand, setBrand] = useState('Roman');
  const [currentSize, setCurrentSize] = useState('Roman');
  const [addSize, setAddSize] = useState('Roman');
  const [lowAlert, setLowAlert] = useState('Roman');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [isAddChild, setIsAddChild] = useState(false);
  const [isEditName, setIsEditName] = useState(false);

  const openEditName = (e) => {
    setIsAddChild(false);
    setIsEditName(true);
    setModalVisible(true);
  };
  const openAddChild = (e) => {
    setIsAddChild(true);
    setIsEditName(false);
    setModalVisible(true);
  };
  return (
    <div>
      <section className='section'>
        <div className='logout'>
          <Logout />
        </div>

        <div className='setting-heading'>
          <img src={icon} alt='icon' />
          <h1>Settings</h1>
        </div>
      </section>
      <section className='section' style={{ marginTop: '20px' }}>
        <form>
          <div className='input-line-container'>
            <FaBaby
              size={20}
              className='edit-count-icon'
              style={{ marginTop: '8px' }}
            />
            <input
              type='text'
              className='input-line input-name'
              value={baby}
              onChange={(e) => setBaby(e.target.value)}
            />
            <span className='btn-group'>
              <button
                type='button'
                className='btn-link'
                onClick={() => {
                  openEditName();
                }}
              >
                Edit
              </button>
              <button
                type='button'
                className='btn-link'
                style={{ marginLeft: '15px' }}
                onClick={() => {
                  openAddChild();
                }}
              >
                Add
              </button>
            </span>
          </div>
          <div className='input-line-container'>
            <AiOutlineShoppingCart
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '6px' }}
            />
            <select className='settings-select'>
              <option>Brand Preference</option>
              <option>Huggies</option>
              <option>Kirkland</option>
              <option>Pampers</option>
              <option>Parent's Choice</option>
              <option>Up & Up</option>
            </select>
          </div>
          <div className='input-line-container'>
            <TiSortNumerically
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '4px' }}
            />
            <select className='settings-select'>
              <option>Current Size</option>
              <option>Newborn</option>
              <option>Size 1</option>
              <option>Size 2</option>
              <option>Size 3</option>
              <option>Size 4</option>
            </select>
          </div>
          <div className='input-line-container'>
            <IoIosAddCircleOutline
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '5px' }}
            />
            <select className='settings-select'>
              <option>Add Size</option>
              <option>Newborn</option>
              <option>Size 1</option>
              <option>Size 2</option>
              <option>Size 3</option>
              <option>Size 4</option>
            </select>
          </div>
          <div className='input-line-container'>
            <AiOutlineBell
              size={24}
              className='edit-count-icon'
              style={{ marginTop: '5px' }}
            />
            <select className='settings-select'>
              <option>Low Alert</option>
              <option>Less than 10</option>
              <option>Less than 20</option>
              <option>Less than 50</option>
              <option>Less than 100</option>
            </select>
          </div>

          <button className='btn btn-lt settings-btn'>Save</button>
          <div style={{ height: '85px' }}></div>
        </form>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        {isAddChild && (
          <AddChild
            modalData={modalData}
            closeModal={() => setModalVisible(false)}
          />
        )}
        {isEditName && (
          <EditBabyName
            modalData={modalData}
            closeModal={() => setModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Settings;
