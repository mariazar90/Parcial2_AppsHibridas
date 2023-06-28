import './UsuarioCreado.css';

function UsuarioCreado() {
  return (
    <div className="usuario-creado-container">
      <h1>¡Tu usuario fue creado con éxito!</h1>
      <p>
        Ya puedes <a href="./login">Iniciar Sesión</a> con tu usuario y contraseña.
      </p>
    </div>
  );
}

export default UsuarioCreado;