import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';


export const listColumnService = (head, query) => {
  dataFilter(query);

  return fetch({
    url: '/system/column/list-column',
    method: 'get',
    headers: head,
    param: query,
  });
};


export const tableDataService = data => {
  dataFilter(data);

  return fetch({
    url: '/system/table/table-data',
    method: 'post',
    headers: {
      funcId: data.funcId,
      interceptorType: true, //当前页面是第二次进来的情况 && searchConditions 对象没有发生变化（用户没有操作分页或者更改任何查询条件）
    },
    data: data.query,

  });
};

