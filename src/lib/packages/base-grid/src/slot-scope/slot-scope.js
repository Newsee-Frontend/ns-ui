export default {
  name: 'slot-scope',
  components: {},

  data() {
    return {};
  },
  props: {
    scope: {
      type: Object, default() {
        return {
          row: {}
        }
      }
    },
    item: {type: Object},
    keyRefer: {type: Object},//指代属性
  },
  computed: {
    headRefer() {
      return this.keyRefer.head;
    }
  },
  render(h) {
    let cellRender = (scope, item, refer) => {
      if (this.formCellRender(item)) {
        let type = item.eidtConfig.type;
        switch (type) {
          case 'link':
            return (
              <div class="grid-cell grid-cell_link" title={scope.row[item[refer['model-code']]]}
                   on-click={this.cellAction.bind(this, scope, item)}
              >
                {scope.row[item[refer['model-key']]]}
              </div>
            );
            break;
          case 'input':
            return (
              <el-input class="grid-cell" v-model={scope.row[item[refer['model-key']]]} size="mini"
                        placeholder={item[refer['model-key']].placeHolder}
                        disabled={item[refer['cell-Config']].disabled} clearable={true}>
              </el-input>
            );
            break;
          case 'rate':
            return (
              <el-input-number class="grid-cell" v-model={scope.row[item[refer['model-key']]]}
                               size="mini" min={item[refer['cell-Config']].min} max={item[refer['cell-Config']].max}
                               disabled={item[refer['cell-Config']].disabled}
              >
              </el-input-number>
            );
            break;
          case 'date':
            return (
              <el-date-picker class="grid-cell" v-model={scope.row[item[refer['model-key']]]}
                              disabled={item[refer['cell-Config']].disabled}
                              size="mini" type="date" editable={false}
                              placeholder={item[refer['model-key']].placeHolder} value-format="yyyy-MM-dd 00:00:00">
              </el-date-picker>
            );
            break;
          default:
            return (<div>{scope.row[item[refer['model-key']]]}</div>);
            break;
        }
      }
      else {
        return (<div>{scope.row[item[refer['model-key']]]}</div>);
      }
    };

    return (
      cellRender(this.scope, this.item, this.headRefer)
    )
  },
  created() {
  },
  watch: {},
  methods: {
    /**
     * table - cell ( form components ) render switch
     * @param item        table item data
     * @returns {boolean}
     */
    formCellRender(item) {
      if (!item) {
        return false;
      }
      if (!item.eidtConfig) {
        return false;
      }
      if (!item.eidtConfig.switchType) {
        return false;
      }
      return true;
    },
    //表格单元格点击行为事件
    cellAction(scope, item) {
      this.$emit("cell-action", scope, item);
    },
    houseView(item) {
      this.itemHouseId = item.row.houseId;
      this.itemHouseType = item.row.houseType;
      this.houseDetailVisible.visible = true;
    },
  },
};

