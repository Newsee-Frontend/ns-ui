const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const dataRouter = [
  {
    path: '/data',
    component: Layout,
    redirect: '/data/Badge',
    name: '数据',
    children: [
      {
        path: 'table',
        component: () => import('../../pages/Data/Table/Table'),
        meta: { auth: true, key: 'Table' },
        name: 'Table 表格',
      },
      {
        path: 'normal-table-layout',
        component: () => import('../../pages/Data/Table/Table-layout-normal'),
        meta: { auth: true, key: 'table-layout-normal' },
        name: '常规表格标准页',
      },
      {
        path: 'form-table-layout',
        component: () => import('../../pages/Data/Table/Table-layout-form'),
        meta: { auth: true, key: 'table-layout-form' },
        name: '表单表格标准页',
      },
      {
        path: 'badge',
        component: () => import('../../pages/Data/Badge/Badge'),
        meta: { auth: true, key: 'Badge' },
        name: 'Badge 标记',
      },
      {
        path: 'progress',
        component: () => import('../../pages/Data/Progress/Progress'),
        meta: { auth: true, key: 'Progress' },
        name: 'Progress 布局',
      },
      {
        path: 'tree',
        component: () => import('../../pages/Data/Tree/Tree'),
        meta: { auth: true, key: 'Progress' },
        name: 'Tree树形控件',
      },
      {
        path: 'pagination',
        component: () => import('../../pages/Data/Pagination/Pagination'),
        meta: { auth: true, key: 'pagination' },
        name: 'Pagination分页',
      },
    ],
  },
];
