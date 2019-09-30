const Mock = require('mockjs');

export const formTableData = total => Array.from({ length: total }, k => k).map((item, index) => {
  return Mock.mock({
    taskName: function(n) {
      const task = n.context.currentContext.ownerName;
      const createDate = n.context.currentContext.createDate;
      return task + '的项目-' + createDate;
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


export const normalTableData = total => Array.from({ length: total }, k => k).map((item, index) => {
  return Mock.mock({
    taskName: function(n) {
      const task = n.context.currentContext.ownerName;
      const createDate = n.context.currentContext.createDate;
      return task + '的项目-' + createDate;
    },//项目名称
    createDate: '@datetime',//成立日期
    ownerName: '@cname',//使用人
    level: Mock.Random.float(1, 100, 0, 1),//等级调整
    id: Mock.Random.id(),//id
    address: Mock.Random.city(true),//地址
    zip: Mock.Random.zip(),//邮政编码
    ip:Mock.Random.ip(),//ip 地址
    email:Mock.Random.email(),//邮箱 地址
    remark: Mock.Random.csentence(),//备注
  });
});
