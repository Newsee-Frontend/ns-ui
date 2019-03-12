export default {
  // index: '',//序号
  taskName: '',//项目名称
  ownerName: '',//使用人
  //性别
  sex: {
    "picked": {"value": ""},
    "options": [{"label": "男", "value": 1}, {"label": "女", "value": 2}, {"label": "保密", "value": 3}]
  },
  date: '',//成立日期
  //收费标准
  chargeStandard: {
    "picked": {"value": "", "unit": "",},
    "options": [{"label": "选项一", "value": 1, "unit": "2.5元/㎡/月"}, {"label": "选项二", "value": 2, "unit": "2.5元/㎡/日"}, {"label": "选项三", "value": 3, "unit": "2.5元/㎡/年"}]
  },
  unit: '',//单价
  sum: '',//总金额 （需要合计）
  actualSum: '',//实际金额（需要合计）
  TaxRate: null,//税率
  //收费客户（多选）
  chargeCustomer: {
    "picked": {"value": []},
    "options": [{"label": "开发商", "value": 1}, {"label": "业主", "value": 2}, {"label": "租户", "value": 3}]
  },
  //是否锁定（单选）
  isLocked: {
    "picked": {"value": ""},
    "options": [{"label": "是", "value": 1}, {"label": "否", "value": 0}]
  },
  province: '',//省份
  city: '',//城市
  address: '',//地址
  zip: '',//右边
  Remark: '',//备注
  fnsclick: [
    {label: '编辑', value: 'gridEditBtn'},
    {label: '删除', value: 'actionRemoveBtn'},
    {label: '锁定', value: 'lock'}
  ]//操作栏数据
}
