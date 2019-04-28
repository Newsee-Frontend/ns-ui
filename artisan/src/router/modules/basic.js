const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const baseRouter = [
  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/gridLayout',
    name: '基础',
    children: [
      {
        path: 'gridLayout',
        component: () => import('../../pages/Basic/gridLayout/gridLayout'),
        meta: { auth: true, key: 'col' },
        name: '栅格布局',
      },
      {
        path: 'icon-svg',
        component: () => import('../../pages/Basic/Icon-svg/Icon-svg'),
        meta: { auth: true, key: 'icon-svg' },
        name: 'svg 图标',
      },
      {
        path: 'icon-class',
        component: () => import('../../pages/Basic/Icon-class/Icon-class'),
        meta: { auth: true, key: 'icon-class' },
        name: 'class 图标',
      },
      {
        path: 'button',
        component: () => import('../../pages/Basic/Button/Button'),
        meta: { auth: true, key: 'button' },
        name: '按钮',
      },
    ],
  },
];
