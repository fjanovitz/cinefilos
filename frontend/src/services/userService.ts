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

export const updateUser = async (userId: string, updatedUser: any) => {
  console.log(updatedUser)
  console.log("acima")
  const response = await axios.put(`http://localhost:8000/user/update_user/${userId}`, updatedUser);
  return response.data;
};


