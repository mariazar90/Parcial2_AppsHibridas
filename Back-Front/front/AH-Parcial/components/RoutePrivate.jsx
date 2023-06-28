import { Navigate } from "react-router-dom";

function RouterPrivate({children}){
    if(!localStorage.getItem('token')){
        return <Navigate to="/login" />
    }
    return children
}

export default RouterPrivate