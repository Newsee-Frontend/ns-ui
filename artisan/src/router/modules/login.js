export const loginRouter = [
  {
    path: '/login',
    component: () => import('@/pages/Login/index'),
    meta: { redirect: '/dashboard' },
    hidden: true,
  },
];
