import { judgeType } from '../../../utils/library/basic';

export default {
  computed: {
    toggletype() {
      return this.childInterval[this.keyRefer['type']];
    },
  },
  watch: {
    toggletype: {
      handler: function(val) {
        switch (val) {
          case 'day':
            this.delProperty([
              [this.keyRefer['mounthAndDay']],
              [this.keyRefer['week']],
              [this.keyRefer['day']],
            ]); //delete property
            break;
          case 'week':
            this.initModel([this.keyRefer['week']], 'Mon');
            this.delProperty([[this.keyRefer['mounthAndDay']], [this.keyRefer['day']]]);
            break;
          case 'mouth':
            this.initModel([this.keyRefer['day']], 1);
            this.delProperty([[this.keyRefer['mounthAndDay']], [this.keyRefer['week']]]);
            break;
          case 'year':
            this.initModel([this.keyRefer['mounthAndDay']], '01-01');
            this.delProperty([[this.keyRefer['day']], [this.keyRefer['week']]]);
            break;
          default:
            break;
        }
      },
      deep: true,
    },
  },
  methods: {
    /**
     * init model value
     * @param key
     * @param init      init data
     */
    initModel(key, init) {
      const val = this.childInterval[key];
      if (val || val === 0) {
        return;
      }
      this.$set(this.childInterval, key, init);
    },
    /**
     * delete property
     * @param proList
     */
    delProperty(proList) {
      if (judgeType(proList) !== 'array') {
        return;
      }
      proList.forEach(key => {
        delete this.childInterval[key];
      });
    },
  },
};
