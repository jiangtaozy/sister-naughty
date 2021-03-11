/*
 * Maintained by jemo from 2021.3.10 to now
 * Created by jemo on 2021.2.10 18:31:47
 * UseSnackbarState
 */

import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

function useSnackbarState() {

  const [ snackbarState, setSnackbarState ] = useState({
    message: '',
    open: false,
    autoHideDuration: null,
  });
  const {
    message,
    open,
    autoHideDuration,
  } = snackbarState;

  function handleOpenSnackbar(message) {
    setSnackbarState({
      message,
      open: true,
      autoHideDuration: 2000,
    });
  }

  function handleOpenErrorSnackbar(message) {
    setSnackbarState({
      message,
      open: true,
      autoHideDuration: null,
    });
  }

  function handleCloseSnackbar() {
    setSnackbarState({
      open: false,
    });
  }

  const snackbar = (
    <Snackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleCloseSnackbar}
      message={message}
    />
  );

  return {
    snackbar,
    handleOpenSnackbar,
    handleOpenErrorSnackbar,
    handleCloseSnackbar,
  };
}

export default useSnackbarState;
