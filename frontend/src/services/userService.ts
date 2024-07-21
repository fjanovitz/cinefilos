import axios from 'axios';

export const loginUser = async (credentials: any) => {
  console.log(credentials);
  const response = await axios.post('http://localhost:8000/login', credentials);
  return response.data;
};
