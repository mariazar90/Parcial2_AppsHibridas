import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import * as accountServices from '../../services/account/account.services.js';
import './LoginPage.css';

function LoginPage(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const changeUserName = (event) => {
        setUserName(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        accountServices.login(userName, password)
        .then(data =>{
            setError('')
            navigate('/', {replace:true});
        })
        .catch(err => {
            setError(err.error.message)
        })
        
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
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
                <p className="login-form__error">{error}</p>
                <button type="submit"  className="login-form__submit">Entrar</button>
                <p>
                    <a href="/Register">Crear cuenta</a>
                </p>
            </form>
        </div>
    )
}
export default LoginPage