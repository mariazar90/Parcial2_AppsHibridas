import { Outlet } from 'react-router-dom'
import { SessionProvider } from '../context/session.context.jsx';
import Footer from './Footer.jsx'
import MainHeader from '../components/MainHeader/MainHeader.jsx';
import './App.css'

function App() {
  

 return (
    <SessionProvider >
        <MainHeader></MainHeader>
        <Outlet></Outlet>
        <Footer></Footer>
    </SessionProvider>
  )
}

export default App
