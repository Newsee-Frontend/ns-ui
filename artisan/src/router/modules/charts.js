const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const chartsRouter = [
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/PieChart',
    name: '数据',
    children: [
      {
        path: 'pieChart',
        component: () => import('../../pages/charts/PieChart/PieChart'),
        meta: { auth: true, key: 'pieChart' },
        name: '环形图',
      },

    ],
  },
];
