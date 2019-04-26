const navmenu = (req, res) => {
  // console.log(req.body);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: [
      {
        funcId: 'guide',
        menuLabel: '向导',
        menuRouter: 'guide',
        menuIcon: 'daohang',
        menuIndex: 1,
        hide: 1,
        childMenus: [],
      },
      {
        funcId: 'dashboard',
        menuLabel: '主页',
        menuRouter: 'dashboard',
        menuIcon: 'gailan',
        menuIndex: 2,
        hide: 1,
        childMenus: [],
      },
      {
        funcId: 'basic',
        menuLabel: '基础',
        menuRouter: 'basic',
        menuIcon: 'fold',
        menuIndex: 3,
        hide: 1,
        childMenus: [
          {
            funcId: 'gridLayout',
            menuLabel: '栅格布局',
            menuRouter: 'gridLayout',
            menuIcon: null,
            menuIndex: '1',
            hide: 1,
          },
        ],
      },
      {
        funcId: 'layout',
        menuLabel: '布局',
        menuRouter: 'layout',
        menuIcon: 'renwu',
        menuIndex: 4,
        hide: 1,
        childMenus: [
          {
            funcId: 'layout',
            menuLabel: '整体布局',
            menuRouter: 'layout',
            menuIcon: null,
            menuIndex: '1',
            hide: 1,
          },
          {
            funcId: 'head',
            menuLabel: '头部布局',
            menuRouter: 'head',
            menuIcon: null,
            menuIndex: '2',
            hide: 1,
          },
          {
            funcId: 'sidebar',
            menuLabel: '侧边栏',
            menuRouter: 'sidebar',
            menuIcon: null,
            menuIndex: '3',
            hide: 1,
          },
        ],
      },
      {
        funcId: 'form',
        menuLabel: '表单',
        menuRouter: 'form',
        menuIcon: 'bianji-',
        menuIndex: 5,
        hide: 1,
        childMenus: [
          {
            funcId: 'input',
            menuLabel: '输入框',
            menuRouter: 'input',
            menuIcon: null,
            menuIndex: '1',
            hide: 1,
          },
          {
            funcId: 'datepicker',
            menuLabel: '日期控件',
            menuRouter: 'datepicker',
            menuIcon: null,
            menuIndex: '2',
            hide: 1,
          },
          {
            funcId: 'timepicker',
            menuLabel: '时间控件',
            menuRouter: 'timepicker',
            menuIcon: null,
            menuIndex: '3',
            hide: 1,
          },
        ],
      },
      {
        funcId: 'data',
        menuLabel: '数据',
        menuRouter: 'data',
        menuIcon: 'shujugongxiang',
        menuIndex: 6,
        hide: 1,
        childMenus: [
          {
            funcId: 'badge',
            menuLabel: '标记',
            menuRouter: 'badge',
            menuIcon: null,
            menuIndex: '1',
            hide: 1,
          },
          {
            funcId: 'progress',
            menuLabel: '进度条',
            menuRouter: 'progress',
            menuIcon: null,
            menuIndex: '2',
            hide: 1,
          },
        ],
      },
      {
        funcId: 'other',
        menuLabel: '其他',
        menuRouter: 'other',
        menuIcon: 'down-square',
        menuIndex: 7,
        hide: 1,
        childMenus: [
          {
            funcId: 'dialog',
            menuLabel: '对话框',
            menuRouter: 'dialog',
            menuIcon: null,
            menuIndex: '1',
            hide: 1,
          },
          {
            funcId: 'slip-dialog',
            menuLabel: '滑动对话框',
            menuRouter: 'slip-dialog',
            menuIcon: null,
            menuIndex: '2',
            hide: 1,
          },


        ],
      },
    ],
  });
};

module.exports = {
  'POST /system/permission/list-menu': navmenu,
};
