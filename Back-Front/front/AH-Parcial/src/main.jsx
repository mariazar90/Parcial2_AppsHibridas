import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'
import HomePage from '../pages/home/HomePage.jsx'
import LoginPage from '../pages/login/LoginPage.jsx'
import DietListPage from '../pages/diet/DietListPage.jsx'
import DietPage from '../pages/diet/DietPage.jsx'
import ExerciseListPage from '../pages/exercise/ExerciseListPage.jsx'
import ExercisePage from '../pages/exercise/ExercisePage.jsx'
import RouterPrivate from '../components/RoutePrivate.jsx'
import RegisterPage from '../pages/register/RegisterPage.jsx'
import RoutineListPage from '../pages/routines/RoutineListPage.jsx'
import UsuarioCreado from '../pages/usuariocreado/UsuarioCreado.jsx'
import RoutinePage from '../pages/routines/RoutinePage.jsx'
import CreateRoutinePage from '../pages/routines/NewRoutine.jsx'
import ProfilePage from '../pages/profile/PerfilPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterPrivate><App /></RouterPrivate> ,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        path: '',
        element: <HomePage/>
      },  
      {
        path: 'diet',
        element: <DietListPage/>
      },  
      {
        path: 'diet/:idDiet',
        element: <DietPage/>
      },
      {
        path: 'exercises',
        element: <ExerciseListPage/>
      },  
      {
        path: 'exercises/:idExercise',
        element: <ExercisePage/>
      },  
      {
        path: 'routines',
        element: <RoutineListPage/>
      }, 
      {
        path: 'routine/new',
        element: <CreateRoutinePage/>
      },
      {
        path: 'routine/:idRoutine',
        element: <RoutinePage/>
      },
      {
        path: 'profile',
        element: <ProfilePage/>
      }, 
    ]
  },
  {
    path: '/Login',
    element: <LoginPage/>
  },
  {
    path: '/Register',
    element: <RegisterPage/>
  },
  {
    path: '/usuariocreado',
    element: <UsuarioCreado/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
