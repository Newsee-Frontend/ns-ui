import { normalListColumn, newFormlistColumn, formlistColumn } from './data/listColumn';
import { normalTableData, formTableData, newFormTableData } from './data/listData';

/**
 * 表数据分发
 * @param req
 * @param res
 * @returns {any | Promise<any>}
 */
const listDataDistribute = (req, res) => {
  console.log(req.body);
  const { pageNum, pageSize, total, mockType } = req.body;

  console.log(`当前请求表格数据的类型为：${mockType}`);
  let list = null;

  /*
   * 状态类型
   * service-error => 服务错误
   * no-result => 无表格数据
   * normal => 获取常规表格数据
   * form => 获取表单表格数据
   */
  if (mockType === 'service-error') {
    list = {};
  }
  else if (mockType === 'no-result') {
    list = [];
  }
  else if (mockType === 'normal') {
    list = normalTableData(total).slice((pageNum - 1) * pageSize, pageSize * pageNum);
  }
  else if (mockType === 'form') {
    list = formTableData(total).slice((pageNum - 1) * pageSize, pageSize * pageNum);
  }
  else if (mockType === 'newform') {
    console.log('newform-newform-newform');

    list = newFormTableData(pageSize);
  }

  console.log(list);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      list: list,
      pageNum: pageNum,
      pageSize: pageSize,
      size: pageSize,
      total: total,
      nextPage: parseInt(pageNum) + 1,
      lastPage: parseInt(pageNum) - 1,
    },
  });
};

/**
 * 表头分发
 * @param req
 * @param res
 * @returns {any | Promise<any>}
 */
const listColumnDistribute = (req, res) => {
  const { mocktype } = req.headers;
  let column = null;

  if (mocktype === 'normal') {
    column = normalListColumn;
  }
  else if (mocktype === 'form') {
    column = formlistColumn;
  }
  else if (mocktype === 'newform') {
    column = newFormlistColumn;
  }

  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      columns: column,
      columnsEnNames: {
        hasRelevance: '',
        isBlockUp: '',
        isLock: '',
        isVirtual: '',
        roomPropertyId: '',
        roomTypeId: '',
      },
    },
  });
};

module.exports = {
  'GET /system/column/list-column': listColumnDistribute,
  'POST /system/table/table-data': listDataDistribute,
};
