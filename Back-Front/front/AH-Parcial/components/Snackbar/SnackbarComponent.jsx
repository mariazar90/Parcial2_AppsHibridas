
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useSnackbar } from '../../context/snackbar.context'

function SnackbarComponent(){
  const { onClose, open, message, type } = useSnackbar();

   return (
    <>
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={open}
        onClose={onClose}
        autoHideDuration={5000}
      >
        <Alert
          onClose={onClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
   )
}

export default SnackbarComponent