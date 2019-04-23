/**
 * hook Fn for router
 */
export default {
  beforeEach: (to, from, next) => {
    if (to.meta.auth) {
      if (2) {
        next();
      } else {
        next('/account/login');
      }
    } else {
      next();
    }
  },
  afterEach: (to, from) => {},
};
