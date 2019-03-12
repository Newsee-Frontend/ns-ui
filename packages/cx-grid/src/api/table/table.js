import fetch from '@/utils/fetch/fetch'
import {dataFilter} from '@/utils/fetch/fetchDataType'


export function tableHeaderFetch(head, query) { // 表头数据-获取
  dataFilter(head);
  dataFilter(query)
  return fetch({
    url: '/system/column/list-column',
    method: 'get',
    headers: head,
    params: query,
  })
}

/**
 * 表数据-获取,表格数据获取
 */
export function gridDataFetch(url, query) {
  dataFilter(query);
  return fetch({
    url: url,
    method: 'post',
    data: query
  })
}
