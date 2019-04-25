const iniView = '/login';
const Layout = resolve => require(['@/layout/layout.vue'], resolve);

export const publicRouter = [
  { path: '/', redirect: iniView },
  { path: '*', redirect: iniView },

  // 主页
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [
      {
        path: 'dashboard',
        component: () => import('../../pages/dashboard/index'),
        meta: { auth: true, key: 'dashboard' },
        name: '欢迎页面',
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    component: () => import('../../pages/Public/404'),
    meta: { auth: false },
  },
];
