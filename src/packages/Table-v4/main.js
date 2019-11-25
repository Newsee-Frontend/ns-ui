import create from '../../create/create';

import selection from './mixins/selection';
import reRender from './mixins/reRender';
import validate from './mixins/validate';
import columntype from './mixins/columntype';
import namefactory from './mixins/namefactory';
import errorType from './mixins/errorType';

import columnRender from './components/column';
import identifier from './components/identifier';
import summaryDrop from './components/summary-drop';

import img_null from '../../assets/null.jpg';

export default create({
  name: 'table',
  components: { columnRender, summaryDrop, identifier },
  mixins: [selection, reRender, validate, namefactory, columntype, errorType],
  props: {
    loading: { type: Boolean, default: true },
    keyRefer: { type: Object },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    head: {
      type: Array,
      default() {
        return [];
      },
    },
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
  computed: {
    isMainReady() {
      //Header data must exist and loading status must be false
      return this.head && this.head.length;
    },
  },
  watch: {
    head: {
      handler: function(val) {
        this.customColumns = val.map(item => {
          return {
            field: item.field,
            visible: !item.hidden,
          };
        });

        if (this.$refs['main-table']) {
          this.$refs['main-table'].refreshColumn();
        }
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
      'highlight-hover-row': true,
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

    return (
      <div class={this.recls()} style={`height: ${this.height}px`}>
        {this.isMainReady
          ? h(
              `vxe-table`,
              {
                ref: 'main-table',
                props: props,
                on: {
                  'edit-actived': this.editActived,
                  'select-change': this.selectChange,
                  'select-all': this.selectAll,
                  'update:customs': value => {
                    this.customColumns = value;
                    this.$nextTick(() => {
                      this.$refs['main-table'].refreshColumn();
                    });
                  },
                },
                scopedSlots: {
                  empty: scope => {
                    return (
                      <span class={'error-prompt'}>
                        <img class={'errorImg'} src={img_null} />
                        <p> 抱歉, 没有搜索到你要的结果 </p>
                      </span>
                    );
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
                      'sync-column-render': data => {
                        // console.log(data.customColumns);

                        const target = this.$refs['main-table'];
                        ['change', 'lock'].indexOf(data.event) > -1
                          ? target.refreshColumn()
                          : target.reloadColumn(data.customColumns);
                      },
                    },
                  });
                }),
              ]
            )
          : null}
        {this.showFooter
          ? h('summary-drop', {
              on: {
                ...this.$listeners,
              },
            })
          : null}
        {h('identifier', {
          class: this.recls('mask'),
          props: {
            loading: this.loading,
            errorType: this.errorType,
          },
          on: {
            ...this.$listeners,
          },
        })}
      </div>
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
  mounted() {},
});
