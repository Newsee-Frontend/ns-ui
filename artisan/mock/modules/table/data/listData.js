const Mock = require('mockjs');

/**
 * new from table data - 表单表格模拟数据
 * @param pageSize  - 每页的表格数据量
 */
export const formTableData = pageSize => {
  return Array.from({ length: pageSize }, k => k).map((item, index) => {
    return Mock.mock({
      taskName: function(n) {
        const task = n.context.currentContext.ownerName;
        const createDate = n.context.currentContext.createDate;
        return task + '的项目-' + createDate;
      }, //项目名称
      ownerName: '@cname',
      age: Mock.Random.float(20, 60, 0, 0), //年龄
      sex: Mock.Random.float(0, 2, 0, 0),//性别
      level: Mock.Random.float(0, 3, 0, 0), //等级
      education: Mock.Random.float(1, 8, 0, 0),//学历 - 字典项
      //是否审核 - 外部数据源（非字典项）
      isChecked: {
        picked: { value: '' },
        options: [],
      },
      checkedType: {
        picked: { value: '' },
        options: [],
      },//审核类型
      createDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),//成立日期
      endDate: Mock.Random.date('yyyy-MM-dd'),//结束 - 日期
      endTime: Mock.Random.date('hh:mm:ss'),//结束 -  时间点
      //是否锁定（单选）- 外部数据源（非字典项）
      isLocked: {
        picked: { value: Mock.Random.float(0, 1, 0, 0) },
        options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
      },
      //锁定信息（多选） - 外部数据源（非字典项）
      lockedInfo: {
        picked: { value: [1, 4] },
        options: [
          { 'label': '超时', 'value': 0 },
          { 'label': '欠费', 'value': 1 },
          { 'label': '违规', 'value': 2 },
          { 'label': '投诉', 'value': 3 },
          { 'label': '其他', 'value': 4 },
        ],
      },
      fieldArea: [1, 2, 4, 5],//涉猎领域（多选）- 内部数据源（字典项）
      describe: Mock.Random.csentence(), //备注
      email: Mock.Random.email(),
      customSlot: '@cname',
      asset: Mock.Random.float(10,100000,1,5)
    });
  });
};

/**
 * 大数据表格模拟数据
 * @param pageSize
 * @returns {any[]}
 */
export const hugeDataTableData = (pageSize) => {
  const random = Math.ceil(Math.random() * 10);
  return Array.from({ length: pageSize }, k => k).map((item, index) => {
    return Mock.mock({
      taskName: function(n) {
        const task = n.context.currentContext.ownerName;
        return task + '的项目-';
      }, //项目名称
      ownerName: `gcx-${random}`,
      age: random, //年龄
      sex: Mock.Random.float(0, 2, 0, 0),//性别
      createDate: '@datetime', //成立日期
      level: random, //等级调整
      isChecked: '已审核',//是否审核
      isLocked: '是',//是否锁定（单选）
      fieldArea: '互联网',//涉猎领域（多选）
      email: 'Lensgcx@163.com',
      customSlot: '@cname',
    });
  });
};


// export const formTableData = total =>
//   Array.from({ length: total }, k => k).map((item, index) => {
//     return Mock.mock({
//       taskName: function(n) {
//         const task = n.context.currentContext.ownerName;
//         const createDate = n.context.currentContext.createDate;
//         return task + '的项目-' + createDate;
//       }, //项目名称
//       isChecked: {
//         picked: { value: 1 },
//         options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
//       }, //是否审核
//       createDate: '@datetime', //成立日期
//       ownerName: '@cname', //使用人
//       level: Mock.Random.float(1, 100, 0, 1), //等级调整
//       field: {
//         picked: { value: [1] },
//         options: [
//           { label: '互联网', value: 1 },
//           { label: '电子芯片', value: 2 },
//           { label: '传统制造', value: 3 },
//           { label: '物联网', value: 4 },
//           { label: '广告服务', value: 5 },
//         ],
//       }, //涉猎领域（多选）
//       isLocked: {
//         picked: { value: 1 },
//         options: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
//       }, //是否锁定（单选）
//       remark: '', //备注 Mock.Random.county(true)
//     });
//   });


// export const normalTableData = total =>
//   Array.from({ length: total }, k => k).map((item, index) => {
//     return Mock.mock({
//       taskName: function(n) {
//         const task = n.context.currentContext.ownerName;
//         const createDate = n.context.currentContext.createDate;
//         return task + '的项目-' + createDate;
//       }, //项目名称
//       createDate: '@datetime', //成立日期
//       ownerName: '@cname', //使用人
//       level: Mock.Random.float(1, 100, 0, 1), //等级调整
//       id: Mock.Random.id(), //id
//       address: Mock.Random.city(true), //地址
//       zip: Mock.Random.zip(), //邮政编码
//       ip: Mock.Random.ip(), //ip 地址
//       email: Mock.Random.email(), //邮箱 地址
//       remark: Mock.Random.csentence(), //备注
//     });
//   });
