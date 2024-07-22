import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{background: '#221f1f',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div style={{ flex: 1 }}>
        <h1 style = {{color: '#f4d30b'}}>CInéfilos</h1>
      </div>
      <nav style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/contents/movies" style={{textDecoration: 'none', color: 'white'}} >Filmes</Link>
        <Link to="/contents/tv_shows" style={{textDecoration: 'none', color: 'white'}} >Séries</Link>
        <Link to="/forum/feed" style={{textDecoration: 'none', color: 'white'}} >Fórum</Link>
      </nav>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '5px', gap: '10px' }}>
        <Link to="/profile" style={{textDecoration: 'none', color: 'white'}} > Nome do Usuário </Link>
        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
    </header>
  );
};

export default Header;