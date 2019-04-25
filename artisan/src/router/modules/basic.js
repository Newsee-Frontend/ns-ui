const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const baseRouter = [
  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/col',
    name: '基础',
    children: [
      {
        path: 'col',
        component: () => import('../../pages/Basic/col'),
        meta: {auth: true, key: 'col'},
        name: 'col 布局',
      },
      {
        path: 'row',
        component: () => import('../../pages/Basic/row'),
        meta: {auth: true, key: 'row'},
        name: 'row 布局',
      },
    ],
  },
];
