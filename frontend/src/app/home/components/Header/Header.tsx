import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div style={{ flex: 1 }}>
        <h1>Cinéfilos</h1>
      </div>
      <nav style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/contents" style={{textDecoration: 'none', color: 'black'}} >Contents</Link>
        <Link to="/tests" style={{textDecoration: 'none', color: 'black'}} >Posts</Link>
      </nav>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '5px', gap: '10px' }}>
        <Link to="/profile" style={{textDecoration: 'none', color: 'black'}} > Nome do Usuário </Link>
        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      </div>
    </header>
  );
};

export default Header;