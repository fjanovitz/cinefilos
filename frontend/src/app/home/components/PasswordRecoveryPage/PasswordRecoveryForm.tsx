import React, { useState } from 'react';
import { recoverAccount, resetPassword } from '../../../../services/userService';
import styles from '../../pages/PasswordRecoveryPage/index.module.css';
import LogButton from '../../../../shared/components/Button/LoginButton';
import { Link } from "react-router-dom";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'recoveryToken') setRecoveryToken(value);
    if (name === 'newPassword') setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      try {
        const response = await recoverAccount(email);
        console.log(response.data)
        if (response.status == 200) {
          setMessage('Recovery email sent successfully.');
          setStep(2);
        }
      } catch (error) {
        setMessage('Error sending recovery email.');
      }
    } else if (step === 2) {
      try {
        const response = await resetPassword(email, recoveryToken, newPassword);
        if (response) {
          setMessage('Password reset successfully.');
          setStep(1);
          setEmail('');
          setRecoveryToken('');
          setNewPassword('');
        }
      } catch (error) {
        setMessage('Error resetting password.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formInputContainer}>
        <label>
          Email
          <input
            data-cy = "email"
            name="email"
            className={styles.formInput}
            type="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        {step === 2 && (
          <>
            <label>
              Code
              <input
                data-cy="recovery_token"
                name="recoveryToken"
                className={styles.formInput}
                type="text"
                placeholder="Code"
                value={recoveryToken}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              New Password
              <input
                data-cy="nova-senha"
                name="newPassword"
                className={styles.formInput}
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}
      </div>
      <LogButton data-cy={step === 1 ? "ENVIAR CÓDIGO" : "RESETAR SENHA"} 
  type="submit"
>
  {step === 1 ? 'ENVIAR CÓDIGO' : 'RESETAR SENHA'}
      </LogButton>
      {message && <p>{message}</p>}
      <Link to="/login">
        LOGIN
      </Link>
    </form>
  );
};

export default PasswordRecoveryForm;
