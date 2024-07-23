// UserHeader.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const userHeaderStyle = {
      display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  marginTop: '10px' 
};

const UserHeader: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <header style={userHeaderStyle}>
      <div style={{ flex: 1 }}>
      </div>
      <nav style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to={`/user/get_user/${userId}`} style={{ textDecoration: 'none', color: '#221F1F' }}><b>Perfil</b></Link>
        <Link to={`/user/reset_password/${userId}`} style={{ textDecoration: 'none', color: '#221F1F' }}><b>Redefinir Senha</b></Link>
        <Link to={`/user/edit_user_info/${userId}`} style={{ textDecoration: 'none', color: '#221F1F' }}><b>Editar Informações</b></Link>
        <Link to={`/user/delete_account/${userId}`} style={{ textDecoration: 'none', color: '#221F1F' }}><b>Deletar Conta</b></Link>
      </nav>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '5px', gap: '10px' }}>
      </div>
    </header>
  );
};

export default UserHeader;
