import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaBaby, FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';

import './Inputs.css';
const brandList = [
  { value: 'Huggies', label: 'Huggies' },
  { value: 'Kirkland', label: 'Kirkland' },
  { value: 'Pampers', label: 'Pampers' },
  { value: "Parent's Choice", label: "Parent's Choice" },
  { value: 'Up & Up', label: 'Up & Up' },
];
const sizeList = [
  { value: 'Newborn', label: 'Newborn' },
  { value: 'Size 1', label: 'Size 1' },
  { value: 'Size 2', label: 'Size 2' },
  { value: 'Size 3', label: 'Size 3' },
  { value: 'Size 4', label: 'Size 4' },
];
const alertList = [
  { value: '0', label: 'None' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

const AddChild = ({
  user,
  updateUserData,
  closeModal,
  getKids,
  customStyles,
  showToast,
}) => {
  const [baby, setBaby] = useState('');
  const [brandOption, setBrandOption] = useState();
  const [sizeOption, setSizeOption] = useState();
  const [alertOption, setAlertOption] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState();
  const [error, setError] = useState('');

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!baby) {
      return setError('You must add a baby name.');
    }
    if (!brandOption) {
      return setError('You must select a brand preference.');
    }
    if (!sizeOption) {
      return setError('You must select the current size.');
    }
    if (!alertOption) {
      return setError('You must select a low alert.');
    }
    const formData = new FormData();

    formData.append('user_id', user._id);
    formData.append('firstName', baby);
    formData.append('brandPreference', brandOption.value);
    formData.append('currentSize', sizeOption.value);
    formData.append('lowAlert', alertOption.value);
    formData.append('image', selectedImage);

    try {
      const res = await fetch(`/api/kids`, {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
        },
        body: formData,
      });
      const data = await res.json();

      if (data.status == 400) {
        setError(data.message);
        return;
      }

      let userData = await updateUserData(data._id);

      if (userData) {
        getKids();
        setError('');
        closeModal();
        showToast('info', 'Current child has been updated.');
        collectSizeIds(data._id);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const createUsedRecord = async (size_id, size) => {
    let body = {
      size,
    };
    try {
      const res = await fetch(`/api/used/${size_id}`, {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const collectSizeIds = async (kid_id) => {
    try {
      const res = await fetch(`/api/inventory/${kid_id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      sessionStorage.setItem('sizeData', JSON.stringify(data));
      data.forEach(async (el) => {
        await createUsedRecord(el._id, el.size);
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  useEffect(() => {
    if (selectedImage) {
      setPreviewImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  return (
    <form onSubmit={handleAddSubmit} encType='multipart/form-data'>
      <h1>Add Child</h1>
      <div className='input-line-container' style={{ marginBottom: '16px' }}>
        <FaBaby
          size={20}
          className='edit-count-icon'
          style={{ marginTop: '8px' }}
        />
        <input
          type='text'
          className='input-line-no-border-modal input-name2'
          value={baby}
          onChange={(e) => setBaby(e.target.value)}
          placeholder='Baby Name'
        />
      </div>
      <div className='input-line-container'>
        <AiOutlineShoppingCart
          size={24}
          className='select-icon'
          style={{ marginTop: '6px' }}
        />
        <Select
          className='settings-select'
          styles={customStyles}
          onChange={setBrandOption}
          options={brandList}
          value={brandOption}
          placeholder={'Select Brand Preference'}
        />
      </div>
      <div className='input-line-container'>
        <TiSortNumerically
          size={24}
          className='select-icon'
          style={{ marginTop: '4px' }}
        />
        <Select
          className='settings-select'
          styles={customStyles}
          onChange={setSizeOption}
          options={sizeList}
          value={sizeOption}
          placeholder={'Select Current Size'}
        />
      </div>

      <div className='input-line-container'>
        <AiOutlineBell
          size={24}
          className='select-icon'
          style={{ marginTop: '5px' }}
        />
        <Select
          className='settings-select'
          styles={customStyles}
          onChange={setAlertOption}
          options={alertList}
          value={alertOption}
          placeholder={'Select Low Alert'}
        />
      </div>
      <div className='input-line-container'>
        <FaRegUserCircle
          size={24}
          className='select-icon'
          style={{ marginTop: '5px' }}
        />
        {previewImageUrl && selectedImage && (
          <img
            src={previewImageUrl}
            height='48'
            width='55'
            style={{ borderRadius: '10px' }}
          ></img>
        )}
        <input
          id='select-image-2'
          type='file'
          name='image'
          className='custom-file-input'
          accept='image/*'
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
            setPreviewImageUrl(e.target.files[0]);
          }}
          style={{ display: 'none' }}
        />
        <label htmlFor='select-image-2' className='upload-btn'>
          Select Image
        </label>
      </div>
      {error && (
        <p style={{ textAlign: 'center', color: '#f94687' }}>{error}</p>
      )}
      <button className='btn btn-lt'>Save</button>
    </form>
  );
};

export default AddChild;
