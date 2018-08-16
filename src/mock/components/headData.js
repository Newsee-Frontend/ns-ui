export default [
  // {
  //   "resourcecolumnName": "序号",//label
  //   "resourcecolumnNameEn": "index",//model-key
  //   "resourcecolumnCode": "index",
  //   "resourcecolumnXtype": "text",//筛选列 类型
  //   "resourcecolumnWidth": "80",//列的宽度
  //   "resourcecolumnOrder": "1",//列的序号
  //   "resourcecolumnHidden": "0", //是否隐藏
  // },
  {
    "resourcecolumnName": "项目名称",//label
    "resourcecolumnNameEn": "taskName",//model-key
    "resourcecolumnCode": "taskName",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "100",//列的宽度
    "resourcecolumnOrder": "2",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null
  },
  {
    "resourcecolumnName": "使用人",//label
    "resourcecolumnNameEn": "ownerName",//model-key
    "resourcecolumnCode": "ownerName",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "100",//列的宽度
    "resourcecolumnOrder": "11",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
  },
  {
    "resourcecolumnName": "性别",//label
    "resourcecolumnNameEn": "sex",//model-key
    "resourcecolumnCode": "sex",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "200",//列的宽度
    "resourcecolumnOrder": "3",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "select",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 80,
      "min": 0,
      "placeHolder": '请选择性别',
      "require": true,
      "validateRule": null,
      "errorMsg": '请选择性别',
    },
  },
  {
    "resourcecolumnName": "成立日期",//label
    "resourcecolumnNameEn": "date",//model-key
    "resourcecolumnCode": "date",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "150",//列的宽度
    "resourcecolumnOrder": "7",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "date",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 100,
      "min": 0,
      "placeHolder": null,
      "require": true,
      "validateRule": null,
      "errorMsg": '请选择成立日期',
    },
  },
  {
    "resourcecolumnName": "收费标准",//label
    "resourcecolumnNameEn": "chargeStandard",//model-key
    "resourcecolumnCode": "chargeStandard",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "160",//列的宽度
    "resourcecolumnOrder": "6",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "select-unit",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 2,
      "min": 0,
      "placeHolder": '请选择收费客户（多选）',
      "require": true,
      "validateRule": null,
      "errorMsg": '请选择',
    },
  },
  {
    "resourcecolumnName": "单价",//label
    "resourcecolumnNameEn": "unit",//model-key
    "resourcecolumnCode": "unit",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "80",//列的宽度
    "resourcecolumnOrder": "6",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null
  },
  {
    "resourcecolumnName": "总金额",//label
    "resourcecolumnNameEn": "sum",//model-key
    "resourcecolumnCode": "sum",
    "resourcecolumnXtype": "number",//筛选列 类型
    "resourcecolumnWidth": "100",//列的宽度
    "resourcecolumnOrder": "8",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
  },
  {
    "resourcecolumnName": "实际金额",//label
    "resourcecolumnNameEn": "actualSum",//model-key
    "resourcecolumnCode": "actualSum",
    "resourcecolumnXtype": "number",//筛选列 类型
    "resourcecolumnWidth": "100",//列的宽度
    "resourcecolumnOrder": "9",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null
  },
  {
    "resourcecolumnName": "税率%",//label
    "resourcecolumnNameEn": "TaxRate",//model-key
    "resourcecolumnCode": "TaxRate",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "120",//列的宽度
    "resourcecolumnOrder": "10",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "rate",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 100,
      "min": 0,
      "placeHolder": null,
      "require": true,
      "validateRule": null
    },
  },
  {
    "resourcecolumnName": "收费客户（多选）",//label
    "resourcecolumnNameEn": "chargeCustomer",//model-key
    "resourcecolumnCode": "chargeCustomer",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "300",//列的宽度
    "resourcecolumnOrder": "5",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "checkbox",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 2,
      "min": 0,
      "placeHolder": null,
      "require": true,
      "validateRule": null,
      "errorMsg": '请选择收费客户',
    },
  },
  {
    "resourcecolumnName": "是否锁定（单选）",//label
    "resourcecolumnNameEn": "isLocked",//model-key
    "resourcecolumnCode": "isLocked",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "180",//列的宽度
    "resourcecolumnOrder": "4",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "radio",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": null,
      "min": null,
      "placeHolder": null,
      "require": true,
      "validateRule": null,
      "errorMsg": '请选择是否锁定',
    },
  },
  {
    "resourcecolumnName": "省份",//label
    "resourcecolumnNameEn": "province",//model-key
    "resourcecolumnCode": "province",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "120",//列的宽度
    "resourcecolumnOrder": "12",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null,
  },
  {
    "resourcecolumnName": "市区",//label
    "resourcecolumnNameEn": "city",//model-key
    "resourcecolumnCode": "city",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "100",//列的宽度
    "resourcecolumnOrder": "13",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null,
  },
  {
    "resourcecolumnName": "地址",//label
    "resourcecolumnNameEn": "address",//model-key
    "resourcecolumnCode": "address",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "200",//列的宽度
    "resourcecolumnOrder": "14",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null,
  },
  {
    "resourcecolumnName": "邮编",//label
    "resourcecolumnNameEn": "zip",//model-key
    "resourcecolumnCode": "zip",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "100",//列的宽度
    "resourcecolumnOrder": "15",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": null,
  },
  {
    "resourcecolumnName": "联系方式",//label
    "resourcecolumnNameEn": "mobile",//model-key
    "resourcecolumnCode": "mobile",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "200",//列的宽度
    "resourcecolumnOrder": "15",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "input",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 0,
      "min": 0,
      "placeHolder": '请输入手机号码',
      "require": true,
      "validateRule": 'mobile',
      "errorMsg": '请正确输入手机号码',
    },
  },
  {
    "resourcecolumnName": "邮箱",//label
    "resourcecolumnNameEn": "email",//model-key
    "resourcecolumnCode": "email",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "200",//列的宽度
    "resourcecolumnOrder": "15",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "input",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 0,
      "min": 0,
      "placeHolder": '请输入邮箱号',
      "require": true,
      "validateRule": 'email',
      "errorMsg": '请正确输入邮箱号',
    },
  },
  {
    "resourcecolumnName": "删选转换",//label
    "resourcecolumnNameEn": "fifter",//model-key
    "resourcecolumnCode": "fifter",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "80",//列的宽度
    "resourcecolumnOrder": "16",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig":  null
  },
  {
    "resourcecolumnName": "备注",//label
    "resourcecolumnNameEn": "Remark",//model-key
    "resourcecolumnCode": "Remark",
    "resourcecolumnXtype": "text",//筛选列 类型
    "resourcecolumnWidth": "260",//列的宽度
    "resourcecolumnOrder": "17",//列的序号
    "resourcecolumnHidden": "0", //是否隐藏
    "eidtConfig": {
      "switchType": true,
      "type": "input",
      "decimal": 2,
      "disabled": false,
      "maxlength": null,
      "max": 0,
      "min": 0,
      "placeHolder": '请输入备注',
      "require": true,
      "validateRule": '',
      "errorMsg": '',
    },
  },
];
