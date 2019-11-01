const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const chartsRouter = [
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/pieChart',
    name: '图标',
    children: [
      {
        path: 'pieChart',
        component: () => import('../../pages/Charts/PieChart/PieChart'),
        meta: { auth: true, key: 'pieChart' },
        name: '环形图',
      },
      {
        path: 'simplePieChart',
        component: () => import('../../pages/Charts/SimplePieChart/SimplePieChart'),
        meta: { auth: true, key: 'simplePieChart' },
        name: '简单环形图',
      },
      {
        path: 'labelLinePieChart',
        component: () => import('../../pages/Charts/LabelLinePieChart/LabelLinePieChart'),
        meta: { auth: true, key: 'labelLinePieChart' },
        name: '引导线环形图',
      },
      {
        path: 'columnChart',
        component: () => import('../../pages/Charts/ColumnChart/ColumnChart'),
        meta: { auth: true, key: 'columnChart' },
        name: '柱状图',
      },
      {
        path: 'stackedBarChart',
        component: () => import('../../pages/Charts/StackedBarChart/StackedBarChart'),
        meta: { auth: true, key: 'stackedBarChart' },
        name: '堆叠柱状图',
      },
      {
        path: 'barChart',
        component: () => import('../../pages/Charts/BarChart/BarChart'),
        meta: { auth: true, key: 'barChart' },
        name: '条形图',
      },
      {
        path: 'ganttChart',
        component: () => import('../../pages/Charts/GanttChart/GanttChart'),
        meta: { auth: true, key: 'ganttChart' },
        name: '甘特图',
      },
      {
        path: 'lineChart',
        component: () => import('../../pages/Charts/LineChart/LineChart'),
        meta: { auth: true, key: 'lineChart' },
        name: '折线图',
      },
      {
        path: 'barLineChart',
        component: () => import('../../pages/Charts/BarLineChart/BarLineChart'),
        meta: { auth: true, key: 'barLineChart' },
        name: '柱状单折线图',
      },
      {
        path: 'barDoubleLineChart',
        component: () => import('../../pages/Charts/BarDoubleLineChart/BarDoubleLineChart'),
        meta: { auth: true, key: 'barDoubleLineChart' },
        name: '柱状双折线图',
      },
    ],
  },
];
