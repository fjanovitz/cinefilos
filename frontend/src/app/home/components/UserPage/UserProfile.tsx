import React, { useEffect, useState } from 'react';
import { getUser, followUser, unfollowUser, acceptFollowRequest, rejectFollowRequest } from '../../../../services/userService';
import styles from '../../pages/UserPage/index.module.css';
import { useParams } from 'react-router-dom';

interface User {
  full_name: string;
  username: string;
  email: string;
  birth_date: string;
  phone_number: string;
  address: string;
  gender: string;
  following: string[];
  follow_requests: string[];
  followers: string[];
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [followUsername, setFollowUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        console.error('userId is undefined');
        return;
      }
  
      const userData = await getUser(userId);
      setUser(userData.data);
    };
  
    fetchUser();
  }, [userId]);

  const handleFollow = async () => {
    if (!followUsername) {
      console.error('Follow username is empty');
      return;
    }
  
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    const result = await followUser(userId, followUsername);
    if (result) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            following: [...prevUser.following, followUsername],
          };
        } else {
          return null;
        }
      });
    }
  };
  

  const handleUnfollow = async (usernameToUnfollow: string) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    await unfollowUser(userId, usernameToUnfollow);

    // Update the state of the component
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          following: prevUser.following.filter(username => username !== usernameToUnfollow),
        };
      } else {
        return null;
      }
    });
  };

  const handleAcceptFollowRequest = async (requesterUsername: string) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    await acceptFollowRequest(userId, requesterUsername);

    // Update the state of the component
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          follow_requests: prevUser.follow_requests.filter(username => username !== requesterUsername),
          followers: [...prevUser.followers, requesterUsername],
        };
      } else {
        return null;
      }
    });
  };

  const handleRejectFollowRequest = async (requesterUsername: string) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    await rejectFollowRequest(userId, requesterUsername);

    // Update the state of the component
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          follow_requests: prevUser.follow_requests.filter(username => username !== requesterUsername),
        };
      } else {
        return null;
      }
    });
  };

  const handleShowFollowing = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profile}>
      <h1>{user.full_name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birth Date: {user.birth_date}</p>
      <p>Phone Number: {user.phone_number}</p>
      <p>Address: {user.address}</p>
      <p>Gender: {user.gender}</p>
      <input
        type="text"
        placeholder="Enter username to follow"
        value={followUsername}
        onChange={(e) => setFollowUsername(e.target.value)}
      />
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleShowFollowing}>Show Following</button>
      {showModal && (
        <div className={styles.modal}>
          <h2>Follow Requests</h2>
          {user.follow_requests.map((username) => (
            <div key={username}>
              <p>{username}</p>
              <button onClick={() => handleAcceptFollowRequest(username)}>Accept</button>
              <button onClick={() => handleRejectFollowRequest(username)}>Reject</button>
            </div>
          ))}
          <h2>Following</h2>
          {user.following.map((username) => (
            <div key={username}>
              <p>{username}</p>
              <button onClick={() => handleUnfollow(username)}>Unfollow</button>
            </div>
          ))}
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
