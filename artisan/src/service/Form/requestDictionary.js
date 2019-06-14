import fetch from '../../fetch/fetch';
import { dataFilter } from '../../fetch/fetchDataType';

//base request data for dictionary
const baseQuery = {
  companyId: 2,
  departmentId: 0,
  organizationId: 3,
  dictionaryitemDictionaryId: '',
  filterList: [],
  pageNum: 1,
  pageSize: 10,
  orderBy: '',
  orderFieldName: '',
  mainSearch: '',
  filterConditions: [],
  otherConditions: {},
  size: '',
  treeConditions: [{ comparison: 'LIKE', fieldName: 'path', fieldValue: '/', type: 'text' }],
  dictionaryGroupId: '',
};
/**
 * fetch 远端数据
 * @param url
 * @param params
 */
const getOptionFromDictionary = (url, params) => {
  //Filter data
  dataFilter(params);
  //fetch out
  return fetch({
    url: url,
    method: 'get',
    data: params,
    params: {
      dictionaryitemDictionaryId: params.dictionaryitemDictionaryId,
      dictionaryGroupId: params.dictionaryGroupId,
    },
  });
};

const getDynamicOptions = (url, queryData)=> {
  let params = Object.assign({}, baseQuery, queryData);
  return getOptionFromDictionary(url, params)
}

export default getDynamicOptions;
