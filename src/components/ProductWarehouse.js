/*
 * Maintained by jemo from 2021.2.18 to now
 * Created by jemo on 2021.2.18 17:37:44
 * Product Warehouse
 * 仓库
 */

import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import useSnackbarState from './hooks/useSnackbarState';
import { apiUrl } from '../config';
import axios from 'axios';

function ProductWarehouse() {

  const [ list, setList ] = useState([]);
  const [ start, setStart ] = useState(Date.now());
  const { snackbar, handleOpenErrorSnackbar } = useSnackbarState();

  const fetchList = async () => {
    try {
      const { data } = await axios.get('/mainImagesList');
      setList(prevList => prevList.concat(data));
    }
    catch(err) {
      console.error('ProductWarehouse.js-catch-error: ', err);
      handleOpenErrorSnackbar(`出错了：${(err.response && err.response.data) || err.message}`);
    }
  }

  useEffect(() => {
    fetchList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeIndex = (index, indexLatest, meta) => {
    uploadMainImageBrowseRecord(indexLatest);
    if(index === (list.length - 1)) {
      fetchList();
    }
  }

  const uploadMainImageBrowseRecord = async (index) => {
    const end = Date.now();
    const duration = end - start;
    const imageId = list[index].id;
    const jwt = localStorage.getItem('jwt');
    try {
      const { data } = await axios.post('/mainImageBrowseRecord', {
        jwt,
        imageId,
        start,
        end,
        duration,
      });
      if(data !== 'ok') {
        console.error('ProductWarehouse.js-upload-main-image-browse-record-data-error: ', data);
        handleOpenErrorSnackbar(`出错了：${data}`);
      }
    }
    catch(err) {
      console.error('ProductWarehouse.js-upload-main-image-browse-record-error: ', err);
      handleOpenErrorSnackbar(`出错了：${(err.response && err.response.data) || err.message}`);
    }
    setStart(end);
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
        src={`${apiUrl}/image/${image.imgPath}`}
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
      { snackbar }
    </div>
  );
}

export default ProductWarehouse;
