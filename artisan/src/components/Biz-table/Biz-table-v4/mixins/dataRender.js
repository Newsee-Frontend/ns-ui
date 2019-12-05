/**
 * 关于业务表格表数据的操作
 * 在大数据表格中，监听表头 / 表数据 获取 - 是否准备完毕，进而加载表数据
 */
export default {
  data() {
    return {
      renderLoading: this.isHugeData,
    };
  },
  watch: {
    fetchReady(val) {

      if (!val) return;

      if (this.isHugeData) {

        this.$nextTick(() => {
          const target = this.$refs['bizTable'];
          if (target) {
            this.renderLoading = this.isHugeData;
            target.reloadData(this.data)
              .then(() => {
                this.renderLoading = false;
              })
              .catch(e => {
                this.renderLoading = false;
              });
          }
        });
      }
    },
  },
};
