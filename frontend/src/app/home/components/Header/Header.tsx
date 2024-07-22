import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import logo from '/src/shared/assets/logo.png'

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div style={{ flex: 1 }}>
        <img className={styles.logoImg} src={logo} />
      </div>
      <nav className={styles.navContainer} >
        <Link to="/contents/movies" style={{textDecoration: 'none', color: 'white'}} >Filmes</Link>
        <Link to="/contents/tv_shows" style={{textDecoration: 'none', color: 'white'}} >Séries</Link>
        <Link to="/tests" style={{textDecoration: 'none', color: 'white'}} >Posts</Link>
      </nav>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '5px', gap: '10px' }}>
        <Link to="/profile" style={{textDecoration: 'none', color: 'white'}} > Nome do Usuário </Link>
        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
    </header>
  );
};

export default Header;