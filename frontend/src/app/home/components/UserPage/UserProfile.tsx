import React, { useEffect, useState } from 'react';
import { getUser, followUser, unfollowUser, acceptFollowRequest, rejectFollowRequest, setProfilePrivacy } from '../../../../services/userService';
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
  is_private: boolean;
  profile_picture: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [followUsername, setFollowUsername] = useState('');
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowRequestsModal, setShowFollowRequestsModal] = useState(false);
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
  
    // Prevent the user from following themselves
    if (user && followUsername === user.username) {
      console.error('User cannot follow themselves');
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
    setShowFollowingModal(true);
  };

  const handleShowFollowers = () => {
    setShowFollowersModal(true);
  };

  const handleShowFollowRequests = () => {
    setShowFollowRequestsModal(true);
  };

  const handleCloseModal = () => {
    setShowFollowingModal(false);
    setShowFollowersModal(false);
    setShowFollowRequestsModal(false);
  };

  const handleSwitchMode = async () => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    if (!user) {
      console.error('User is null');
      return;
    }
  
    const result = await setProfilePrivacy(userId, !user.is_private);
    if (result) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            is_private: !prevUser.is_private,
          };
        } else {
          return null;
        }
      });

      // If the profile is set to public, accept all follow requests
      if (user.is_private) {
        for (const requesterUsername of user.follow_requests) {
          await acceptFollowRequest(userId, requesterUsername);
        }
      }
    }
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <img src={user.profile_picture} alt="Profile" className={styles.profilePicture} />
        <div className={styles.userInitialInfo}>
          <h2>@{user.username}</h2>
          <h4>{user.full_name}</h4>
          <p>{user.email}</p>
        </div>
        <div className={styles.userInfo}>
          <p><b>Data de Nascimento: </b><em>{user.birth_date}</em></p>
          <p><b>Número de Telefone:</b><em> {user.phone_number}</em></p>
          <p><b>Gênero:</b><em> {user.gender}</em></p>
          <p><b>Modo de Privacidade:</b><em> {user.is_private ? 'Private' : 'Public'}</em></p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.follow}>
          <button onClick={handleShowFollowing}><b>{user.following.length}</b> Seguindo</button>
          <button onClick={handleShowFollowers}><b>{user.followers.length}</b> Seguidores</button>
        </div>
        {user.is_private && <button onClick={handleShowFollowRequests}>Mostrar Solicitações Para Seguir</button>}
        <div className={styles.followUserFunc}>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={followUsername}
            onChange={(e) => setFollowUsername(e.target.value)}
          />
          <button onClick={handleFollow}>Seguir</button>
        </div>
        <button onClick={handleSwitchMode}>Trocar Modo</button>
      </div>
      {showFollowingModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Following</h2>
            {user.following.map((username) => (
              <div key={username} className={styles.followingClass}>
                <b><p style={{color: "#818181",}}>{username}</p></b>
                <button onClick={() => handleUnfollow(username)} style={{margin:0, width:'30%',}}>Unfollow</button>
              </div>
            ))}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      {showFollowersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Followers</h2>
            <div className={styles.followersModal}>
            {user.followers.map((username) => (
              <div key={username}>
                <p><b>{username}</b></p>
              </div>
            ))}
            </div>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      {showFollowRequestsModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Follow Requests</h2>
            {user.follow_requests.map((username) => (
              <div key={username}>
                <p>{username}</p>
                <button onClick={() => handleAcceptFollowRequest(username)}>Accept</button>
                <button onClick={() => handleRejectFollowRequest(username)}>Reject</button>
              </div>
            ))}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
