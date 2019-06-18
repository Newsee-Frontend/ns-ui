import Radio from '../../../Radio/Radio';

export default {
  name: 'first-column',
  components: { Radio },
  data() {
    return {
      childRadio: this.value,
    };
  },
  props: {
    headRefer: { type: Object },
    headScope: { type: Object },
    value: [String, Number],
  },
  watch: {
    value(val) {
      this.childRadio = val;
    },
  },
  computed:{
    columnType(){
      return  this.headScope[this.headRefer['xtype']];
    }
  },
  render(h) {
    return (
      h(
        `el-table-column`,
        {
          props: {
            'class-name': `table-head-${this.headScope[this.headRefer['model-code']]}`,
            type: this.columnType,
            align: 'center',
            fixed: true,
            width: this.headScope[this.headRefer['width']],
            label: this.headScope[this.headRefer['label']],
            key: `grid-head-${this.headScope[this.headRefer['model-code']]}`,
          },
          scopedSlots: this.columnType === 'radio' ? {
            default: scope => {
              return (
                h('Radio', {
                  class: 'column-radio',
                  domProps: {
                    value: this.value,
                  },
                  props: {
                    value: this.childRadio,
                    label: scope.$index,
                    isGroup: false,
                  },
                  on: {
                    input: event => {
                      this.childRadio = event;
                      this.$emit('input', event);
                    },
                    change: this.selectionChange.bind(this, scope.row, scope.$index),
                  },
                }, null)
              );
            },
          } : null,
        },
      )
    );
  },
  methods: {
    selectionChange(row, index) {
      this.$emit('selection-change', row, index);
    },
  },
};
