const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const layoutRouter = [
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/head',
    name: '布局',
    children: [
      {
        path: 'head',
        component: () => import('../../pages/Layout/head'),
        meta: {requireAuth: true, key: 'head'},
        name: '头部布局',
      },
      {
        path: 'sidebar',
        component: () => import('../../pages/Layout/sidebar'),
        meta: {requireAuth: true, key: 'sidebar'},
        name: '侧边栏',
      },
    ],
  },
];
