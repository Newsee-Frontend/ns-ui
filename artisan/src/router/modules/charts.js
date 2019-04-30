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
      {
        path: 'simplePieChart',
        component: () => import('../../pages/charts/SimplePieChart/SimplePieChart'),
        meta: { auth: true, key: 'simplePieChart' },
        name: '简单环形图',
      },
      {
        path: 'labelLinePieChart',
        component: () => import('../../pages/charts/LabelLinePieChart/LabelLinePieChart'),
        meta: { auth: true, key: 'labelLinePieChart' },
        name: '引导线环形图',
      },
      {
        path: 'columnChart',
        component: () => import('../../pages/charts/ColumnChart/ColumnChart'),
        meta: { auth: true, key: 'columnChart' },
        name: '柱状图',
      },
      {
        path: 'stackedBarChart',
        component: () => import('../../pages/charts/StackedBarChart/StackedBarChart'),
        meta: { auth: true, key: 'stackedBarChart' },
        name: '堆叠柱状图',
      },
      {
        path: 'barChart',
        component: () => import('../../pages/charts/BarChart/BarChart'),
        meta: { auth: true, key: 'barChart' },
        name: '条形图',
      },
      {
        path: 'ganttChart',
        component: () => import('../../pages/charts/GanttChart/GanttChart'),
        meta: { auth: true, key: 'ganttChart' },
        name: '甘特图',
      },
      {
        path: 'lineChart',
        component: () => import('../../pages/charts/LineChart/LineChart'),
        meta: { auth: true, key: 'lineChart' },
        name: '折线图',
      },
      {
        path: 'barLineChart',
        component: () => import('../../pages/charts/BarLineChart/BarLineChart'),
        meta: { auth: true, key: 'barLineChart' },
        name: '柱状单折线图',
      },
      {
        path: 'barDoubleLineChart',
        component: () => import('../../pages/charts/BarDoubleLineChart/BarDoubleLineChart'),
        meta: { auth: true, key: 'barDoubleLineChart' },
        name: '柱状双折线图',
      }
    ],
  },
];
