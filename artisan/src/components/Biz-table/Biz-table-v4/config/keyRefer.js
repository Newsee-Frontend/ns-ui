/**
 * 字段配置表
 * @type {{head: {label: string, width: string, 'model-key': string, xtype: string, hidden: string, align: string, cellFilterList: string, 'cell-Config': string, fixed: string, errorMsg: string}, scope: {actionBtnList: string, formConfig: string, type: string, modelData: string, value: string, items: string, unit: string}}}
 */
const keyRefer = {
  head: {
    title: 'resourcecolumnName', //表头 label
    width: 'resourcecolumnWidth', //表头 宽度
    field: 'resourcecolumnCode', //表头 对应字段名
    type: 'resourcecolumnXtype', //筛选列 类型
    hidden: 'resourcecolumnHidden', //是否显示
    align: 'resourcecolumnAlign', //居中/左/右对齐
    fixed: 'resourcecolumnLocked', //锁定
    sortable: 'resourcecolumnOrder', //是否排序ma
    defaultSortType : 'resourcecolumnIndexType', //默认排序模式
    isFilter: 'resourcecolumncolumnQueryType',
    formatter: 'selectMap',//格式化过滤规则
    isDictionary:'filterSource',//是否为外部数据源：   0 - 内部数据源（字典项） 1 - 外部数据源（非字典项）
    'cell-Config': 'editConfig', //特殊单元格（如：表单元素单元格/链接跳转单元格）的属性配置字段
    'filter-Config': 'filterConfig', //过滤配置
    'slot-Config': 'colFormOptions' //低开的插槽配置
  },
  scope: {
    'actionBtnList': 'fnsclick',//操作列操作按钮列表

    'formConfig': 'editConfig',//表格-表单-配置字段
    'type': 'type',//表格-表单-类型

    'modelData': 'picked',//选中对象字段
    'value': 'value',//选中对象字段 - 值
    'items': 'options',//下拉框字段
    'unit': 'unit',//计量单位

    //例如:
    // {
    //   "picked": {
    //       "value": ""
    //       "unit": "",
    //   },
    //   "options": [{"label": "xx", "value": 1,"unit": "",}]
    // }
  },
  sortMap: {
    0: null,
    1: 'asc',
    2: 'desc'
  }
};
export default keyRefer;
