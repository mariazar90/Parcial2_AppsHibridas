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
    const [type, setType] = useState(false)
    const [message, setMessage] = useState("")

    const openSnackbar = (msg, typeSnackbar) =>{
        setMessage(msg);
        setOpen(true);
        setType(typeSnackbar)
    }
    const onClose = () =>{
        setOpen(false);
        setMessage("");
    }

    return (
        <SnackbarContext.Provider value={{openSnackbar, onClose, open, message, type}}>
          {children}
        </SnackbarContext.Provider>
      )
}

export {
    SnackbarProvider,
    useSnackbar,
    setSnackbar
}