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
      errClass: 'cx-is-error',
      normalErrMsg: '请正确选择/输入',
    };
  },
  props: {
    gridID: {type: String},//表格ID值
    scope: {
      type: Object, default() {
        return {
          row: {}
        }
      }
    },//当前行-表格数据
    item: {type: Object},//当前列-表头数据
    gridCheck: {type: Object},//grid check data for form in grid cell
    rowIndex: {type: Number},//行索引
    colIndex: {type: Number},//列索引
    firstRowHasError: {type: Object},//第一行数中 表单 单元格是否存在验证错误的情况
    keyRefer: {type: Object},//key refer for grid
    wrapperHeight: {type: Number},
    topGapForErrMsg: {type: Number},//表格第一行顶部留白间距（为验证错误信息腾出空间)
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
    },
    //form config object
    formConfig() {
      return this.item[this.headRefer['cell-Config']];
    }
  },
  render(h) {
    const isFormRender = this.formCellRender(this.item);// is form cell render
    const modelCode = this.item[this.headRefer['model-code']];  //key
    const cellKey = modelCode + '-' + this.rowIndex + '-' + this.colIndex;
    //set param
    const Param = {
      modelCode: modelCode,         //get this col model key in gird head data
      scope: this.scope,            //get this row data
      item: this.item,              //this col data in grid head
      cellKey: cellKey,             //cell key ( modelCode + row-index + row-index )
      headRefer: this.headRefer,    //head refer
      scopeRefer: this.scopeRefer   //scope refer
    };
    /**
     * cellRender
     * @param isFormRender     is form cell render
     * @param Param            all param
     * @returns {*}
     */
    let cellRender = (isFormRender, Param) => {
      const scope = Param.scope;//row data
      const item = Param.item;//head item data
      if (isFormRender) {
        let type = this.formConfig.type;
        switch (type) {
          case 'link':
            return (
              <div class="grid-cell grid-cell_link" title={scope.row[modelCode]}
                   on-click={this.cellAction.bind(this, Param)}
              >
                {scope.row[modelCode]}
              </div>
            );
          case 'input':
            return (
              <el-input class="grid-cell" v-model={scope.row[modelCode]} size="mini"
                        placeholder={this.formConfig.placeHolder}
                        disabled={this.formConfig.disabled} clearable={true}
                        on-change={this.formChange.bind(this, Param)}>
              </el-input>
            );
          case 'rate':
            return (
              <el-input-number class="grid-cell" v-model={scope.row[modelCode]}
                               size="mini" min={this.formConfig.min} max={this.formConfig.max}
                               disabled={this.formConfig.disabled}
              >
              </el-input-number>
            );
          case 'date':
            return (
              <el-date-picker class="grid-cell" v-model={scope.row[modelCode]}
                              disabled={this.formConfig.disabled}
                              size="mini" type="date" editable={false}
                              placeholder={this.formConfig.placeHolder} value-format="yyyy-MM-dd 00:00:00"
                              on-change={this.formChange.bind(this, Param)}>
              </el-date-picker>
            );
          case 'checkbox':
            return (
              <el-checkbox-group class="grid-cell" v-model={scope.row[modelCode].picked.value} disabled={this.formConfig.disabled}
                                 size="mini" min={this.formConfig.min} max={this.formConfig.max}
                                 on-change={this.formChange.bind(this, Param)}>
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
              <el-radio-group class="grid-cell" v-model={scope.row[modelCode].picked.value} disabled={this.formConfig.disabled}
                              size="mini" on-change={this.formChange.bind(this, Param)}>
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
              <el-select class="grid-cell" v-model={scope.row[modelCode].picked.value} size="mini" editable={false} disabled={this.formConfig.disabled}
                         placeholder={this.formConfig.placeHolder} clearable={true}
                         on-change={this.formChange.bind(this, Param)}>
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
              <el-select class="grid-cell" v-model={scope.row[modelCode].picked.value} size="mini" editable={false} disabled={this.formConfig.disabled}
                         placeholder={this.formConfig.placeHolder} clearable={true}
                         on-change={this.selectUnitChange.bind(this, Param)}>
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

    /**
     * get error message
     * @returns {string}
     */
    let getErrMsg = () => {
      try {
        const errorMsg = this.formConfig[this.headRefer['errorMsg']];//error message
        return errorMsg || this.normalErrMsg;
      }
      catch (e) {
        return this.normalErrMsg;
      }
    };

    const errSW = this.validateCheck(Param);
    return (
      <div class={['cell-container', isFormRender ? 'form-cell' : 'norm-cell', {[this.errClass]: errSW}]}>
        {
          cellRender(isFormRender, Param)
        }
        {
          <transition name='cx-grid-errorMsg-fade'>
            {
              isFormRender && errSW ?
                <div class="el-form-item__error">{getErrMsg()}</div>
                : null
            }
          </transition>
        }
      </div>
    )
  },
  created() {
  },

  updated: function () {
    //判断 表格第一行数中 表单 单元格是否存在验证错误的情况
    this.judgeFirstRowHasError();
  },
  mounted() {
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
     * @param Param
     */
    cellAction(Param) {
      this.$emit("cell-action", Param.scope, Param.item);
    },


    /**
     * validate check => change class name to change style
     * @param Param           all param
     * @returns {boolean}
     */
    validateCheck(Param) {
      if (!this.formConfig) return false;

      /**
       * get form-cell value
       * @param scope         row data
       * @param key           model key
       * @param scopeRefer
       * @returns {*}
       */
      let getValue = (scope, key, scopeRefer) => {
        const val = scope.row[key];
        try {
          return val[scopeRefer['modelData']].value;
        }
        catch (e) {
          return val;
        }
      };

      const modelCode = Param.item[Param.headRefer['model-code']];  //model code
      const required = this.formConfig.require;          //form of cell  require switch
      const ruleType = this.formConfig.validateRule;     //form of cell validate rule
      const value = getValue(Param.scope, modelCode, Param.scopeRefer);     //get form-cell value

      let judge = () => {
        // console.log('judge 开始 ');
        //是否验证通过
        if (!arrContainObj(this.gridCheck.list, Param.cellKey) && this.gridCheck.state !== 'all-check') return true;
        // console.log('需要验证！！！');
        if (required) {
          // console.log('需要必填 is required ');
          if (value) {
            // console.log('有值！！！！！！！！！！！');
            return validateRule(value, ruleType);
          }
          else {
            // console.log('没有值！！！！！！！！！！！');
            return false;
          }
        }
        else {
          // console.log('无需必填 not required ');
          if (value) {
            // console.log('有值！！！！！！！！！！！');
            return validateRule(value, ruleType);
          }
          else {
            return true;
          }
        }
      };
      // console.log('====== 当前验证开始 ======');
      // console.log('是否必填');
      // console.log(required);
      // console.log('验证内容类型');
      // console.log(ruleType);
      // console.log('内容值');
      // console.log(value);
      // console.log('内容验证结果 ');
      // console.log(validateRule(value, ruleType));

      const j = judge();//最终验证结果
      // console.log('最终验证结果');
      // console.log(judge());
      return !j;
    },


    /**
     * 判断 表格第一行数中 表单 单元格是否存在验证错误的情况
     * @param j             最终验证结果
     * @returns {boolean}
     */
    judgeFirstRowHasError(j) {
      if (this.rowIndex !== 0) return false;
      try {
        const grid = document.getElementById(this.gridID);
        const wrapper = grid.getElementsByClassName('el-table__body-wrapper')[0];
        const fixedWrapper = grid.getElementsByClassName('el-table__fixed-body-wrapper');
        const tr = grid.querySelector('.el-table__body tbody tr');
        const isErr = tr.querySelectorAll('.' + this.errClass);
        this.firstRowHasError.value = isErr.length > 0;

        /**
         * change fixed wrapper height
         * @param h
         * @private
         */
        let _changeFwrapper = (h) => {
          for (let Fwrapper of fixedWrapper) {
            Fwrapper.style.height = h + 'px';
          }
        };
        //如果表格第一行内存在表单单元格且存在错误提示信息的时候，顶部出现留白间距（为验证错误信息腾出空间)
        if (this.firstRowHasError.value) {
          const h = this.wrapperHeight - this.topGapForErrMsg;
          wrapper.style.height = h + 'px';
          _changeFwrapper(h - 8);//高度减去下滚动条的高度  or h - 32
        }
        else {
          wrapper.style.height = this.wrapperHeight + 'px';
          _changeFwrapper(this.wrapperHeight);
        }
      }
      catch (e) {
        return false;
      }
    },

    /**
     * set form-cell check config (check list) in grid
     * @param Param
     */
    setFormCellCheck(Param) {
      //when this col type is form we can edit, so we should to  validate in need
      if (this.formConfig) {
        this.$emit("set-formCell-check", Param.cellKey);//put this form cell key to check list
      }
    },


    /**
     * form change event
     * @param Param
     * @param value
     */
    formChange(Param, value) {
      this.setFormCellCheck(Param);//set form-cell check config (check list) in grid
    },


    /**
     * select unit change
     * @param Param
     * @param value
     */
    selectUnitChange(Param, value) {
      this.setFormCellCheck(Param);//set form-cell check config (check list) in grid
      const modelData = Param.scopeRefer['modelData'];
      const items = Param.scopeRefer['items'];
      const unit = Param.scopeRefer['unit'];
      const row = Param.scope.row;//row data
      const options = row[Param.modelCode][items];//select option data

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
          row[Param.modelCode][modelData][unit] = ipt[unit];
          if (row.hasOwnProperty(unit)) {
            row[unit] = ipt[unit];
          }
          break;
        }
      }
      console.log('selectUnitChange - 改变后的scope值');
      console.log(Param.scope)
    }
  },
  beforeDestroy: function () {
    this.$emit("set-formCell-check", this.deleteKey);//put this form cell key to check list
    window.clearTimeout(this.judgeFirstRowHasError);
  }
};

