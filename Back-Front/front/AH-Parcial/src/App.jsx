import { Outlet } from 'react-router-dom'
import { SnackbarProvider } from '../context/snackbar.context.jsx';
import { SessionProvider } from '../context/session.context.jsx';
import Footer from './Footer.jsx'
import SnackbarComponent from '../components/Snackbar/SnackbarComponent.jsx';
import MainHeader from '../components/MainHeader/MainHeader.jsx';
import './App.css'
import { LoadingProvider } from '../context/loading.context.jsx';

function App() {
  

 return (
  <LoadingProvider>
    <SnackbarProvider>
      <SessionProvider >
        <SnackbarComponent></SnackbarComponent>
        <MainHeader></MainHeader>
        <Outlet></Outlet>
        <Footer></Footer>
      </SessionProvider>
    </SnackbarProvider>
  </LoadingProvider>
  )
}

export default App
