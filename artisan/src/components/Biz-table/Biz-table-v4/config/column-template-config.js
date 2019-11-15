/**
 * 表格特殊列配置表
 */
export default {
  index: {
    'resourcecolumnName': '#',//label
    'resourcecolumnCode': 'index',//model-key
    'resourcecolumnXtype': 'index',//筛选列类型:index/selection/radio/text/number
    'resourcecolumnWidth': '46',//列的宽度
    'resourcecolumnOrder': '0-1',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'center',//对齐
    'eidtConfig': null,
  },
  checkbox: {
    'resourcecolumnName': '',//label
    'resourcecolumnCode': 'checkbox',//model-key
    'resourcecolumnXtype': 'checkbox',//筛选列类型:index/selection/radio/text/number
    'resourcecolumnWidth': '46',//列的宽度
    'resourcecolumnOrder': '0-2',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'center',//对齐
    'eidtConfig': null,
  },
  radio: {
    'resourcecolumnName': '',//label
    'resourcecolumnCode': 'radio',//model-key
    'resourcecolumnXtype': 'radio',//筛选列类型:index/selection/radio/text/number
    'resourcecolumnWidth': '46',//列的宽度
    'resourcecolumnOrder': '0-3',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'center',//对齐
    'eidtConfig': null,
  },
  action: {
    'resourcecolumnName': '操作',//label
    'resourcecolumnCode': 'action',//model-key
    'resourcecolumnXtype': 'action',//筛选列 类型
    'resourcecolumnWidth': '125',//列的宽度
    'resourcecolumnOrder': '98',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'left',//对齐
    'eidtConfig': null,
  },
  'add-row': {
    'resourcecolumnName': '',//label
    'resourcecolumnCode': 'add-row',//model-key
    'resourcecolumnXtype': 'add-row',//筛选列 类型
    'resourcecolumnWidth': '42',//列的宽度
    'resourcecolumnOrder': '99',//列的序号
    'resourcecolumnHidden': '0', //是否隐藏
    'resourcecolumnAlign': 'center',//对齐
    'eidtConfig': null,
  },
  setting: {
    resourcecolumnName: '设置', //label
    resourcecolumnCode: 'setting', //model-key
    resourcecolumnXtype: 'setting', //筛选列 类型
    resourcecolumnWidth: '28', //列的宽度
    resourcecolumnOrder: '99', //列的序号
    resourcecolumnHidden: '0', //是否隐藏
    resourcecolumnAlign: 'center', //对齐
    eidtConfig: null,
  },
};
