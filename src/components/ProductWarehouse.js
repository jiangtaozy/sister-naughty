/*
 * Maintained by jemo from 2021.2.18 to now
 * Created by jemo on 2021.2.18 17:37:44
 * Product Warehouse
 * 仓库
 */

import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import { apiUrl } from '../config';
import axios from 'axios';
import useSnackbarState from './hooks/useSnackbarState';

function ProductWarehouse() {

  const [ list, setList ] = useState([]);
  const [ isFetchMore, setIsFetchMore ] = useState(true);
  const {
    snackbarState: {
      message,
      open,
      autoHideDuration,
    },
    handleOpenErrorSnackbar,
    handleCloseSnackbar,
  } = useSnackbarState();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get('/mainImagesList');
        setList(prevList => prevList.concat(data));
      }
      catch(err) {
        console.error('ProductWarehouse.js-catch-error: ', err)
        handleOpenErrorSnackbar({
          message: `出错了：${err.message || (err.response && err.response.data)}`,
        });
      }
    }
    if(isFetchMore) {
      fetchList();
    }
  }, [isFetchMore]);

  const onChangeIndex = (index, indexLatest, meta) => {
    if(index === (list.length - 1)) {
      setIsFetchMore(true);
    } else {
      setIsFetchMore(false);
    }
  }

  const imageList = list.map((image, index) =>
    <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <img
        style={{
          height: '100vh',
          objectFit: 'contain',
        }}
        src={`${apiUrl}/${image.imgPath}`}
        alt=''
      />
    </div>
  );

  return (
    <div>
      <SwipeableViews
        axis='y'
        containerStyle={{
          height: '100vh',
        }}
        onChangeIndex={onChangeIndex}
        resistance>
        { imageList }
      </SwipeableViews>
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
    </div>
  );
}

export default ProductWarehouse;
