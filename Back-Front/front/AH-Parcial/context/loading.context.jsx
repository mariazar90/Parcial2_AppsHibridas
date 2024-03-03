import { useMemo, useCallback  } from 'react';
import { createContext, useContext , useState } from 'react';

const LoadingContext = createContext();

function useLoading(){
    return useContext(LoadingContext);
}

function LoadingProvider({children}){
    const [loading, setLoading] = useState(false)

    const value = useMemo(()=>{
        return {
            loading,
            setLoading,
        }
    },[loading,setLoading])

    return (
        <LoadingContext.Provider value={value}>
          {children}
        </LoadingContext.Provider>
      )
}

export {
    LoadingProvider,
    useLoading
}