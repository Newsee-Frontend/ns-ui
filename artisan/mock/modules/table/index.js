import { hugeDataListColumn, formlistColumn } from './data/listColumn';
import { hugeDataTableData, formTableData } from './data/listData';

/**
 * 表数据分发
 * @param req
 * @param res
 * @returns {any | Promise<any>}
 */
const listDataDistribute = (req, res) => {
  console.log(req);
  console.log(req.body);
  if (!req.body) return;
  const { pageNum, pageSize, total, mockType } = req.body;

  console.log(`当前请求表格数据的类型为：${mockType}`);
  let list = null;

  /*
   * 状态类型
   * no-result => 无表格数据
   * hugeData-table => 获取大数据表格数据
   * form-table => 获取大数据表格数据
   */

  if (mockType === 'no-result') {
    list = [];
  }
  //大数据 - 表格 （非表单表格)
  else if (mockType === 'hugeData-table') {
    list = hugeDataTableData(pageSize);
  }
  //表单 - 表格
  else if (mockType === 'form-table') {
    list = formTableData(pageSize);
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
  const { mockcoltype } = req.headers;
  let column = null;

  /*
    * 状态类型
    * hugeData-table => 大数据表格表头数据
    * form-table => 获取表单表格表头数据
    * service-error => 服务错误
    */
  if (mockcoltype === 'hugeData-table') {
    column = hugeDataListColumn;
  }
  else if (mockcoltype === 'form-table') {
    column = formlistColumn;
  }
  else if (mockcoltype === 'service-error') {
    column = null;
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


/**
 * 改变表头数据
 * @param req
 * @param res
 * @returns {any | Promise<any>}
 */
const changelistColumn = (req, res) => {

  const column = formlistColumn.map((col, index) => {
    if (index < 4) {
      col.resourcecolumnHidden = '1';
      return col;
    }
    return col;
  });

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
  'GET /system/column/list-column': (req, res) => {
    setTimeout(() => {
      return listColumnDistribute(req, res);
    }, 200);
  },
  'GET /system/column/change-list-column': changelistColumn,
  'POST /system/table/table-data': (req, res) => {
    setTimeout(() => {
      return listDataDistribute(req, res);
    }, 300);
  },
};
