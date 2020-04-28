const Layout = resolve => require(['@/layout/layout.vue'], resolve);

export const tableRouter = [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    name: '表格',
    children: [
      {
        path: 'index',
        component: () => import('../../pages/Table/Old-table-v3/Table'),
        meta: { auth: true, key: 'Table' },
        name: 'Table 表格',
      },
      {
        path: 'normal-table-layout',
        component: () => import('../../pages/Table/Old-table-v3/Table-layout-normal'),
        meta: { auth: true, key: 'table-layout-normal' },
        name: '常规表格标准页',
      },
      {
        path: 'form-table-layout',
        component: () => import('../../pages/Table/Old-table-v3/Table-layout-form'),
        meta: { auth: true, key: 'table-layout-form' },
        name: '表单表格标准页',
      },
      {
        path: 'table-test-demo',
        component: () => import('../../pages/Table/Old-table-v3/Table-test-demo'),
        meta: { auth: true, key: 'table-test-demo' },
        name: '表格测试页',
      },
      {
        path: 'new-hugeDataTable',
        component: () => import('../../pages/Table/New-table-v4/hugeDataTable/hugeDataTable'),
        meta: { auth: true, key: 'new-hugeDataTable' },
        name: '新表格-大数据量',
      },
      {
        path: 'new-formTable',
        component: () => import('../../pages/Table/New-table-v4/formTable/formTable'),
        meta: { auth: true, key: 'new-formTable' },
        name: '新表格-表单',
      },
      {
        path: 'new-formTable-changeCol',
        component: () => import('../../pages/Table/New-table-v4/formTable/changeCol'),
        meta: { auth: true, key: 'new-formTable-changeCol' },
        name: '切换表头',
      },
      {
        path: 'new-formTable-slot',
        component: () => import('../../pages/Table/New-table-v4/cell-slot/cell-slot'),
        meta: { auth: true, key: 'new-formTable-slot' },
        name: '新表格-插槽单元格',
      },

    ],
  },
];
