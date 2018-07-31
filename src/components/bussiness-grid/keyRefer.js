const keyRefer = {
  head: {
    "label": "resourcecolumnName",//表头 label
    "width": "resourcecolumnWidth",//表头 宽度
    "model-key": "resourcecolumnNameEn",//表头 对应字段名
    "model-code": "resourcecolumnCode",//表头 编码名称
    "xtype": "resourcecolumnXtype",//筛选列 类型
    "col-type": "col-type",//列的类型
    "hidden": "resourcecolumnHidden",//是否显示

    "cell-Config": "eidtConfig",//特殊单元格（如：表单元素单元格/链接跳转单元格）的属性配置字段
    "fixed": "fixed",//锁定
    "errorMsg": "errorMsg",//验证错误信息
  },
  scope: {
    'actionBtnList': 'fnsclick',//操作列操作按钮列表

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
  }
};
export default keyRefer;
