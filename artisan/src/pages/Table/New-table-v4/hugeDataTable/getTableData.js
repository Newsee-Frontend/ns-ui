const Mock = require('mockjs');


export default (total, pageSize) => {
  const random = Math.ceil(Math.random() * 10);
  return {
    list: Array.from({ length: pageSize }, k => k).map((item, index) => {
      return Mock.mock({
        taskName: function(n) {
          const task = n.context.currentContext.ownerName;
          return task + '的项目-';
        }, //项目名称
        ownerName: `gcx-${random}`,
        role: '测试',
        age: random, //年龄
        createDate: '@datetime', //成立日期
        level: random, //等级调整
        isChecked: '已审核',//是否审核
        isLocked: '是',//是否锁定（单选）
        fieldArea: '互联网',//涉猎领域（多选）
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
