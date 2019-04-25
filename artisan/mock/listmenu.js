const navmenu = (req, res) => {
  console.log('navmenu-navmenu-navmenu');
  console.log(req.body);
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
        menuIcon: 'bushenbuzhan1',
        menuIndex: 3,
        hide: 1,
        childMenus: [
          {
            funcId: 'row',
            menuLabel: 'row 布局',
            menuRouter: 'row',
            menuIcon: null,
            menuIndex: '1',
            hide: 1,
          },
          {
            funcId: 'col',
            menuLabel: 'col 布局',
            menuRouter: 'col',
            menuIcon: null,
            menuIndex: '2',
            hide: 1,
          },
        ],
      },
      {
        funcId: 'layout',
        menuLabel: '布局',
        menuRouter: 'layout',
        menuIcon: 'bushenbuzhan1',
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
        menuIcon: 'bushenbuzhan1',
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
    ],
  });
};

module.exports = {
  'POST /system/permission/list-menu': navmenu,
};
