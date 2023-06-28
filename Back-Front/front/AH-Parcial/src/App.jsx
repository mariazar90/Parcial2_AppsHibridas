import { Outlet, useNavigate } from 'react-router-dom'
import * as accountServices from '../services/account/account.services.js';
import './App.css'
import Footer from './Footer.jsx'

function App() {
  const navigate = useNavigate();
  const onLogOut = () =>{
    accountServices.logout();
    navigate('/login', {replace:true});
  }

 return (
    <div>
      <header className='header-list'>
        <h1>GoFit</h1>
      <nav className='nav-list'>
        <ul className='nav-list_item'>
          <li><a href="/">Home</a></li>
          <li><a href="/diet">Dietas</a></li>
          <li><a href="/exercises">Ejercicios</a></li>
          <li><a href="/routines">Rutinas</a></li>
          <li><a onClick={onLogOut}>Cerrar sesion</a></li>
        </ul>
      </nav>
      </header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
