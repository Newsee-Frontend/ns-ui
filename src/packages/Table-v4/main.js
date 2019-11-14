import create from '../../create/create';

import keyRefer from './mixins/keyRefer';
import selection from './mixins/selection';
import reRender from './mixins/reRender';
import validate from './mixins/validate';
import namefactory from './mixins/namefactory';
import columnRender from './components/column';

export default create({
  name: 'table',
  components: { columnRender },
  mixins: [keyRefer, selection, reRender, validate, namefactory],
  props: {
    loading: { type: Boolean },
    keyRefer: { type: Object },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    head: { type: Array },
    isHugeData: { type: Boolean, default: false }, //大数据量渲染，不支持表单表格的功能
    height: { type: Number, default: 300 },
    showFooter: { type: Boolean, default: false },
    footerMethod: { type: Function },
    checkMethod: { type: Function },
    editConfig: {
      type: Object,
      default: () => {
        return { trigger: 'click', mode: 'row', showStatus: true };
      },
    },
  },
  data() {
    return {
      customColumns: [],
    };
  },
  watch: {
    head: {
      handler: function(val) {
        this.customColumns = val.map(item => {
          return {
            field: item[this.headRefer['model-key']],
            visible: !item[this.headRefer['hidden']],
          };
        });
      },
      deep: true,
      immediate: true,
    },
  },
  render(h) {
    const props = {
      loading: this.loading,

      ...this.namefactory,

      property: 'setting',
      size: 'small',
      height: this.height,
      resizable: true,
      'show-overflow': true,
      'show-header-overflow': true,
      'edit-config': this.editConfig,
      'edit-rules': this.validRules,
      'checkbox-config': {
        checkField: 'checked',
        trigger: 'default',
        strict: true,
        checkMethod: this.checkMethod,
      },
      'show-footer': this.showFooter,
      'footer-method': this.footerMethod,
      customs: this.customColumns,
    };

    if (!this.isHugeData) {
      props.data = this.data;
    }

    return h(
      `vxe-table`,
      {
        ref: 'main-table',
        class: this.recls(),
        props: props,
        on: {
          'edit-actived': this.editActived,
          'select-change': this.selectChange,
          'select-all': this.selectAll,
          'update:customs': value => {
            this.customColumns = value;
          },
        },
      },
      [
        this.head.map((item, $index) => {
          return h(`column-render`, {
            key: `column-render-${$index}`,
            props: {
              column: item,
              columns: this.head,
              keyRefer: this.keyRefer,
              customColumns: this.customColumns,
            },
            on: {
              ...this.$listeners,
              // 'cell-event': this.cellEvent,
              // 'table-action': this.tableAction,
              // 'column-setting-submit': this.columnSettingSubmit,
              'sync-column-render': data => {
                console.log(data.customColumns);
                const target = this.$refs['main-table'];
                ['change', 'lock'].indexOf(data.event) > -1
                  ? target.refreshColumn()
                  : target.reloadColumn(data.customColumns);
              },
            },
          });
        }),
      ]
    );
  },
  methods: {
    fullValidate(cb) {
      this.$refs['main-table'].fullValidate(cb);
    },

    /**
     * table scroll to
     * @param x
     * @param y
     */
    scrollTo(x, y) {
      this.$refs['main-table'].scrollTo(x, y);
    },

    /**
     * form edit actived in table
     * @param row
     * @param rowIndex
     * @param $rowIndex
     * @param column
     * @param columnIndex
     * @param $columnIndex
     * @param cell
     */
    editActived({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell }) {
      this.$emit('edit-actived', { row, $rowIndex, column, $columnIndex, cell });
    },

    /**
     *set row active state
     */
    setActiveRow(row) {
      this.$refs['main-table'].setActiveRow(row);
      this.$refs['main-table'].setCurrentRow(row);
    },
    /**
     * clear row active
     */
    clearActived() {
      this.$refs['main-table'].clearActived();
    },
  },
  created() {},
  mounted() {
    console.log('created-created-created');
    console.log(this.data);
  },
});
