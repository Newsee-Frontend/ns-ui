import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';

/**
 * role-side-bar
 * @param query
 */
export const sideBarService = query => {
  dataFilter(query);

  return fetch({
    url: '/system/permission/list-menu',
    method: 'post',
    data: query,
  });
};
