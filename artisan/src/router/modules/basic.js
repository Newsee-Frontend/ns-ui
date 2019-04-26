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
        component: () => import('../../pages/Basic/gridLayout'),
        meta: { auth: true, key: 'col' },
        name: '栅格布局',
      },
    ],
  },
];
