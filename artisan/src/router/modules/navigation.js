const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const navigationRouter = [
  {
    path: '/navigation',
    component: Layout,
    redirect: '/navigation/steps',
    name: '表单',
    children: [
      {
        path: 'steps',
        component: () => import('../../pages/Navigation/Steps/Steps'),
        meta: { auth: true, key: 'steps' },
        name: 'steps',
      },
      {
        path: 'tabs',
        component: () => import('../../pages/Navigation/Tabs/Tabs'),
        meta: { auth: true, key: 'tabs' },
        name: 'tabs',
      }
    ],
  },
];
