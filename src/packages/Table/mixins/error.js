import { judgeType } from '../../../utils/index';

export default {
  computed: {
    errorType() {

      if (!this.isLoadReady) return 'no-error';

      const colKey = this.headRefer['xtype'];

      if (
        !this.head.some(h => this.normalColInclude.indexOf(h[colKey]) > -1)
        ||
        !(this.data && judgeType(this.data) === 'array')
      ) {
        return 'service-error';
      }
      else if (this.data.length === 0) {
        return 'no-result';
      }
      else {
        return 'no-error';
      }

    },
  },
};
