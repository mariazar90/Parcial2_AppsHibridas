import { useMemo, useCallback  } from 'react';
import { createContext, useContext , useState } from 'react';

const SnackbarContext = createContext();

function useSnackbar(){
    return useContext(SnackbarContext);
}

function setSnackbar(){
    const { openSnackbar } = useSnackbar()
    return openSnackbar;
}

function SnackbarProvider({children}){
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('success')
    const [message, setMessage] = useState("")

    const openSnackbar = useCallback((msg, typeSnackbar) =>{
        setMessage(msg);
        setOpen(true);
        setType(typeSnackbar)
    },[setMessage,setOpen,setType]);

    const onClose = useCallback(() =>{
        setOpen(false);
        setMessage("");
    },[setOpen,setMessage])

    const value = useMemo(()=>{
        return {
            openSnackbar,
            onClose,
            open,
            message,
            type
        }
    },[openSnackbar,onClose,open,message,type])

    return (
        <SnackbarContext.Provider value={value}>
          {children}
        </SnackbarContext.Provider>
      )
}

export {
    SnackbarProvider,
    useSnackbar,
    setSnackbar
}