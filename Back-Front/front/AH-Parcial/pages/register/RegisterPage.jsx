import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

import * as accountServices from '../../services/account/account.services.js';
import * as profileServices from '../../services/profile/profile.services.js';
import './RegisterPage.css';
import UsuarioCreado from '../../pages/usuariocreado/UsuarioCreado.jsx'

const steps = [
    'Create account',
    'Create profile',
    'Confirm account'
  ];

function RegisterPage(){
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0)
    const [account, setAccount] = useState({
        userName: '',
        email: '',
        password: '',
        verificationPassword: ''
    })
    const [error, setError] = useState('');

    const changeAccount = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitAccount = async (event) => {
        event.preventDefault();
        if(account.password != account.verificationPassword) 
        setError('Las contraseñas no coinciden')
        else {
            accountServices.register(account)
            .then(data =>{
                setError('')
                setActiveStep(1)
                navigate('/usuariocreado');
                /* navigate('/login', {replace:true}); */
            })
            .catch(err => {
                setError(err.error.message)
            })
        }
    }

    return (
        <div className="login-page">
                <h1>Register</h1>
                
                <form className="login-form" onSubmit={onSubmitAccount}>
                    <h2  className="login-form__title">Crear cuenta</h2>
                    <label  className="login-form__field">
                        Nombre de usuario:
                        <input name='userName' type="text" value={account.userName} onChange={(e)=>changeAccount(e)}/>
                    </label>

                    <label  className="login-form__field">
                        Email:
                        <input name='email' type="email" value={account.email} onChange={(e)=>changeAccount(e)}/>
                    </label>
                    <label  className="login-form__field">
                        Contraseña:
                        <input name='password' type="password" value={account.password} onChange={(e)=>changeAccount(e)}/>
                    </label>
                    <label  className="login-form__field">
                        Repita la Contraseña:
                        <input name='verificationPassword' type="password" value={account.verificationPassword} onChange={(e)=>changeAccount(e)}/>
                    </label>
                    <p className="login-form__error">{error}</p>
                    <button type="submit"  className="login-form__submit">Crear cuenta</button>
                    <p>
                        <a href="/Login">Ya tengo cuenta</a>
                    </p>
                </form>
            
        </div>
    )
}
export default RegisterPage