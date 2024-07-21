import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateUser, getUser } from '../../../../services/userService';

const EditUserInfoForm = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    username: '',
    phone_number: '',
    address: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      const currentUser = await getUser(userId);
      setUserInfo({
        full_name: currentUser.data.full_name,
        username: currentUser.data.username,
        phone_number: currentUser.data.phone_number || '',
        address: currentUser.data.address || '',
        gender: currentUser.data.gender || '',
      });
    };
    fetchUser();
  }, [userId]);
  

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    try {
      // Fetch the current user data
      const currentUser = await getUser(userId);
      
      // Update the user fields within the data object
      currentUser.data.full_name = userInfo.full_name;
      currentUser.data.username = userInfo.username;
      currentUser.data.phone_number = userInfo.phone_number;
      currentUser.data.address = userInfo.address;
      currentUser.data.gender = userInfo.gender;
      
      // Send the entire user object in the request
      await updateUser(userId, currentUser.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name
        <input
          type="text"
          name="full_name"
          value={userInfo.full_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number
        <input
          type="text"
          name="phone_number"
          value={userInfo.phone_number}
          onChange={handleChange}
        />
      </label>
      <label>
        Address
        <input
          type="text"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender
        <input
          type="text"
          name="gender"
          value={userInfo.gender}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Info</button>
    </form>
  );
};

export default EditUserInfoForm;
