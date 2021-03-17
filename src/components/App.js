/*
 * Maintained by jemo from 2021.2.17 to now
 * Created by jemo on 2021.2.17 17:31:30
 * App
 */

import { useEffect } from 'react';
import ProductWarehouse from './ProductWarehouse';
import axios from 'axios';
import useSnackbarState from './hooks/useSnackbarState';
import { apiUrl, productionENV } from '../config';

function App() {

  const {
    snackbar,
    handleOpenErrorSnackbar,
  } = useSnackbarState();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const code = params.get("code");
      const redirectToGetCode = (scope) => {
        const redirectUrl = `${apiUrl}/oauth${scope ? ('?scope=' + scope) : ''}`;
        if(productionENV) {
          window.location.href = redirectUrl;
        }
      }
      if(code) {
        const getJWT = async () => {
          try {
            const { data } = await axios.get('/jwt', {
              params: {
                code,
              },
            });
            const {
              scope,
              jwt,
            } = data;
            if(scope) {
              redirectToGetCode(scope);
            } else if(jwt) {
              localStorage.setItem('jwt', jwt);
            } else {
              console.error('App.js-scope-and-jwt-null-error')
              handleOpenErrorSnackbar('出错了: scope-and-jwt-null-error');
            }
          }
          catch(err) {
            console.error('App.js-get-jwt-catch-error: ', err)
            handleOpenErrorSnackbar(`出错了：${(err.response && err.response.data) || err.message}`);
          }
        }
        getJWT();
      } else {
        redirectToGetCode();
      }
    }
  }, [])

  return (
    <div>
      <ProductWarehouse />
      { snackbar }
    </div>
  );
}

export default App;
