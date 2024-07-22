import axios from 'axios';

export const loginUser = async (credentials: any) => {
  console.log(credentials);
  const response = await axios.post('http://localhost:8000/login', credentials);
  return response.data;
};

export const recoverAccount = async (email) => {
  const response = await axios.post('http://localhost:8000/users/recover-account', { email });
  return response;
};

export const resetPassword = async (email, recoveryToken, newPassword) => {
  const response = await axios.post('http://localhost:8000/users/reset-password', { email, recovery_token: recoveryToken, new_password: newPassword });
  return response;
};
