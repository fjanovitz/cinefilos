import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import logo from '/src/shared/assets/logo.png'
import { UserContext } from '../../context/UserContext';

const Header: React.FC = () => {
  const {user, saveUser} = useContext(UserContext);
  return (
    <header className={styles.headerContainer}>
      <div style={{ flex: 1 }}>
        <img className={styles.logoImg} src={logo} />
      </div>
      <nav className={styles.navContainer} >
        <Link to="/contents/movies" style={{textDecoration: 'none', color: 'white'}} >Filmes</Link>
        <Link to="/contents/tv_shows" style={{textDecoration: 'none', color: 'white'}} >Séries</Link>
        <Link to="/forum/feed" style={{textDecoration: 'none', color: 'white'}} >Fórum</Link>
      </nav>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '5px', gap: '10px' }}>
        <Link to={`/profile/${user?.username ?? ""}`} style={{textDecoration: 'none', color: 'white'}} data-cy="Username"> {user?.username ?? "Nome do usuário"} </Link>
        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
    </header>
  );
};

export default Header;