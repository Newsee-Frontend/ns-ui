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
export default {
  install: function (Vue, options) {
    Vue.prototype.grid = {
      //请求表格的内容数据
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
    }
  }
};

