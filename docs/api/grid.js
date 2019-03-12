// import fetch from '@/utils/fetch/fetch'
// import {dataFilter} from '@/utils/fetch/fetchDataType'
import request from '@/utils/request'

export function tableHeaderFetch(head, query) { // 表头数据-获取
  return request({
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
  return request({
    url: url,
    method: 'post',
    data: query
  })
}
