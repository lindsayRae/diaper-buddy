import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import AddChild from '../components/AddChild';
import DeleteChild from '../components/DeleteChild';
import Navbar from '../components/Nav/Navbar';
import Toast from '../components/Toast/Toast';
import icon from '../images/icon.png';
import { FaBaby, FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';
import './Settings.css';

const brandList = [
  { value: 'Huggies', label: 'Huggies' },
  { value: 'Kirkland', label: 'Kirkland' },
  { value: 'Pampers', label: 'Pampers' },
  { value: "Parents's Choice", label: "Parent's Choice" },
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
  { value: 'None', label: 'None' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  let navigate = useNavigate();

  const [kidsData, setKidsData] = useState([]);

  const [babyName, setBabyName] = useState('');
  const [nameList, setNameList] = useState([]);
  const [nameOption, setNameOption] = useState();
  const [brandOption, setBrandOption] = useState();
  const [sizeOption, setSizeOption] = useState();
  const [alertOption, setAlertOption] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [babyImg, setBabyImg] = useState();
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  const [babyID, setBabyID] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [isAddChild, setIsAddChild] = useState(false);
  const [isDeleteChild, setIsDeleteChild] = useState(false);
  const [error, setError] = useState('');

  const [list, setList] = useState([]);
  let toastProperties = null;

  const customStyles = {
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
  };
  const closeModal = () => {
    setModalVisible(false);
    setIsAddChild(false);
    setIsDeleteChild(false);
  };
  const setNewCurrentChild = async (data, closeModal) => {
    // update user currentChild
    if (data.firstRecord) {
      await updateUserData(data.firstRecord._id);
    }
    await getKids();
    closeModal();
  };

  const setMultiChildren = async (data) => {
    const nameOptionList = await createNameOptions(data);

    let currentID = user.currentChild;

    let currentChildData = data.find((x) => x._id === currentID);
    // console.log(currentChildData);
    setNameList(nameOptionList);
    setBabyID(currentChildData._id);
    setNameOption({
      label: currentChildData.firstName,
      value: currentChildData.firstName,
    });
    localStorage.setItem('babyName', currentChildData.firstName);
    setBrandOption({
      label: currentChildData.brandPreference,
      value: currentChildData.brandPreference,
    });
    setSizeOption({
      label: currentChildData.currentSize,
      value: currentChildData.currentSize,
    });
    setAlertOption({
      label: currentChildData.lowAlert,
      value: currentChildData.lowAlert,
    });
    setBabyImg(currentChildData.imageUrl);
  };
  const setOneChild = (data) => {
    setBabyName(data[0].firstName);
    localStorage.setItem('babyName', data[0].firstName);
    setBabyID(data[0]._id);
    setBrandOption({
      label: data[0].brandPreference,
      value: data[0].brandPreference,
    });
    setSizeOption({
      label: data[0].currentSize,
      value: data[0].currentSize,
    });
    setAlertOption({
      label: data[0].lowAlert,
      value: data[0].lowAlert,
    });
    setBabyImg(data[0].imageUrl);
  };
  const getKids = async () => {
    const user_ID = user._id;
    const url = `/api/kids/${user_ID}`;

    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
      };
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await res.json();
      // console.log('get kids data', data);
      if (data.message) {
        console.log('error', error);
        setError(data.message);
        return;
      } else {
        if (!data || data.length === 0) {
          console.log(data.length);
          setBabyName('');
          setNameOption();
          setBrandOption();
          setSizeOption();
          setAlertOption();
          setSelectedImage();
          setBabyImg();
          setPreviewImageUrl();
          openAddChild();
          return;
        }
        setKidsData(data);
        if (data.length > 1) {
          setMultiChildren(data);
        } else {
          setOneChild(data);
        }
      }
    } catch (error) {
      console.log('error', error);
      setError(error.message);
    }
  };

  const findNewObj = (obj) => {
    return kidsData.find((x) => obj === x.firstName);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!modalVisible) {
      getKids();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedImage) {
      setPreviewImageUrl(URL.createObjectURL(selectedImage));
      setBabyImg(null);
    }
  }, [selectedImage]);

  // need to turn and array into a array of objects
  const createNameOptions = (data) => {
    let arr = data.map((el) => el.firstName);
    return arr.map((el) => ({ value: el, label: el }));
  };

  const openAddChild = (e) => {
    console.log('hearddd');
    setIsAddChild(true);
    setModalVisible(true);
  };
  const openDeleteChild = (e) => {
    setIsDeleteChild(true);
    setModalVisible(true);
  };
  const showToast = (type, description) => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: list.length + 1,
          description: 'Saved',
          backgroundColor: '#5cb85c',
        };
        break;
      case 'info':
        toastProperties = {
          id: list.length + 1,
          description: description,
          backgroundColor: '#5bc0de',
        };
        break;
      case 'danger':
        toastProperties = {
          id: list.length + 1,
          description: 'This is a error',
          backgroundColor: '#d9534f',
        };
        break;
      default:
        toastProperties = [];
    }

    setList([...list, toastProperties]);
  };
  const updateUserData = async (kid_id) => {
    const user_id = user._id;
    let body = {
      kidID: kid_id,
    };

    try {
      const res = await fetch(`/api/users/update/${user_id}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log('updated data', data);
      user.currentChild = data.currentChild;
      setUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
      return data;
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('user_id', user._id);
    formData.append('_id', babyID);
    if (kidsData.length === 1) {
      formData.append('firstName', babyName);
    } else {
      formData.append('firstName', nameOption.value);
    }

    formData.append('brandPreference', brandOption.value);
    formData.append('currentSize', sizeOption.value);
    formData.append('lowAlert', alertOption.value);
    formData.append('image', selectedImage);
    console.log(selectedImage);
    try {
      const res = await fetch(`/api/kids`, {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
        },
        body: formData,
      });

      const data = await res.json();

      if (data.message) {
        setError(data.message);
        return;
      }

      showToast('success');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const setSessionSizeData = async (kid_id) => {
    try {
      const res = await fetch(`/api/inventory/${kid_id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      sessionStorage.setItem('sizeData', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div>
      <section className='section'>
        <Toast toastList={list} position='top-left' setList={setList} />

        <div className='setting-heading'>
          <img src={icon} alt='icon' />
          <h1>Settings</h1>
        </div>
      </section>
      <section className='section'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          {kidsData.length === 1 ? (
            <div className='input-line-container'>
              <FaBaby
                size={20}
                className='select-icon'
                style={{
                  marginTop: '8px',
                  width: '24px',
                }}
              />
              <input
                type='text'
                className='input-line-no-border input-name'
                value={babyName}
                placeholder='Baby Name'
                style={{ marginLeft: '5px' }}
                onChange={(e) => {
                  setBabyName(e.target.value);
                  localStorage.setItem('babyName', e.target.value);
                }}
              />
            </div>
          ) : (
            <div className='input-line-container'>
              <FaBaby
                size={20}
                className='select-icon'
                style={{ marginTop: '6px' }}
              />
              <Select
                className='settings-select'
                styles={customStyles}
                onChange={async (obj) => {
                  setNameOption({
                    label: obj.label,
                    value: obj.value,
                  });
                  localStorage.setItem('babyName', obj.label);
                  let newObj = findNewObj(obj.label);
                  console.log(newObj);
                  setBabyID(newObj._id);
                  setSessionSizeData(newObj._id);
                  setBrandOption({
                    label: newObj.brandPreference,
                    value: newObj.brandPreference,
                  });
                  setSizeOption({
                    label: newObj.currentSize,
                    value: newObj.currentSize,
                  });
                  setAlertOption({
                    label: newObj.lowAlert,
                    value: newObj.lowAlert,
                  });
                  setBabyImg(newObj.imageUrl);

                  let userUpdated = await updateUserData(newObj._id);
                  if (userUpdated)
                    showToast('info', 'Current child has been updated.');
                }}
                options={nameList}
                value={nameOption}
              />
            </div>
          )}

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
            {babyImg && (
              <img
                src={babyImg}
                height='48'
                width='55'
                style={{ borderRadius: '10px' }}
              ></img>
            )}

            <input
              id='select-image'
              type='file'
              name='image'
              className='custom-file-input'
              accept='image/*'
              onChange={(e) => {
                console.log(e.target.files[0]);
                setSelectedImage(e.target.files[0]);
                setPreviewImageUrl(e.target.files[0]);
                setBabyImg(null);
              }}
              style={{ display: 'none' }}
            />
            <label htmlFor='select-image' className='upload-btn'>
              Select Image
            </label>
          </div>

          <button className='btn btn-green settings-btn'>Save</button>
          <div className='btn-link-between'>
            <button
              type='button'
              className='btn-link btn-link-danger'
              onClick={() => {
                openDeleteChild();
              }}
            >
              Delete {localStorage.getItem('babyName')}
            </button>
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
      <Modal open={modalVisible} closeModal={closeModal}>
        {isAddChild && (
          <AddChild
            user={user}
            updateUserData={updateUserData}
            closeModal={closeModal}
            getKids={getKids}
            customStyles={customStyles}
            showToast={showToast}
          />
        )}
        {isDeleteChild && (
          <DeleteChild
            user={user}
            setNewCurrentChild={setNewCurrentChild}
            closeModal={closeModal}
          />
        )}
      </Modal>
      <Navbar setUser={setUser} />
      {error && (
        <p style={{ color: '#d9534f', padding: '0 20px', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Settings;

//? resource for file preview image https://javascript.plainenglish.io/how-to-add-a-file-input-button-and-display-a-preview-image-with-react-2568d9d849f5
