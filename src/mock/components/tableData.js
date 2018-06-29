import {arrContainObj} from '../../utils/index'
import Mock from 'mockjs'
import headList from './headData'

/**
 * get current page data total list
 * @param tableList     （ table data List ）
 * @param headList      （ table head List ）
 * @returns {{}}
 * @private
 */
function _getTotalList(tableList, headList) {
  let obj = {};
  let attrList = [];
  //get attrList
  headList.forEach(item => {
    if (item.resourcecolumnXtype === 'number') {
      attrList.push(item.resourcecolumnNameEn);
    }
  });
  //get Total list
  tableList.forEach((item, index) => {
    for (let key in item) {
      if (arrContainObj(attrList, key)) {
        obj[key] = Number(obj[key] ? obj[key] : 0) + Number(item[key])
      }
      else {
        obj[key] = '';
      }
    }
  });
  return obj;
}

/**
 * 表格输出信息
 * @param type        输出类型
 * @param min         数据最小长度
 * @param max         数据最大长度
 * @param start       分页条目开始索引
 * @param end         分页条目结束索引
 * @param headList    表头数据
 * @returns {{resultCode: string, resultMsg: string, resultData: {pageNum: number, pageSize: number, size: number, total: number, totalInfo: Array, list: Array}}}
 * @private
 */
function _response(type, min, max, start, end, headList) {
  const gridInfo = mockTableFn_normal(min, max, type);//获取表格模拟数据
  const tableList = gridInfo.list.slice(start - 1, end);//通过分页条件获取表格范围数据
  tableData.resultData.allTotal = _getTotalList(gridInfo.list, headList);//获取表格全部 - 合计对象信息
  tableData.resultData.totalInfo = _getTotalList(tableList, headList);//获取表格当前页 - 合计对象信息
  tableData.resultData.total = gridInfo.total;//总条目
  tableData.resultData.list = tableList;//表格范围数据
  return tableData;
}


/**
 * mockTableFn_normal
 * @param min
 * @param max
 * @param type
 * @returns {{list: Array, total: *}}
 */
let mockTableFn_normal = (min, max, type) => {
  const list = [];
  const count = Mock.Random.float(min, max, 0, 0);
  for (let i = 0; i < count; i++) {
    const obj = Mock.mock({
      index: i + 1,//序号
      taskName: '@cname',//项目名称
      date: '@datetime',//成立日期
      sum: '@float(150, 200, 0, 0)',//总金额 （需要合计）
      actualSum: '@float(100, 150, 0, 0)',//实际金额（需要合计）
      TaxRate: Mock.Random.float(1, 5, 0, 1),//税率
      ownerName: '@cname',//使用人
      province: Mock.Random.province(),//省份
      city: Mock.Random.city(true),//城市
      address: Mock.Random.county(true),//地址
      zip: Mock.Random.zip(),//右边
      Remark: '',//备注
    });
    if (type === 'fnsclick') {
      obj.fnsclick = [{label: '编辑', value: 'gridEditBtn'}, {label: '删除', value: 'actionRemoveBtn'}, {
        label: '锁定',
        value: 'lock'
      }]//操作栏数据
    }
    list.push(obj);
  }
  return {list: list, total: count};
};


const tableData = {
  "resultCode": "200",
  "resultMsg": "操作成功",
  "resultData": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 10,
    "total": 0,
    "totalInfo": [],
    "allTotal": [],
    "list": [],
  },
};


export default {
  normal_tableData: config => {
    const {pageNum} = JSON.parse(config.body);//当前页数
    const {pageSize} = JSON.parse(config.body);//每页显示条目个数
    const start = (pageNum - 1) * pageSize + 1;//分页条目开始索引
    const end = pageNum * pageSize;//分页条目结束索引
    return _response('fnsclick', 30, 30, start, end, headList);
  },
  fnsclick_tableData: config => {
    const {pageNum} = JSON.parse(config.body);//当前页数
    const {pageSize} = JSON.parse(config.body);//每页显示条目个数
    const start = (pageNum - 1) * pageSize + 1;//分页条目开始索引
    const end = pageNum * pageSize;//分页条目结束索引
    return _response(null, 30, 30, start, end, headList);
  },
}


//
// const tableData = {
//   "resultCode": "200",
//   "resultMsg": "操作成功",
//   "resultData": {
//     "pageNum": 1,
//     "pageSize": 10,
//     "size": 10,
//     "orderBy": null,
//     "startRow": 1,
//     "endRow": 10,
//     "total": 0,
//     "pages": 3,
//     "list": [],
//     "firstPage": 1,
//     "prePage": 0,
//     "nextPage": 2,
//     "lastPage": 3,
//     "isFirstPage": true,
//     "isLastPage": false,
//     "hasPreviousPage": false,
//     "hasNextPage": true,
//     "navigatePages": 8,
//     "navigatepageNums": [1, 2, 3]
//   },
// }

// console.log('arrarrarrarrarrarrarrarr')
// console.log(tableHead)
// const th = tableHead.resultData.columns
//
//
// const arr = th.map((item, index) => {
//   for (let key in obj) {
//     if (item['resourcecolumnNameEn'] === key) {
//       item = obj[key];
//       console.log(index)
//       console.log(item)
//       break;
//     }
//     else {
//       item = '';
//       console.log(index)
//       console.log(item)
//     }
//   }
//   return item;
// })
//
// console.log(arr)
