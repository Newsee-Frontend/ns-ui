/**
 * 表单列类型分类及名称 xType
 * 1、常规列：
 *      text ： 常规显示文字
 * 2、表单列：
 *      link：文字链接
 *      input：输入框
 *      select：选择框
 *      inputNumber：计数器
 *      checkbutton：复选框
 *      radiobutton：单选框
 *      date：日期控件
 *      time：时间控件
 *      datetime：日期时间控件
 * 3、首列：
 *      index：索引列
 *      checkox：复选框首列
 *      radio：单选框首列
 * 4、操作列：
 *      action：操作按钮列（表格权限操作）
 *      addRow：新增行
 * 5、 设置列：
 *      setting：表头设置列（控制表头排序，锁定等）
 */
export default {
  data() {
    return {
      normalColInclude: ['text', 'number'],

      renderColInclude: [
        'input',
        'select',
        'inputNumber',
        'checkbutton',
        'radiobutton',
        'date',
        'time',
        'datetime',
        'link',
        'slot',
      ],

      firstColInclude: ['index', 'checkbox', 'radio'],
      actionColInclude: ['action', 'addRow'],
      settingColInclude: ['setting'],
    };
  },
  computed: {
    specialColumns() {
      return [...this.firstColInclude, ...this.actionColInclude, ...this.settingColInclude];
    },
  },
};
