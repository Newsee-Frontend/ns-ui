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
    //key refer for grid head
    headRefer() {
      return this.keyRefer.head;
    },
    //key refer for grid scope
    scopeRefer() {
      return this.keyRefer.scope;
    }
  },
  render(h) {
    /**
     * cellRender
     * @param scope   row data
     * @param item    head item data
     * @param refer   key refer
     * @returns {*}
     */
    let cellRender = (scope, item, refer) => {
      const modelCode = item[refer['model-code']];  //key
      const formConfig = item[refer['cell-Config']];//form config object
      if (this.formCellRender(item)) {
        let type = item.eidtConfig.type;
        switch (type) {
          case 'link':
            return (
              <div class="grid-cell grid-cell_link" title={scope.row[modelCode]}
                   on-click={this.cellAction.bind(this, scope, item)}
              >
                {scope.row[modelCode]}
              </div>
            );
          case 'input':
            return (
              <el-input class="grid-cell" v-model={scope.row[modelCode]} size="mini"
                        placeholder={formConfig.placeHolder}
                        disabled={formConfig.disabled} clearable={true}>
              </el-input>
            );
          case 'rate':
            return (
              <el-input-number class="grid-cell" v-model={scope.row[modelCode]}
                               size="mini" min={formConfig.min} max={formConfig.max}
                               disabled={formConfig.disabled}
              >
              </el-input-number>
            );
          case 'date':
            return (
              <el-date-picker class="grid-cell" v-model={scope.row[modelCode]}
                              disabled={formConfig.disabled}
                              size="mini" type="date" editable={false}
                              placeholder={formConfig.placeHolder} value-format="yyyy-MM-dd 00:00:00">
              </el-date-picker>
            );
          case 'checkbox':
            return (
              <el-checkbox-group class="grid-cell" v-model={scope.row[modelCode].picked.value} disabled={formConfig.disabled}
                                 size="mini" min={formConfig.min} max={formConfig.max}>
                {
                  scope.row[modelCode].options.map((item, $index) =>
                    [
                      <el-checkbox key={item.value} label={item.label}></el-checkbox>
                    ]
                  )
                }
              </el-checkbox-group>
            );
          case 'radio':
            return (
              <el-radio-group class="grid-cell" v-model={scope.row[modelCode].picked.value} disabled={formConfig.disabled} size="mini">
                {
                  scope.row[modelCode].options.map((item, $index) =>
                    [
                      <el-radio key={item.value} label={item.label}></el-radio>
                    ]
                  )
                }
              </el-radio-group>
            );
          case 'select':
            return (
              <el-select class="grid-cell" v-model={scope.row[modelCode].picked.value} size="mini" editable={false} disabled={formConfig.disabled}
                         placeholder={formConfig.placeHolder}>
                {
                  scope.row[modelCode].options.map((item, $index) =>
                    [
                      <el-option key={item.value} label={item.label} value={item.value}></el-option>
                    ]
                  )
                }
              </el-select>
            );
          case 'select-unit':
            return (
              <el-select class="grid-cell" v-model={scope.row[modelCode].picked.value} size="mini" editable={false} disabled={formConfig.disabled}
                         placeholder={formConfig.placeHolder} on-change={this.selectUnitChange.bind(this, modelCode, scope)}>
                {
                  scope.row[modelCode].options.map((item, $index) =>
                    [
                      <el-option key={item.value} label={item.label} value={item.value}></el-option>
                    ]
                  )
                }
              </el-select>
            );
          default:
            return (<div>{scope.row[modelCode]}</div>);
        }
      }
      else {
        return (<div>{scope.row[modelCode]}</div>);
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
    /**
     * select unit change
     * @param modelCode
     * @param scope
     * @param value
     */
    selectUnitChange(modelCode, scope, value) {

      const modelData = this.scopeRefer['modelData'];
      const items = this.scopeRefer['items'];
      const unit = this.scopeRefer['unit'];

      const row = scope.row;//row data
      const options = row[modelCode][items];//select option data
      console.log('selectUnitChange - selectUnitChange');


      console.log(modelData);
      console.log(items);
      console.log(unit);
      console.log(row);
      console.log(options);

      console.log('============== - ===============');
      /**
       * 在 select-unit 类型的表单控件中，找到change 选择的 value 的得那项 option，获取其unit字段值，赋值给所此控件数据下picked字段下的unit字段
       * 再判断所在行row 数据下是否有 unit 字段，如果有的话为其赋值 change 选择的 value 值的那项 option 的unit字段值
       */
      for (let ipt of options) {
        if (ipt.value === value) {
          row[modelCode][modelData][unit] = ipt[unit];
          if (row.hasOwnProperty(unit)) {
            row[unit] = ipt[unit];
          }
          break;
        }
      }
      console.log('selectUnitChange - 改变后的scope值');
      console.log(scope)
    }
  },
};

