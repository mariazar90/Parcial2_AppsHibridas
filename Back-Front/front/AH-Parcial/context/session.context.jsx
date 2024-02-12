import { createContext, useContext , useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
        profileServices.getCurrent()
        .then((profile) => {
        setProfile(profile)
        })
        .catch((err) => {
            console.log("err:", err);
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