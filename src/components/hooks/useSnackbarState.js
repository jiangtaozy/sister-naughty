/*
 * Maintained by jemo from 2021.3.10 to now
 * Created by jemo on 2021.2.10 18:31:47
 * UseSnackbarState
 */

import { useState } from 'react';

function useSnackbarState() {

  const [ snackbarState, setSnackbarState ] = useState({
    message: '',
    open: false,
    autoHideDuration: null,
  });

  const handleOpenSnackbar = ({ message }) => {
    setSnackbarState({
      message,
      open: true,
      autoHideDuration: 2000,
    });
  }

  const handleOpenErrorSnackbar = ({ message }) => {
    setSnackbarState({
      message,
      open: true,
      autoHideDuration: null,
    });
  }

  const handleCloseSnackbar = () => {
    setSnackbarState({
      open: false,
    });
  }

  return {
    snackbarState,
    handleOpenSnackbar,
    handleOpenErrorSnackbar,
    handleCloseSnackbar,
  };
}

export default useSnackbarState;
