import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';
import hook from './hook';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(hook.beforeEach);
router.afterEach(hook.afterEach);

export default router;
