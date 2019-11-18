const Mock = require('mockjs');



export default {
  mockData:(total, pageSize) => {
  return {
    list: Array.from({ length: pageSize }, k => k).map((item, index) => {
      return Mock.mock({
        taskName: function(n) {
          const task = n.context.currentContext.ownerName;
          const createDate = n.context.currentContext.createDate;
          return task + '的项目-' + createDate;
        }, //项目名称
        ownerName: '@cname',
        age: Mock.Random.float(20, 60, 0, 0), //年龄
        sex: {
          picked: { value: Mock.Random.float(0, 2, 0, 0) },
          options: [{ label: '男', value: 0 }, { label: '女', value: 1 }, { label: '保密', value: 2 }],
        },//性别
        isChecked: {
          picked: { value: '' },
          options: [],
        },//是否审核
        checkedType: {
          picked: { value: '' },
          options: [],
        },//审核类型
        // createDate: '@datetime', //成立日期
        createDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),//成立日期
        endDate: Mock.Random.date('yyyy-MM-dd'),//结束 - 日期
        endTime: Mock.Random.date('hh:mm:ss'),//结束 -  时间点
        level: Mock.Random.float(1, 100, 0, 1), //等级调整
        isLocked: {
          picked: { value: 1 },
          options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
        },//是否锁定（单选）
        fieldArea: {
          picked: { value: [1, 2, 4, 5] },
          options: [
            { label: '互联网', value: 1 },
            { label: '电子芯片', value: 2 },
            { label: '传统制造', value: 3 },
            { label: '物联网', value: 4 },
            { label: '广告服务', value: 5 },
          ],
        },//涉猎领域（多选）
        describe: Mock.Random.csentence(), //备注
        email: Mock.Random.email(),
        // fnsclick: [
        //   { label: '新增授权人', value: 'addshouquanren' },
        //   { label: '编辑', value: 'gridEditBtn' },
        //   { label: '删除', value: 'gridRemoveBtn' },
        //
        //   // { label: '停用', value: 'sstop' }, { label: '启用', value: 'work' },
        // ],
      });
    }),
    total: total,
  };
},
  mocksimpleData:(total, pageSize) => {

    const random = Math.ceil(Math.random() * 10);
    return {
      list: Array.from({ length: pageSize }, k => k).map((item, index) => {
        return Mock.mock({
          taskName: function(n) {
            const task = n.context.currentContext.ownerName;
            return task + '的项目-';
          }, //项目名称
          ownerName: `gcx-${random}`,
          sex: '1',
          role: '测试',
          age: random, //等级调整
          createDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),//成立日期
          endDate: Mock.Random.date('yyyy-MM-dd'),//结束 - 日期
          endTime: Mock.Random.date('hh:mm:ss'),//结束 -  时间点
          level: random, //等级调整
          isChecked: {
            picked: { value: '' },
            options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
          },//是否审核
          isLocked: {
            picked: { value: 1 },
            options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
          },//是否锁定（单选）
          fieldArea: {
            picked: { value: [1, 2, 4, 5] },
            options: [
              { label: '互联网', value: 1 },
              { label: '电子芯片', value: 2 },
              { label: '传统制造', value: 3 },
              { label: '物联网', value: 4 },
              { label: '广告服务', value: 5 },
            ],
          },//涉猎领域（多选）
          describe: '我是备注', //备注
          email: 'Lensgcx@163.com',
          fnsclick: [
            { label: '新增授权人', value: 'addshouquanren' },
            { label: '编辑', value: 'gridEditBtn' },
            { label: '删除', value: 'gridRemoveBtn' },

            // { label: '停用', value: 'sstop' }, { label: '启用', value: 'work' },
          ],
        });
      }),
      total: total,
    };
  }
}

