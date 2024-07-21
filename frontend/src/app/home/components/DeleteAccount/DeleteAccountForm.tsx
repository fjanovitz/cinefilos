import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteUser } from '../../../../services/userService';

const DeleteAccountForm = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const response = await deleteUser(userId, password);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Confirm Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Delete Account</button>
    </form>
  );
};

export default DeleteAccountForm;
