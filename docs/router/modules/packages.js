/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const packagesRouter = {
  path: '/packages',
  component: Layout,
  redirect: '/packages/cxgrid',
  name: 'Packages-Demo',
  meta: {
    title: 'Packages-Demo',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'cxgrid',
      component: () => import('@/views/grid-template/index'),
      name: 'cx-Grid',
      meta: {title: 'CX-Grid'}
    },
    {
      path: 'slipDialog',
      component: () => import('@/views/slip-dialog/index'),
      name: 'slip-dialog',
      meta: {title: 'slip-dialog'}
    }
  ]
};
export default packagesRouter
