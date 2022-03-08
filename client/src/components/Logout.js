import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';

const Logout = ({ user, setUser }) => {
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    navigate('/');
  };
  return (
    <div>
      <MdOutlineLogout size={28} onClick={handleLogout} />
    </div>
  );
};

export default Logout;
