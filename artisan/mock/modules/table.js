const Mock = require('mockjs');

let tableDataTemplate = [...new Array(100)].map((item, index) => {
  return Mock.mock({
    taskName: function(n) {
      const task = n.context.currentContext.ownerName;
      return task + '的项目';
    },//项目名称
    isChecked: {
      picked: { value: 1 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '@datetime',//成立日期
    ownerName: '@cname',//使用人
    level: Mock.Random.float(1, 100, 0, 1),//等级调整
    field: {
      picked: { value: [1] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { value: 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    remark: '',//备注 Mock.Random.county(true)
  });
});

const tableData = (req, res) => {
  const { pageNum, pageSize } = req.body;
  const list = tableDataTemplate.slice((pageNum - 1) * pageSize, pageSize * pageNum);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      list: list,
      'pageNum': 1,
      'pageSize': 10,
      'size': 10,
      'total': 100,
      'nextPage': 2,
      'lastPage': 8,
    },
  });
};


const listColumn = (req, res) => {
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      columns: [
        {
          'resourcecolumnName': '项目名称',//label
          'resourcecolumnNameEn': 'taskName',//model-key
          'resourcecolumnCode': 'taskName',//model-key
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '200',//列的宽度
          'resourcecolumnOrder': '4',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'link',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': 0,
            'min': 0,
            'placeHolder': '',
            'require': true,
            'validateRule': null,
            'errorMsg': '',
          },
        },
        {
          'resourcecolumnName': '是否审核',//label
          'resourcecolumnNameEn': 'isChecked',//model-key
          'resourcecolumnCode': 'isChecked',//model-key
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '120',//列的宽度
          'resourcecolumnOrder': '4',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'select',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': 0,
            'min': 0,
            'placeHolder': '请选择',
            'require': true,
            'validateRule': null,
            'errorMsg': '请选择是否审核',
          },
        },
        {
          'resourcecolumnName': '成立日期',//label
          'resourcecolumnNameEn': 'createDate',//model-key
          'resourcecolumnCode': 'createDate',
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '150',//列的宽度
          'resourcecolumnOrder': '7',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'date',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': 0,
            'min': 0,
            'placeHolder': null,
            'require': true,
            'validateRule': null,
            'errorMsg': '请选择成立日期',
          },
        },
        {
          'resourcecolumnName': '等级调整',//label
          'resourcecolumnNameEn': 'level',//model-key
          'resourcecolumnCode': 'level',
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '150',//列的宽度
          'resourcecolumnOrder': '10',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'rate',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': 100,
            'min': 0,
            'placeHolder': null,
            'require': true,
            'validateRule': null,
          },
        },
        {
          'resourcecolumnName': '涉猎领域（多选）',//label
          'resourcecolumnNameEn': 'field',//model-key
          'resourcecolumnCode': 'field',
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '500',//列的宽度
          'resourcecolumnOrder': '5',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'checkbox',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': 5,
            'min': 0,
            'placeHolder': null,
            'require': true,
            'validateRule': null,
            'errorMsg': '请选择涉猎领域',
          },
        },
        {
          'resourcecolumnName': '是否锁定（单选）',//label
          'resourcecolumnNameEn': 'isLocked',//model-key
          'resourcecolumnCode': 'isLocked',
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '150',//列的宽度
          'resourcecolumnOrder': '4',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'radio',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': null,
            'min': null,
            'placeHolder': null,
            'require': true,
            'validateRule': null,
            'errorMsg': '请选择是否锁定',
          },
        },
        {
          'resourcecolumnName': '使用人',//label
          'resourcecolumnNameEn': 'ownerName',//model-key
          'resourcecolumnCode': 'ownerName',//model-key
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '100',//列的宽度
          'resourcecolumnOrder': '5',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
        },
        {
          'resourcecolumnName': '备注',//label
          'resourcecolumnNameEn': 'remark',//model-key
          'resourcecolumnCode': 'remark',
          'resourcecolumnXtype': 'text',//筛选列 类型
          'resourcecolumnWidth': '300',//列的宽度
          'resourcecolumnOrder': '8',//列的序号
          'resourcecolumnHidden': '0', //是否隐藏
          'eidtConfig': {
            'switchType': true,
            'type': 'input',
            'decimal': 2,
            'disabled': false,
            'maxlength': null,
            'max': 0,
            'min': 0,
            'placeHolder': '请输入备注',
            'require': true,
            'validateRule': '',
            'errorMsg': '',
          },
        },
      ],
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
  'GET /system/column/list-column': listColumn,
  'POST /system/table/table-data': tableData,
};

