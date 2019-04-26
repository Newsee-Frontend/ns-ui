const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const dataRouter = [
  {
    path: '/data',
    component: Layout,
    redirect: '/data/Badge',
    name: '数据',
    children: [
      {
        path: 'badge',
        component: () => import('../../pages/Data/Badge/Badge'),
        meta: { auth: true, key: 'Badge' },
        name: 'Badge 标记',
      },
      {
        path: 'progress',
        component: () => import('../../pages/Data/Progress/Progress'),
        meta: { auth: true, key: 'Progress' },
        name: 'Progress 布局',
      }
    ],
  },
];
