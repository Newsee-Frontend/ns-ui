import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';


/**
 * select tree service
 * @param query
 */
export const selectTreeService = query => {
  dataFilter(query);

  return fetch({
    url: '/form/select-tree/optionslist',
    method: 'post',
    data: query,
  });
};
