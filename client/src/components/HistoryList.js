import React, { useState } from 'react';

import './HistoryGraphs.css';
import Modal from './Modal/Modal';
import EditHistory from './EditHistory';

const HistoryList = ({ history }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <>
      <section className='section history-card'>
        <ul className='list history-list'>
          {!history && (
            <p>
              No used diaper history yet. Remove a diaper from above to start
              tracking!
            </p>
          )}
          {history &&
            history.map((item, index) => {
              return (
                <li className='history-list-item' key={index}>
                  <div>
                    <span className='list-date'>{item.date}</span>
                    <span className='list-count'>{item.amount} used</span>
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
