export default {
  computed: {
    errorType() {
      // alert(this.data);
      // alert(this.loading);
      if (
        !this.head.some(
          h => [...this.formColInclude, ...this.normalColInclude].indexOf(h.type) > -1,
        )
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
