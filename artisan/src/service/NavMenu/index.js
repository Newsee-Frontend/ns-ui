import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';

/**
 * role- nav menu request
 * @param query
 */
export const navMenuService = query => {
  dataFilter(query);

  return fetch({
    url: '/system/permission/list-menu',
    method: 'post',
    data: query,
  });
};
