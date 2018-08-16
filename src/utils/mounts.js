/*=====================================================================================================================*/
/*
 * auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/3.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*=====================================================================================================================*/

import {gridDataFetch} from '../api/table/table'
import {checkRange} from '../utils/index'

export default {
  install: function (Vue, options) {
    Vue.prototype.grid = {
      //请求表格的内容数据
      /**
       * grid fetch
       * @param requestData
       * @param successcb
       * @param errorcb
       */
      fetch: (requestData, successcb, errorcb) => {
        // $store.dispatch('gridDataFetch', {gridID, url, query});
        gridDataFetch(requestData.url, requestData.query)
          .then(res => {
            successcb(res.resultData);

          })
          .catch(res => {
            errorcb(res);
          })
      },
      /**
       * grid validate
       * @param gridCheck
       * @returns {Promise<any>}
       */
      validate: (gridCheck) => {
        return new Promise((resolve, reject) => {
          try {
            gridCheck.state = 'all-check';
            let status = false;
            let submitHandle = () => {
              status = checkRange('.grid-container', '.cx-is-error');
              if (status) {
                window.clearTimeout(submitHandle);
                resolve(gridCheck);
              }
              else {
                window.clearTimeout(submitHandle);
                reject(gridCheck);
              }
            };
            setTimeout(submitHandle, 0);
          }
          catch (e) {
            // statements to handle any exceptions
            throw 'Please check the automatic grid validation method. There are some errors in the internal code.'
          }
        })
      },
      /**
       * grid reValidate
       * @param gridCheck
       * @returns {Promise<any>}
       */
      reValidate: (gridCheck) => {
        return new Promise((resolve, reject) => {
          try {
            gridCheck.state = 'empty-check-list';
            let resetHandle = () => {
              if (gridCheck.list.length === 0) {
                window.clearTimeout(resetHandle);
                resolve(gridCheck);
              }
              else {
                window.clearTimeout(resetHandle);
                reject(gridCheck);
              }
            };
            setTimeout(resetHandle, 0);
          }
          catch (e) {
            // statements to handle any exceptions
            throw 'Please check the automatic grid validation method. There are some errors in the internal code.'
          }
        })
      },
    };
  }
};

