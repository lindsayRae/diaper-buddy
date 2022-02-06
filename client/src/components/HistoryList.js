import React, { useState } from 'react';

import './HistoryGraphs.css';
import Modal from './Modal/Modal';

const HistoryList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <section className='section history-card'>
        <ul className='list history-list'>
          <li className='history-list-item'>
            <div>
              <span className='list-date'>01/10/22</span>
              <span className='list-count'>10 used</span>
            </div>
            <button className='btn-link' onClick={() => setModalVisible(true)}>
              Edit
            </button>
          </li>
        </ul>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        <>
          <h2>Hello from the modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis,
            recusandae.
          </p>
        </>
      </Modal>
    </>
  );
};

export default HistoryList;
