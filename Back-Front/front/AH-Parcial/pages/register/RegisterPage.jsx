import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as accountServices from '../../services/account/account.services.js';
import './RegisterPage.css';
import UsuarioCreado from '../../pages/usuariocreado/usuariocreado.jsx'

function RegisterPage(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verificationPassword, setVerificationPassword] = useState('');
    const [error, setError] = useState('');

    const changeUserName = (event) => {
        setUserName(event.target.value)
    }
    const changePassword = (event) => {
        setPassword(event.target.value)
    }
    const changeVerificationPassword = (event) => {
        setVerificationPassword(event.target.value)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(password != verificationPassword) 
        setError('Las contraseñas no coinciden')
        else {
            accountServices.register(userName, password)
            .then(data =>{
                setError('')
                console.log("Usuario creado", data);
                navigate('/usuariocreado');
                /* navigate('/login', {replace:true}); */
            })
            .catch(err => {
                console.log("err:", err);
                setError(err.error.message)
            })
        }
    }

    return (
        <div className="login-page">
            <h1>Register</h1>
            <form className="login-form" onSubmit={onSubmit}>
                <h2  className="login-form__title">Iniciar Sesión</h2>
                <label  className="login-form__field">
                    Nombre de usuario:
                    <input type="text" value={userName} onChange={changeUserName}/>
                </label>
                <label  className="login-form__field">
                    Contraseña:
                    <input type="password" value={password} onChange={changePassword}/>
                </label>
                <label  className="login-form__field">
                    Repita la Contraseña:
                    <input type="password" value={verificationPassword} onChange={changeVerificationPassword}/>
                </label>
                <p className="login-form__error">{error}</p>
                <button type="submit"  className="login-form__submit">Crear</button>
                <p>
                    <a href="/Login">Ya tengo cuenta</a>
                </p>
            </form>
        </div>
    )
}
export default RegisterPage