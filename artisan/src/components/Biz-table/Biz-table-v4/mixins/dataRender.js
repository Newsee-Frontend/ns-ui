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

          this.$refs['bizTable'].reloadData(val)
            .then(() => {
              this.renderLoading = false;
            })
            .catch(e => {
              this.renderLoading = false;
            });
        }
      },
      deep: true,
    },
  },
};
