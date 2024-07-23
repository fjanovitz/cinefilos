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
  const [successMessage, setSuccessMessage] = useState('');
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
  
    if (user && followUsername === user.username) {
      console.error('User cannot follow themselves');
      return;
    }
  
    const result = await followUser(userId, followUsername);
    if (result) {
      if (result.message === "Solicitação para seguir enviada com sucesso") {
        setSuccessMessage("Solicitação para seguir enviada com sucesso");
      } else if (result.message === "Agora você está seguindo o usuário") {
        setSuccessMessage("Agora você está seguindo o usuário");
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
    }
  };
  

  const handleUnfollow = async (usernameToUnfollow: string) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    try {
      await unfollowUser(userId, usernameToUnfollow);
  
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
  
      setSuccessMessage("Você deixou de seguir o usuário");
    } catch (error) {
      console.error('Error while unfollowing user:', error);
    }
  };
  

  const handleAcceptFollowRequest = async (requesterUsername: string) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    await acceptFollowRequest(userId, requesterUsername);
  
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
  
    // Set success message
    setSuccessMessage('Solicitação para seguir aceita');
  };
  
  const handleRejectFollowRequest = async (requesterUsername: string) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
  
    await rejectFollowRequest(userId, requesterUsername);
  
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
  
    // Set success message
    setSuccessMessage('Solicitação para seguir rejeitada');
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

      if (user.is_private) {
        for (const requesterUsername of user.follow_requests) {
          await acceptFollowRequest(userId, requesterUsername);
        }
      }

      setSuccessMessage("Configurações de privacidade atualizadas"); // Set success message
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
          <h2 data-cy="username">@{user.username}</h2>
          <h4>{user.full_name}</h4>
          <p>{user.email}</p>
        </div>
        <div className={styles.userInfo}>
          <p><b>Data de Nascimento: </b><em>{user.birth_date}</em></p>
          <p><b>Número de Telefone:</b><em> {user.phone_number}</em></p>
          <p><b>Gênero:</b><em> {user.gender}</em></p>
          <p data-cy="privacy-status"><b>Modo de Privacidade:</b><em> {user.is_private ? 'Privado' : 'Público'}</em></p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.follow}>
        <button onClick={handleShowFollowing} data-cy="following-button">
        <b>{user.following.length}</b> Seguindo
        </button>
          <button onClick={handleShowFollowers}><b>{user.followers.length}</b> Seguidores</button>
        </div>
        {user.is_private && (
        <button
          onClick={handleShowFollowRequests}
          data-cy="follow-request-button">
          Mostrar Solicitações Para Seguir
        </button>
        )}
        <div className={styles.followUserFunc}>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={followUsername}
            onChange={(e) => setFollowUsername(e.target.value)}
            data-cy="follow-field"
          />
          <button onClick={handleFollow} data-cy="follow-button">Seguir</button>
        </div>
        {successMessage && <p className={styles.successMessage} data-cy="success-message">{successMessage}</p>}
        <button onClick={handleSwitchMode}>Trocar Modo</button>
      </div>
      {showFollowingModal && (
      <div className={styles.modalOverlay} data-cy="following-modal">
        <div className={styles.modal}>
          <h2>Seguindo</h2>
          {user.following.map((username) => (
            <div key={username} className={styles.followingClass} data-cy={`followingClass-${username}`}>
              <b><p style={{color: "#818181",}}>{username}</p></b>
              <button
                onClick={() => handleUnfollow(username)}
                style={{ margin: 0, width: '30%' }}
                data-cy={`unfollow-button-${username}`}>
                Unfollow
              </button>
            </div>
          ))}
          <button onClick={handleCloseModal}>Fechar</button>
        </div>
      </div>
      )}
      {showFollowersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Seguidores</h2>
            <div className={styles.followersModal}>
            {user.followers.map((username) => (
              <div key={username}>
                <p><b>{username}</b></p>
              </div>
            ))}
            </div>
            <button onClick={handleCloseModal}>Fechar</button>
          </div>
        </div>
      )}
      {showFollowRequestsModal && (
      <div className={styles.modalOverlay} data-cy="follow-requests-modal-overlay">
        <div className={styles.modal} data-cy="follow-requests-modal">
          <h2>Requisições para seguir</h2>
          {user.follow_requests.map((username) => (
            <div className={styles.buttonsFollow} key={username} data-cy={`follow-request-${username}`}>
              <div className={styles.nameFollow}>
              <p><b>{username}</b></p>
              </div>
              <button
                onClick={() => handleAcceptFollowRequest(username)}
                data-cy={`accept-request-${username}`}
              >
                Aceitar
              </button>
              <button
                onClick={() => handleRejectFollowRequest(username)}
                data-cy={`reject-request-${username}`}
              >
                Rejeitar
              </button>
            </div>
          ))}
          <button onClick={handleCloseModal} data-cy="close-follow-requests-modal">
            Fechar
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default UserProfile;
