export default {
  methods: {
    /**
     * reload table data
     * @param tableData
     * @returns {Promise<any>}
     */
    reloadData(tableData) {
      if (!this.isHugeData) return;
      return new Promise((resolve, reject) => {
        this.$refs['main-table']
          .reloadData(tableData)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    /**
     * loadData table data
     * @param tableData
     * @returns {Promise<any>}
     */
    loadData(tableData) {
      if (!this.isHugeData) return;
      return new Promise((resolve, reject) => {
        this.$refs['main-table']
          .loadData(tableData)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    /**
     * update table footer
     * @returns {Promise<any>}
     */
    updateFooter() {
      return new Promise((resolve, reject) => {
        this.$refs['main-table']
          .updateFooter()
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
};
