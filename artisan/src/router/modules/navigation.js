const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const navigationRouter = [
  {
    path: '/navigation',
    component: Layout,
    redirect: '/navigation/steps',
    name: '导航',
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
      },
      {
        path: 'dropdown',
        component: () => import('../../pages/Navigation/Dropdown/Dropdown'),
        meta: { auth: true, key: 'dropdown' },
        name: 'dropdown',
      },
    ],
  },
];
