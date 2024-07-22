
const LikesPage = () => {
  const usuarios = ['Usuário 1', 'Usuário 2', 'Usuário 3', 'Usuário 4', 'Usuário 5', 'Usuário 6'];

  return (
    <div style={{ padding: '20px' }}>
    <h2>Usuários que Curtiram</h2>
    <div style={{ border: '1px solid #000', height: '300px', overflowY: 'scroll' }}>
        {usuarios.map((usuario, index) => (
        <div key={index} style={{ borderBottom: '1px solid #000', padding: '10px' }}>
            {usuario}
        </div>
        ))}
    </div>
    </div>
  );
};

export default LikesPage;
