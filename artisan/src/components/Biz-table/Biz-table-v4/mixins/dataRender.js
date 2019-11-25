export default {
  data() {
    return {
      renderLoading: this.isHugeData,
    };
  },
  watch: {
    data: {
      handler: function(val) {

        if (this.isHugeData) {
          const target = this.$refs['bizTable'];
          if (target) {
            target.reloadData(val)
              .then(() => {
                this.renderLoading = false;
              })
              .catch(e => {
                this.renderLoading = false;
              });
          }
        }
      },
      deep: true,
    },
  },
};