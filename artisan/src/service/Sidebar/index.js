/*
 * login-fetch for login
 * created: 2019/4/20.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2019 Broccoli spring( gcx )
 */
/*==========================================================================================================================*/
import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';

/*==========================================================================================================================*/

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
