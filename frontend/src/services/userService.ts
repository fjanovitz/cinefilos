import axios from 'axios';

export const createUser = async (user: any) => {
  console.log(user);
  const response = await axios.post('http://localhost:8000/user/create_user', user);
  return response.data;
};

export const getUser = async (userId: string) => {
  console.log(userId)
  const response = await axios.get(`http://localhost:8000/user/get_user/${userId}`);
  return response.data;
};
