import {arrContainObj} from '../../../../utils/index';
import validateRule from '../../../../utils/validate/validate-rule';

export default {
  name: 'slot-scope',
  components: {},

  data() {
    return {
      //form cell status
      formCellList: ['link', 'input', 'rate', 'date', 'checkbox', 'radio', 'select', 'select-unit',],
      deleteKey: 'empty-check-list',
    };
  },
  props: {
    scope: {
      type: Object, default() {
        return {
          row: {}
        }
      }
    },//当前行-表格数据
    item: {type: Object},//当前列-表头数据
    checkList: {type: Array},//validate list for from cell in grid
    rowIndex: {type: Number},//行索引
    colIndex: {type: Number},//列索引
    keyRefer: {type: Object},//key refer for grid
  },
  computed: {
    //key refer for grid head
    headRefer() {
      return this.keyRefer.head;
    },
    //key refer for grid scope
    scopeRefer() {
      return this.keyRefer.scope;
    },
    cell_className() {
      return {}
    }
  },
  render(h) {
    // is form cell render
    const isFormRender = this.formCellRender(this.item);
    const modelCode = this.item[this.headRefer['model-code']];  //key
    const formConfig = this.item[this.headRefer['cell-Config']];//form config object
    const cellKey = modelCode + '-' + this.rowIndex + '-' + this.colIndex;
    /**
     * cellRender
     * @param isFormRender     is form cell render
     * @param scope            row data
     * @param item             head item data
     * @param cellKey
     * @param refer            key refer
     * @returns {*}
     */
    let cellRender = (isFormRender, scope, item, cellKey, refer) => {

      if (isFormRender) {
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
              <el-input className="grid-cell" v-model={scope.row[modelCode]} size="mini"
                        placeholder={formConfig.placeHolder}
                        disabled={formConfig.disabled} clearable={true}
                        on-change={this.formChange.bind(this, item, cellKey, refer)}>
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
                         placeholder={formConfig.placeHolder} clearable={true}
                         on-change={this.formChange.bind(this, item, cellKey, refer)}>
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
                         placeholder={formConfig.placeHolder} clearable={true} on-change={this.selectUnitChange.bind(this, modelCode, scope)}>
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
      <div class={['cell-container', isFormRender ? 'form-cell' : 'norm-cell',
        {'is-error': this.validateCheck(this.scope, this.item, cellKey, this.headRefer)}]}>
        {
          cellRender(isFormRender, this.scope, this.item, cellKey, this.headRefer)
        }
        {
          isFormRender ?
            <div class="el-form-item__error">{'错误信息'}</div> :
            null
        }
      </div>
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
      const conf = item.eidtConfig;
      if (!conf) {
        return false;
      }
      if (!conf.switchType) {
        return false;
      }
      const t = conf.type;
      if (!arrContainObj(this.formCellList, t)) {
        return false;
      }
      return true;
    },
    /**
     * 表格单元格点击行为事件
     * @param scope
     * @param item
     */
    cellAction(scope, item) {
      this.$emit("cell-action", scope, item);
    },


    /**
     * validate check => change class name to change style
     * @param scope           row data
     * @param item            col of head data
     * @param cellKey         cell key of grid
     * @param refer           head key refer
     * @returns {boolean}
     */
    validateCheck(scope, item, cellKey, refer) {
      const formConfig = item[refer['cell-Config']];//form config object
      if (!formConfig) return false;

      /**
       * get form-cell value
       * @param scope     row data
       * @param key       model key
       * @returns {*}
       */
      let getValue = (scope, key) => {
        const val = scope.row[key];
        try {
          return val['picked'].value;
        }
        catch (e) {
          return val;
        }
      };

      const modelCode = item[refer['model-code']];  //model code
      const required = formConfig.require;          //form of cell  require switch
      const ruleType = formConfig.validateRule;     //form of cell validate rule
      const value = getValue(scope, modelCode);     //get form-cell value

      let judge = () => {
        console.log('judge 开始 ');
        //是否验证通过
        if (!arrContainObj(this.checkList, cellKey) && !arrContainObj(this.checkList, 'all-check')) return true;
        console.log('需要验证！！！');
        if (required) {
          console.log('需要必填 is required ');
          if (value) {
            console.log('有值！！！！！！！！！！！');
            return validateRule(value, ruleType);
          }
          else {
            console.log('没有值！！！！！！！！！！！');
            return false;
          }
        }
        else {
          console.log('无需必填 not required ');
          if (value) {
            console.log('有值！！！！！！！！！！！');
            return validateRule(value, ruleType);
          }
          else {
            return true;
          }
        }
      };

      console.log('====== 当前验证开始 ======');
      console.log('是否必填');
      console.log(required);
      console.log('验证内容类型');
      console.log(ruleType);
      console.log('内容值');
      console.log(value);
      console.log('内容验证结果 ');
      console.log(validateRule(value, ruleType));
      console.log('最终验证结果');
      console.log(judge());
      return !judge();
    },

    /**
     * form change event
     * @param item
     * @param cellKey
     * @param refer
     * @param value
     */
    formChange(item, cellKey, refer, value) {
      const formConfig = item[refer['cell-Config']];//form config object
      //when this col type is form we can edit, so we should to  validate in need
      if (formConfig) {
        this.$emit("set-formCell-check", cellKey);//put this form cell key to check list
      }

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
       * if change value is empty , unit value as same as change value
       */
      if (!value) {
        row[unit] = '';
      }
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
  beforeDestroy: function () {
    this.$emit("set-formCell-check", this.deleteKey);//put this form cell key to check list
  }
};

