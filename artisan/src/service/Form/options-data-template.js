import fetch from '@/fetch/fetch';
import { dataFilter } from '@/fetch/fetchDataType';


/**
 * options data template service
 * @param query
 */
export const optionsDataTemplateService = query => {
  dataFilter(query);

  return fetch({
    url: '/form/options-data/template',
    method: 'post',
    data: query,
  });
};
