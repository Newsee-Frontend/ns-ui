export default {
  computed: {
    errorType() {
      if (
        !this.head.some(
          h => [...this.formColInclude, ...this.normalColInclude].indexOf(h.type) > -1
        ) ||
        !this.data
      ) {
        return 'service-error';
      }
      // else if (this.data.length === 0) {
      //   return 'no-result';
      // }
      else {
        return 'no-error';
      }
    },
  },
};
