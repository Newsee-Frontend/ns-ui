import {getMockQuery} from '../../utils/index'
import headList from './headData'
import errorMap from '../error/error'

export const tableHead = {
  "resultCode": "200",
  "resultMsg": "操作成功",
  "resultData": {
    "columns": headList,
    "columnsEnNames": {}
  },
};

export default {
  tableHead: config => {
    const pageName = getMockQuery(config, "page");
    if (pageName === 'normal') {
      return tableHead;
    }
  },
  grid_error: config => {
    return errorMap.grid_error;
  },
}
