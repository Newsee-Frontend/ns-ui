export default [
  {
    'resourcecolumnName': '#',//label
    'resourcecolumnNameEn': 'index',
    'resourcecolumnCode': 'index',//model-key
    'resourcecolumnXtype': 'index',//筛选列类型:index/selection/radio/text/number
    'resourcecolumnWidth': '60',//列的宽度
    'resourcecolumnOrder': '1',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'eidtConfig': null,
  },
  {
    'resourcecolumnName': '',//label
    'resourcecolumnNameEn': 'selection',
    'resourcecolumnCode': 'selection',//model-key
    'resourcecolumnXtype': 'selection',//筛选列类型:index/selection/radio/text/number
    'resourcecolumnWidth': '60',//列的宽度
    'resourcecolumnOrder': '2',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'eidtConfig': null,
  },
  {
    'resourcecolumnName': '',//label
    'resourcecolumnNameEn': 'radio',
    'resourcecolumnCode': 'radio',//model-key
    'resourcecolumnXtype': 'radio',//筛选列类型:index/selection/radio/text/number
    'resourcecolumnWidth': '60',//列的宽度
    'resourcecolumnOrder': '3',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'eidtConfig': null,
  },
  {
    'resourcecolumnName': '项目名称',//label
    'resourcecolumnNameEn': 'taskName',//model-key
    'resourcecolumnCode': 'taskName',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'eidtConfig': null,
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
    'resourcecolumnName': '性别',//label
    'resourcecolumnNameEn': 'sex',//model-key
    'resourcecolumnCode': 'sex',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '80',//列的宽度
    'resourcecolumnOrder': '6',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'eidtConfig': null,
  },
  {
    'resourcecolumnName': '年龄',//label
    'resourcecolumnNameEn': 'age',//model-key
    'resourcecolumnCode': 'age',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '80',//列的宽度
    'resourcecolumnOrder': '7',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'eidtConfig': null,
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
  {
    'resourcecolumnName': '操作',//label
    'resourcecolumnNameEn': 'action',//model-key
    'resourcecolumnCode': 'action',//model-key
    'resourcecolumnXtype': 'action',//筛选列 类型
    'resourcecolumnWidth': '125',//列的宽度
    'resourcecolumnOrder': '9',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    align: 'left',
    'eidtConfig': null,
  },
];
