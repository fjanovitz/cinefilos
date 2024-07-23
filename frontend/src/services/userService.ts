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

export const createUser = async (user) => {
  const response = await axios.post('http://127.0.0.1:8000/user/create_user', user);
  return response.data;
};


export const getUser = async (userId: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/user/get_user/${userId}`);
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(`http://localhost:8000/user/get_user_by_emial/${email}`);
  return response.data;
}

export const updateUser = async (userId: string, updatedUser: any) => {
  const response = await axios.put(`http://127.0.0.1:8000/user/update_user/${userId}`, updatedUser);
  return response.data;
};

export const deleteUser = async (userId: string, password: string) => {
  const response = await axios.delete(`http://127.0.0.1:8000/user/delete_user/${userId}?password=${encodeURIComponent(password)}`);
  return response.data;
};

export const followUser = async (currentUserId: string, targetUsername: string) => {
  const response = await axios.post(`http://127.0.0.1:8000/user/follow/${targetUsername}/${currentUserId}`);
  return response.data;
};

export const unfollowUser = async (currentUserId: string, targetUsername: string) => {
  const response = await axios.post(`http://127.0.0.1:8000/user/unfollow/${targetUsername}/${currentUserId}`);
  return response.data;
};

export const acceptFollowRequest = async (currentUserId: string, requesterUsername: string) => {
  const response = await axios.post(`http://127.0.0.1:8000/user/accept_follow_request/${requesterUsername}/${currentUserId}`);
  return response.data;
};

export const rejectFollowRequest = async (currentUserId: string, requesterUsername: string) => {
  const response = await axios.post(`http://127.0.0.1:8000/user/reject_follow_request/${requesterUsername}/${currentUserId}`);
  return response.data;
};

export const setProfilePrivacy = async (username: string, is_private: boolean) => {
  const response = await axios.put(`http://127.0.0.1:8000/user/set_profile_privacy/${username}?is_private=${is_private}`);
  return response.data;
};





