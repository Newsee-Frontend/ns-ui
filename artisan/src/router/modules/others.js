const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const othersRouter = [
  {
    path: '/other',
    component: Layout,
    redirect: '/other/dialog',
    name: '其他',
    children: [
      {
        path: 'dialog',
        component: () => import('../../pages/Others/Dialog/Dialog'),
        meta: { auth: true, key: 'dialog' },
        name: '对话框',
      },
      {
        path: 'fullscreen-dialog',
        component: () => import('../../pages/Others/Fullscreen-dialog/Fullscreen-dialog'),
        meta: { auth: true, key: 'fullscreen-dialog' },
        name: '全屏对话框',
      },
      {
        path: 'slip-dialog',
        component: () => import('../../pages/Others/Slip-dialog/Slip-dialog'),
        meta: { auth: true, key: 'slip-dialog' },
        name: '滑动对话框',
      },
      {
        path: 'carousel',
        component: () => import('../../pages/Others/Carousel/Carousel'),
        meta: { auth: true, key: 'carousel' },
        name: '走马灯',
      },
      {
        path: 'popover',
        component: () => import('../../pages/Others/Popover/Popover'),
        meta: { auth: true, key: 'popover' },
        name: '弹出框',
      },
      {
        path: 'timeline',
        component: () => import('../../pages/Others/Timeline/Timeline'),
        meta: { auth: true, key: 'timeline' },
        name: '时间线',
      },
      {
        path: 'rich-editor',
        component: () => import('../../pages/Others/Editor/Editor'),
        meta: { auth: true, key: 'rich-editor' },
        name: '富文本编辑器',
      },
      {
        path: 'baidu-map',
        component: () => import('../../pages/Others/Map/Map.vue'),
        meta: { auth: true, key: 'baidu-map' },
        name: '百度地图',
      },
    ],
  },
];
