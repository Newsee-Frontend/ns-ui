import { normalListColumn, formlistColumn } from './data/listColumn';
import { normalTableData, formTableData } from './data/listData';

/**
 * 表数据分发
 * @param req
 * @param res
 * @returns {any | Promise<any>}
 */
const listDataDistribute = (req, res) => {
  const { pageNum, pageSize, organizationId, mockType } = req.body;

  const total = organizationId === 2 ? 40 : 100;

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
  } else if (mockType === 'no-result') {
    list = [];
  } else if (mockType === 'normal') {
    list = normalTableData(total).slice((pageNum - 1) * pageSize, pageSize * pageNum);
  } else if (mockType === 'form') {
    list = formTableData(total).slice((pageNum - 1) * pageSize, pageSize * pageNum);
  }

  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      list: list,
      pageNum: 1,
      pageSize: 10,
      size: 10,
      total: total,
      nextPage: 2,
      lastPage: 8,
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
  } else if (mocktype === 'form') {
    column = formlistColumn;
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
