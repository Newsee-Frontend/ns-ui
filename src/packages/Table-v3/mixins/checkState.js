export default {
  data() {
    return {
      checkStator: {
        state: '',
        list: [],
      },
    };
  },
  watch: {
    checkStator: {
      handler(newValue, oldValue) {
        // if (newValue.state === 'empty-check-list') {
        //   newValue.list = [];
        //   newValue.state = '';
        // }
      },
      deep: true,
    },
  },
  methods: {
    checkAll() {
      this.checkStator.state = 'CHECK_ALL';
    },
    resetCheck() {
      this.checkStator = {
        state: 'READY',
        list: [],
      };
    },
    /**
     * set form-cell check config (check list) in table
     * @param key
     */
    setCheckStator(key) {
      if (this.checkStator.state === 'READY') {
        this.checkStator.state = 'CHECKING';
      }
      if (this.checkStator.list.indexOf(key) === -1) {
        this.checkStator.list.push(key);
      }
    },
  },
  beforeDestroy() {
    this.checkStator = null;
  },
};
