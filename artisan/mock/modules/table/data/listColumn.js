export const formlistColumn = [
  {
    'resourcecolumnName': '项目名称',//label
    'resourcecolumnCode': 'taskName',//model-key
    'resourcecolumnXtype': 'link',//筛选列 类型
    'resourcecolumnWidth': '150',//列的宽度等级
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '1', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      dataSources:'',//数据来源
      'filterType': 'link',//筛选器表单类型
      'type': 'link',//表单类型
      'disabled': false,//表单控件是否禁用
      'maxlength': null,//表单控件输入最大长度（只在 input 中有用)
      'max': 0,//选择的最大个数（只在checkbox，radio，select-多选  中有用)
      'min': 0,//选择的最小个数只在checkbox，radio 中有用)
      'placeHolder': '请输入',//占位符
      'multiple': null,//是否多选（只在select-多选  中有用)
      'require': true,//是否必填
      'validateRule': null,//内容验证规则（只在 input 中有用)
      'errorMsg': '输入项目名称',//验证出错时的 提示消息
      'options': [],//下拉项/展示内容，（只在checkbox，radio，select 中有用)
    },
  },
  {
    'resourcecolumnName': '拥有人',//label
    'resourcecolumnCode': 'ownerName',//model-key
    'resourcecolumnXtype': 'input',//筛选列 类型
    'resourcecolumnWidth': '100',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'input',
      'decimal': 2,
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': '请输入',
      'multiple': null,
      'require': true,
      'validateRule': '',
      'errorMsg': '输入拥有人',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '年龄',//label
    'resourcecolumnCode': 'age',//model-key
    'resourcecolumnXtype': 'inputNumber',//筛选列 类型
    'resourcecolumnWidth': '150',//列的宽度
    'resourcecolumnOrder': '5',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'inputNumber',
      'decimal': 2,
      'disabled': false,
      'maxlength': null,
      'max': 100,
      'min': 0,
      'placeHolder': null,
      'multiple': null,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择年龄',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '性别',//label
    'resourcecolumnCode': 'sex',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '80',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'selectMap': {
      0: '男',
      1: '女',
      2: '保密',
    },
    'editConfig': null,
  },
  {
    'resourcecolumnName': '等级',//label
    'resourcecolumnCode': 'level',
    'resourcecolumnXtype': 'link',//筛选列 类型
    'resourcecolumnWidth': '80',//列的宽度
    'resourcecolumnOrder': '10',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'selectMap': {
      0: '较差',
      1: '一般',
      2: '较好',
      3: '优秀',
    },
    'editConfig': {
      'switchType': true,
      'type': 'link',
      'decimal': 2,
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': '',
      'multiple': null,
      'require': false,
      'validateRule': null,
      'errorMsg': '',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '学历',//label
    'resourcecolumnCode': 'education',//model-key
    'resourcecolumnXtype': 'select',//筛选列 类型
    'resourcecolumnWidth': '120',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'select',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': '请选择学历',
      'multiple': false,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择学历',
      'options': [
        { label: '小学', value: 1 },
        { label: '初中', value: 2 },
        { label: '高中', value: 3 },
        { label: '大专', value: 4 },
        { label: '本科', value: 5 },
        { label: '研究生', value: 6 },
        { label: '博世', value: 7 },
        { label: '其他', value: 8 },
      ],
    },
  },
  {
    'resourcecolumnName': '是否审核',//label
    'resourcecolumnCode': 'isChecked',//model-key
    'resourcecolumnXtype': 'select',//筛选列 类型
    'resourcecolumnWidth': '120',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'select',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': '请选择',
      'multiple': false,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择是否审核',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '审核类型',//label
    'resourcecolumnCode': 'checkedType',//model-key
    'resourcecolumnXtype': 'select',//筛选列 类型
    'resourcecolumnWidth': '120',//列的宽度
    'resourcecolumnOrder': '5',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'select',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': '请选择',
      'multiple': false,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择审核类型',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '成立日期',//label
    'resourcecolumnCode': 'createDate',//model-key
    'resourcecolumnXtype': 'datetime',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '6',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'datetime',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': null,
      'multiple': null,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择成立日期',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '结束 - 日期',//label
    'resourcecolumnCode': 'endDate',//model-key
    'resourcecolumnXtype': 'date',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '7',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'date',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': null,
      'multiple': null,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择成立日期',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '结束 -  时间点',//label
    'resourcecolumnCode': 'endTime',//model-key
    'resourcecolumnXtype': 'time',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '8',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'time',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': null,
      'multiple': null,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择成立日期',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '是否锁定（单选）',//label
    'resourcecolumnCode': 'isLocked',
    'resourcecolumnXtype': 'radiobutton',//筛选列 类型
    'resourcecolumnWidth': '150',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'radiobutton',
      'disabled': false,
      'maxlength': null,
      'max': null,
      'min': null,
      'placeHolder': null,
      'multiple': null,
      'require': false,
      'validateRule': null,
      'errorMsg': '请选择是否锁定',
      'options': [
        { 'label': '是', 'value': 1 },
        { 'label': '否', 'value': 0 },
      ],
    },
  },
  {
    'resourcecolumnName': '锁定信息（多选）',//label
    'resourcecolumnCode': 'lockedInfo',
    'resourcecolumnXtype': 'select',//筛选列 类型
    'resourcecolumnWidth': '240',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'select',
      'disabled': false,
      'maxlength': null,
      'max': 3,
      'min': 1,
      'placeHolder': null,
      'multiple': true,
      'require': false,
      'validateRule': null,
      'errorMsg': '请选择锁定信息',
      'options': [
        { 'label': '超时', 'value': 0 },
        { 'label': '欠费', 'value': 1 },
        { 'label': '违规', 'value': 2 },
        { 'label': '投诉', 'value': 3 },
        { 'label': '其他', 'value': 4 },
      ],
    },
  },


  {
    'resourcecolumnName': '邮箱',//label
    'resourcecolumnCode': 'email',//model-key
    'resourcecolumnXtype': 'input',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'input',
      'disabled': false,
      'maxlength': null,
      'max': 0,
      'min': 0,
      'placeHolder': '请输入邮箱',
      'multiple': null,
      'require': true,
      'validateRule': 'email',
      'errorMsg': '请输入正确邮箱',
      'options': [],
    },
  },
  {
    'resourcecolumnName': '涉猎领域（多选）',//label
    'resourcecolumnCode': 'fieldArea',
    'resourcecolumnXtype': 'checkbutton',//筛选列 类型
    'resourcecolumnWidth': '600',//列的宽度
    'resourcecolumnOrder': '5',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': {
      'switchType': true,
      'type': 'checkbutton',
      'disabled': false,
      'maxlength': null,
      'max': 5,
      'min': 0,
      'placeHolder': null,
      'multiple': null,
      'require': true,
      'validateRule': null,
      'errorMsg': '请选择涉猎领域',
      'options': [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },
  },
];


