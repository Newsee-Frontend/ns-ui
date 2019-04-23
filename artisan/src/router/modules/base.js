const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const baseRouter = [
  {
    path: '/base',
    component: Layout,
    redirect: '/base/col',
    name: '基础',
    children: [
      {
        path: 'col',
        component: () => import('../../pages/Base/col'),
        meta: {requireAuth: true, key: 'col'},
        name: 'col 布局',
      },
      {
        path: 'row',
        component: () => import('../../pages/Base/row'),
        meta: {requireAuth: true, key: 'row'},
        name: 'row 布局',
      },
    ],
  },
];
