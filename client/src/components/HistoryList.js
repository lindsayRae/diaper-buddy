import React, { useState } from 'react';

import './HistoryGraphs.css';
import Modal from './Modal/Modal';
import EditHistory from './EditHistory';

const historyData = [
  { date: '01/01/22', count: 10 },
  { date: '01/02/22', count: 8 },
  { date: '01/03/22', count: 9 },
  { date: '01/04/22', count: 10 },
  { date: '01/05/22', count: 11 },
];
const HistoryList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <>
      <section className='section history-card'>
        <ul className='list history-list'>
          {historyData.map((item, index) => {
            return (
              <li className='history-list-item' key={index}>
                <div>
                  <span className='list-date'>{item.date}</span>
                  <span className='list-count'>{item.count} used</span>
                </div>
                <button
                  className='btn-link'
                  onClick={() => {
                    setModalVisible(true);
                    setModalData(item);
                  }}
                  style={{ color: '#3f9ae0' }}
                >
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <Modal open={modalVisible} closeModal={() => setModalVisible(false)}>
        <EditHistory
          modalData={modalData}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
};

export default HistoryList;
