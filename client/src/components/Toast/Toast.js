import React, { useCallback, useEffect } from 'react';
import './Toast.css';

const Toast = ({ toastList, position, setList }) => {
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastList.filter((e) => e.id !== id);
      setList(toastListItem);
    },
    [toastList, setList]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, deleteToast]);
  return (
    <div className={`container ${position}`}>
      {toastList.map((toast, i) => (
        <div
          key={i}
          className={`notification toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <div>
            <p className='description'>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;

// reference: https://www.youtube.com/watch?v=cOJTshh56Zc
