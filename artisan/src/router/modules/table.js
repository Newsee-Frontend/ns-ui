const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const tableRouter = [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    name: '数据',
    children: [
      {
        path: 'index',
        component: () => import('../../pages/Table/Table'),
        meta: { auth: true, key: 'Table' },
        name: 'Table 表格',
      },
      {
        path: 'normal-table-layout',
        component: () => import('../../pages/Table/Table-layout-normal'),
        meta: { auth: true, key: 'table-layout-normal' },
        name: '常规表格标准页',
      },
      {
        path: 'form-table-layout',
        component: () => import('../../pages/Table/Table-layout-form'),
        meta: { auth: true, key: 'table-layout-form' },
        name: '表单表格标准页',
      },
      {
        path: 'table-test-demo',
        component: () => import('../../pages/Table/Table-test-demo'),
        meta: { auth: true, key: 'table-test-demo' },
        name: '表格测试页',
      },
    ],
  },
];
