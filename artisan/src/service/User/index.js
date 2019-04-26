import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';

/**
 * login
 * @param query
 */
export const oauthlogin = query => {
  dataFilter(query);

  return fetch({
    url: '/oauth/oauth/query-user-enterprise',
    method: 'post',
    data: query,
  });
};
