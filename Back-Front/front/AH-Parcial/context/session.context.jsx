import { createContext, useContext , useState, useEffect, useMemo, useCallback } from 'react';
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

    const updateProfileContext = useCallback((newValues) =>{
        const newProfile = {...profile, ...newValues}
        setProfile(newProfile)
    },[setProfile])

    const onLogOut = useCallback(() =>{
        accountServices.logout();
        navigate('/login', {replace:true});
    }, [navigate])

    useEffect(() => {
        profileServices.getCurrent()
        .then((profile) => {
        setProfile(profile)
        })
        .catch(({error}) => {
            if(error)
            openSnackbar(error.message, 'error')
        })
    }, [])

    const value = useMemo(()=>{
        return{
            profile,
            onLogOut,
            updateProfileContext
        }
    }, [profile, onLogOut, updateProfileContext])

    return (
        <SessionContext.Provider value={value}>
          {children}
        </SessionContext.Provider>
      )
}

export {
    SessionProvider,
    useSession,
    useProfile
}