import { createContext, useContext , useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { setSnackbar } from './snackbar.context.jsx';
import * as accountServices from '../services/account/account.services.js';
import * as profileServices from '../services/profile/profile.services.js'

const SessionContext = createContext();

function useSession(){
    return useContext(SessionContext);
}

function useProfile(){
    const { profile } = useSession()
    return profile;
}

function SessionProvider({children}){
    
    const openSnackbar = setSnackbar();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    const updateProfileContext = (newValues) =>{
        const newProfile = {...profile, ...newValues}
        setProfile(newProfile)
    }
    const onLogOut = () =>{
        accountServices.logout();
        navigate('/login', {replace:true});
    }

    useEffect(() => {
        console.log("hola")
        profileServices.getCurrent()
        .then((profile) => {
        setProfile(profile)
        })
        .catch(({error}) => {
            if(error)
            openSnackbar(error.message, 'error')
        })
    }, []) 

    return (
        <SessionContext.Provider value={{profile, onLogOut, updateProfileContext}}>
          {children}
        </SessionContext.Provider>
      )
}

export {
    SessionProvider,
    useSession,
    useProfile
}