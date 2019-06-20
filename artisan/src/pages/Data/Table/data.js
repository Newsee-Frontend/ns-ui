export default [
  {
    taskName: '张三的项目',//项目
    isChecked: {
      picked: { value: 1 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '2019-10-22 00:00:00',//成立日期
    ownerName: '张三',//使用人
    level: 26,//等级调整
    field: {
      picked: { value: [1, 2, 3, 4] },
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
    sex: '1',
    age: '30',
    remark: '张三的项目',//备注
  },
  {
    taskName: '李芳的项目',//项目
    isChecked: {
      picked: { value: 0 },
      'options': [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '2019-10-22 00:00:00',//成立日期
    ownerName: '李芳',//使用人
    level: 75,//等级调整
    field: {
      picked: { value: [4, 5] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { 'value': 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    sex: '2',
    age: '25',
    remark: '李芳的项目',//备注
  },
  {
    taskName: '李萍的项目',//项目
    isChecked: {
      picked: { value: 1 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '2019-10-22 00:00:00',//成立日期
    ownerName: '李芳',//使用人
    level: 100,//等级调整
    field: {
      picked: { value: [2, 3] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { 'value': 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    sex: '2',
    age: '24',
    remark: '李萍的项目',//备注
  },
  {
    taskName: '董洁的项目',//项目
    isChecked: {
      picked: { value: 0 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '2019-10-22 00:00:00',//成立日期
    ownerName: '李芳',//使用人
    level: 60,//等级调整
    field: {
      picked: { value: [1, 4] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { 'value': 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    sex: '2',
    age: '22',
    remark: '董洁的项目',//备注
  },
  {
    taskName: '王五的项目',//项目
    isChecked: {
      picked: { value: 1 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '2019-10-22 00:00:00',//成立日期
    ownerName: '王五',//使用人
    level: 80,//等级调整
    field: {
      picked: { value: [1, 5] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { 'value': 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    sex: '1',
    age: '31',
    remark: '王五的项目',//备注
  },
  {
    taskName: '罗晋的项目',//项目
    isChecked: {
      picked: { value: 1 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '2019-10-22 00:00:00',//成立日期
    ownerName: '罗晋',//使用人
    level: 50,//等级调整
    field: {
      picked: { value: [1, 2, 3] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { 'value': 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    sex: '1',
    age: '29',
    remark: '罗晋的项目',//备注
  },
];
