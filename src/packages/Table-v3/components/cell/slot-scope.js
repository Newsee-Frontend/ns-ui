import { Input, Select, Checkbox, Radio, DatePicker, InputNumber } from './loading';
import validateRule from '../../validate/validate-rule';

export default {
  name: 'table-slot-scope',
  components: { Input, Select, Checkbox, Radio, DatePicker, InputNumber },

  data() {
    return {
      //form cell status
      formCellList: ['link', 'input', 'rate', 'date', 'checkbox', 'radio', 'select', 'select-unit'],
      validateRule,
    };
  },
  props: {
    scope: {
      type: Object,
      default() {
        return {
          row: {},
        };
      },
    }, //当前行-表格数据
    headScope: { type: Object },
    headRefer: { type: Object },
    scopeRefer: { type: Object },
    rowIndex: { type: Number }, //行索引
    colIndex: { type: Number }, //列索引
    checkStator: { type: Object },
    isFormTable: { type: Boolean },
    cellFifter: { type: Function },
    rulesConfig: { type: Array },
  },
  computed: {
    //表单单元格配置信息
    formConfig() {
      return this.headScope[this.headRefer['cell-Config']];
    },
    //表单单元格类型
    formType() {
      return this.formConfig[this.scopeRefer['type']];
    },
    //是否为表单渲染
    isFormRender() {
      try {
        if (!this.headScope) {
          return false;
        }

        if (!this.formConfig) {
          return false;
        }
        if (this.formCellList.indexOf(this.formType) === -1) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    cellParam() {
      const modelCode = this.headScope[this.headRefer['model-key']];
      return {
        cellKey: `${modelCode}-${this.rowIndex}-${this.colIndex}`, //cell key ( modelCode + row-index + row-index )
        rowIndex: this.rowIndex,
        colIndex: this.colIndex,
        modelCode: modelCode, //get this col model key in gird head data
        scope: this.scope, //get this row data
        headScope: this.headScope, //this col data in grid head
        headRefer: this.headRefer, //head refer
        scopeRefer: this.scopeRefer, //scope refer
      };
    },
  },
  render(h) {
    /**
     * render default cell ()
     * @param scope
     * @param modelCode
     * @returns {*}
     */
    const defaultCell = (scope, modelCode) => {
      const content = this.gridCellFifter(scope.row[modelCode], modelCode);
      return <div>{content}</div>;
    };

    let cellRender = (scope, item, modelCode) => {
      if (!this.isFormTable) return defaultCell(scope, modelCode);
      if (this.isFormRender) {
        switch (this.formType) {
          case 'link':
            return (
              <div on-click={this.cellAction.bind(this, scope, item)}>{scope.row[modelCode]}</div>
            );
          case 'input':
            return (
              <Input
                value={scope.row[modelCode]}
                onInput={e => {
                  scope.row[modelCode] = e;
                  this.$emit('input', e);
                }}
                width={'100%'}
                placeholder={this.formConfig.placeHolder}
                disabled={this.formConfig.disabled}
                clearable={true}
                on-change={this.cellFormChange}
              />
            );
          case 'select':
            return (
              <Select
                value={scope.row[modelCode].picked.value}
                onInput={e => {
                  scope.row[modelCode].picked.value = e;
                  this.$emit('input', e);
                }}
                options={scope.row[modelCode].options}
                width={'100%'}
                editable={false}
                placeholder={this.formConfig.placeHolder}
                disabled={this.formConfig.disabled}
                clearable={true}
                on-change={this.cellFormChange}
              />
            );
          case 'checkbox':
            return (
              <Checkbox
                value={scope.row[modelCode].picked.value}
                onInput={e => {
                  scope.row[modelCode].picked.value = e;
                  this.$emit('input', e);
                }}
                options={scope.row[modelCode].options}
                disabled={this.formConfig.disabled}
                min={this.formConfig.min}
                max={this.formConfig.max}
                on-change={this.cellFormChange}
              />
            );
          case 'radio':
            return (
              <Radio
                value={scope.row[modelCode].picked.value}
                onInput={e => {
                  scope.row[modelCode].picked.value = e;
                  this.$emit('input', e);
                }}
                options={scope.row[modelCode].options}
                disabled={this.formConfig.disabled}
                on-change={this.cellFormChange}
              />
            );
          case 'date':
            return (
              <DatePicker
                value={scope.row[modelCode]}
                onInput={e => {
                  scope.row[modelCode] = e;
                  this.$emit('input', e);
                }}
                width={'100%'}
                type="date"
                disabled={this.formConfig.disabled}
                editable={false}
                placeholder={this.formConfig.placeHolder}
                value-format="yyyy-MM-dd 00:00:00"
                on-change={this.cellFormChange}
              />
            );
          case 'rate':
            return (
              <InputNumber
                value={scope.row[modelCode]}
                onInput={e => {
                  scope.row[modelCode] = e;
                  this.$emit('input', e);
                }}
                width={'100%'}
                min={this.formConfig.min}
                max={this.formConfig.max}
                disabled={this.formConfig.disabled}
                on-change={this.cellFormChange}
              />
            );

          default:
            return defaultCell(scope, modelCode);
        }
      } else {
        return defaultCell(scope, modelCode);
      }
    };

    const cellClass = () => {
      const baseCls = !this.isFormTable
        ? 'normal-cell'
        : this.isFormRender
        ? 'form-cell'
        : 'normal-cell';
      const typeCls = this.formConfig && this.formType ? `${this.formType}-cell` : '';
      const errCls = this.validateCheck(this.cellParam) ? `is-error` : '';
      return `cell-container ${baseCls} ${typeCls} ${errCls}`;
    };

    return h(
      `div`,
      {
        class: cellClass(),
      },
      [cellRender(this.cellParam.scope, this.cellParam.headScope, this.cellParam.modelCode)]
    );
  },
  methods: {
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
        } catch (e) {
          return val;
        }
      };
      const required = this.formConfig.require; //form of cell  require switch
      const ruleType = this.formConfig.validateRule; //form of cell validate rule
      const value = getValue(Param.scope, Param.modelCode, Param.scopeRefer); //get form-cell value

      let judge = () => {
        // console.log('judge 开始 ');
        //是否验证通过
        if (
          this.checkStator.list.indexOf(Param.cellKey) === -1 &&
          this.checkStator.state !== 'CHECK_ALL'
        )
          return true;
        // console.log('需要验证！！！');
        if (required) {
          // console.log('需要必填 is required ');
          if (value || value === 0) {
            // console.log('有值！！！！！！！！！！！');
            if (ruleType) {
              return this.validateRule(value, ruleType, this.rulesConfig);
            }
            return true;
          } else {
            // console.log('没有值！！！！！！！！！！！');
            return false;
          }
        } else {
          // console.log('无需必填 not required ');
          if (value || value === 0) {
            // console.log('有值！！！！！！！！！！！');
            return this.validateRule(value, ruleType, this.rulesConfig);
          } else {
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
      // console.log(this.validateRule(this,value, ruleType));

      const j = judge(); //最终验证结果
      // console.log('最终验证结果');
      // console.log(judge());
      return !j;
    },

    /**
     * 表格单元格点击行为事件
     * @param scope
     * @param item
     */
    cellAction(scope, item) {
      this.$emit('cell-action', scope, item);
    },
    /**
     * form change event
     * @param value
     */
    cellFormChange(value) {
      if (!this.isFormTable) return;
      if (this.isFormRender) {
        this.$emit('cell-form-change', value, this.cellParam); //put this form cell key to check list
      }
    },
    /**
     * grid cell fifter function (old value => new value  base on business)
     * @param val
     * @param key
     * @returns {*|void}
     */
    gridCellFifter(val, key) {
      if (!this.cellFifter) {
        return val;
      }
      return this.cellFifter(val, key);
    },
  },
  beforeDestroy() {
    this.validateRule = null;
  },
};
