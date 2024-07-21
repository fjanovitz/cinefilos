import React, { useState } from 'react';
import { createUser } from '../../../../services/userService';
import styles from '../../pages/RegistrationPage/index.module.css';


const RegistrationForm = () => {
  const [user, setUser] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    birth_date: '',
    phone_number: '',
    address: '',
    gender: ''
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Full Name
        <input
          type="text"
          name="full_name"
          value={user.full_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Birth Date
        <input
          type="date"
          name="birth_date"
          value={user.birth_date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number
        <input
          type="text"
          name="phone_number"
          value={user.phone_number}
          onChange={handleChange}
        />
      </label>
      <label>
        Address
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Cadastrar-se</button>
    </form>
  );
};

export default RegistrationForm;