export const hugeDataListColumn = [
  {
    'resourcecolumnName': '项目名称',//label
    'resourcecolumnCode': 'taskName',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '150',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '拥有人',//label
    'resourcecolumnCode': 'ownerName',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '年龄',//label
    'resourcecolumnCode': 'age',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '100',//列的宽度
    'resourcecolumnOrder': '5',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '性别',//label
    'resourcecolumnCode': 'sex',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '80',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'selectMap': {
      0: '男',
      1: '女',
      2: '保密',
    },
    'editConfig': null,
  },
  {
    'resourcecolumnName': '成立日期',//label
    'resourcecolumnCode': 'createDate',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '5',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '等级调整',//label
    'resourcecolumnCode': 'level',
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '150',//列的宽度
    'resourcecolumnOrder': '10',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '是否审核',//label
    'resourcecolumnCode': 'isChecked',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '120',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '是否锁定（单选）',//label
    'resourcecolumnCode': 'isLocked',
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '150',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
  {
    'resourcecolumnName': '邮箱',//label
    'resourcecolumnCode': 'email',//model-key
    'resourcecolumnXtype': 'text',//筛选列 类型
    'resourcecolumnWidth': '200',//列的宽度
    'resourcecolumnOrder': '4',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'editConfig': null,
  },
];


// export const formlistColumn = [
//   {
//     resourcecolumnName: '项目名称', //label
//     resourcecolumnCode: 'taskName', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '4', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'link',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: '',
//       require: true,
//       validateRule: null,
//       errorMsg: '',
//     },
//   },
//   {
//     resourcecolumnName: '是否审核', //label
//     resourcecolumnCode: 'isChecked', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '120', //列的宽度
//     resourcecolumnOrder: '4', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'select',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: '请选择',
//       require: true,
//       validateRule: null,
//       errorMsg: '请选择是否审核',
//     },
//   },
//   {
//     resourcecolumnName: '成立日期', //label
//     resourcecolumnCode: 'createDate',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '7', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'date',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: null,
//       require: true,
//       validateRule: null,
//       errorMsg: '请选择成立日期',
//     },
//   },
//   {
//     resourcecolumnName: '等级调整', //label
//     resourcecolumnCode: 'level',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '10', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'rate',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 100,
//       min: 0,
//       placeHolder: null,
//       require: true,
//       validateRule: null,
//     },
//   },
//   {
//     resourcecolumnName: '涉猎领域（多选）', //label
//     resourcecolumnCode: 'field',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '500', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'checkbox',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 5,
//       min: 0,
//       placeHolder: null,
//       require: true,
//       validateRule: null,
//       errorMsg: '请选择涉猎领域',
//     },
//   },
//   {
//     resourcecolumnName: '是否锁定（单选）', //label
//     resourcecolumnCode: 'isLocked',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '4', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'radio',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: null,
//       min: null,
//       placeHolder: null,
//       require: true,
//       validateRule: null,
//       errorMsg: '请选择是否锁定',
//     },
//   },
//   {
//     resourcecolumnName: '使用人', //label
//     resourcecolumnCode: 'ownerName', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: '备注（邮箱)', //label
//     resourcecolumnCode: 'remark',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '300', //列的宽度
//     resourcecolumnOrder: '8', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'input',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: '请输入备注',
//       require: true,
//       validateRule: 'email',
//       errorMsg: '',
//     },
//   },
// ];


// export const normalListColumn = [
//   {
//     resourcecolumnName: '项目名称', //label
//     resourcecolumnCode: 'taskName', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '4', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'link',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: '',
//       require: true,
//       validateRule: null,
//       errorMsg: '',
//     },
//   },
//   {
//     resourcecolumnName: '成立日期', //label
//     resourcecolumnCode: 'createDate',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '7', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'date',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: null,
//       require: true,
//       validateRule: null,
//       errorMsg: '请选择成立日期',
//     },
//   },
//   {
//     resourcecolumnName: '使用人', //label
//     resourcecolumnCode: 'ownerName', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: '等级调整', //label
//     resourcecolumnCode: 'level',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '150', //列的宽度
//     resourcecolumnOrder: '10', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'rate',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 100,
//       min: 0,
//       placeHolder: null,
//       require: true,
//       validateRule: null,
//     },
//   },
//   {
//     resourcecolumnName: 'ID编号', //label
//     resourcecolumnCode: 'id', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: '地址', //label
//     resourcecolumnCode: 'address', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: '邮政编码', //label
//     resourcecolumnCode: 'zip', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: 'ip地址', //label
//     resourcecolumnCode: 'ip', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: '邮箱地址', //label
//     resourcecolumnCode: 'email', //model-key
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '100', //列的宽度
//     resourcecolumnOrder: '5', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'center', //对齐
//   },
//   {
//     resourcecolumnName: '备注（邮箱)', //label
//     resourcecolumnCode: 'remark',
//     resourcecolumnXtype: 'text', //筛选列 类型
//     resourcecolumnWidth: '300', //列的宽度
//     resourcecolumnOrder: '8', //列的序号
//     resourcecolumnHidden: '0', //是否隐藏
//     resourcecolumnAlign: 'left', //对齐
//     editConfig: {
//       switchType: true,
//       type: 'input',
//       decimal: 2,
//       disabled: false,
//       maxlength: null,
//       max: 0,
//       min: 0,
//       placeHolder: '请输入备注',
//       require: true,
//       validateRule: 'email',
//       errorMsg: '',
//     },
//   },
// ];
