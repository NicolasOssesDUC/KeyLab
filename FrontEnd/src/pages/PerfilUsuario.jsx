import { useParams } from "react-router-dom";

function PerfilUsuario() {
  const { nombreUsuario } = useParams();

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre de usuario: {nombreUsuario}</p>
    </div>
  );
}

export default PerfilUsuario;
