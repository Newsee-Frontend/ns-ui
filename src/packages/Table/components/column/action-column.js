import Button from '../../../Button/Button';

export default {
  name: 'action-column',
  components: { Button },
  data() {
    return {
      dropTit: '更多',
    };
  },
  props: {
    headRefer: { type: Object },
    scopeRefer: { type: Object },
    headScope: { type: Object },
  },

  computed: {
    columnType() {
      return this.headScope[this.headRefer['xtype']];
    },
    //get action button list form scope
    actionList(scope) {
      return scope => {
        const actionList = scope.row[this.scopeRefer['actionBtnList']];
        if (actionList instanceof Array) {
          return actionList;
        }
        else {
          return [];
        }
      };
    },
  },
  render(h) {

    /**
     * action render
     * @param list    action button information list
     * @param scope   scope data
     * @returns {*}
     */
    let actionRender = (list, scope) => {
      return <div class={'action-scope clear'}>
        {
          //single button
          <Button
            class={'fl'}
            type={'text'}
            on-click={this.tableAction.bind(this, list[0], scope)}>
            {list[0].label}
          </Button>
        }
        {
          //more than 2 operation buttons, use drop-down menu to display
          list.length > 2 ?
            <el-dropdown class="fl" trigger="click">
              <span class={'el-dropdown-link'}>
                {this.dropTit}
                <i class={'el-icon-arrow-down el-icon--right'}/>
              </span>
              <el-dropdown-menu slot="dropdown">
                {
                  list.map((item, index) => [
                      index > 0 ?
                        <el-dropdown-item key={index}
                                          nativeOnClick={this.tableAction.bind(this, item, scope)}>{item.label}
                        </el-dropdown-item>
                        : null,
                    ],
                  )
                }
              </el-dropdown-menu>
            </el-dropdown> :
            // 普通按钮
            list.length === 2 ?
              <el-button class={'fl'} type="text" on-click={this.tableAction.bind(this, list[1], scope)}>
                {list[1].label}
              </el-button> :
              null
        }
      </div>;
    };


    return (
      h(
        `el-table-column`,
        {
          props: {
            'class-name': `table-head-${this.headScope[this.headRefer['model-key']]}`,
            width: this.headScope[this.headRefer['width']],
            align: this.headScope[this.headRefer['align']],
            fixed: 'right',
            key: `table-head-${this.headScope[this.headRefer['model-key']]}`,
          },
          scopedSlots: this.columnType === 'action' ?
            {
              'header': scope => this.headScope[this.headRefer['label']],
              default: scope => {
                const list = this.actionList(scope);
                return list.length > 0 ? actionRender(list, scope) : null;
              },
            } :
            {
              'header': scope => <i class={'el-icon-circle-plus'} on-click={this.addRow}/>,
              default: scope => {
                return <i class={'el-icon-delete'} on-click={this.deleteCurrentRow.bind(this, scope.$index, scope.row)}/>;
              },
            },
        },
      )
    );
  },
  methods: {
    //操作列点击
    tableAction(info, scope) {
      this.$emit('table-action', info, scope);
    },
    /**
     * add row to grid
     */
    addRow() {
      this.$emit('add-row');
    },
    /**
     * delete current row
     * @param index
     * @param row
     */
    deleteCurrentRow(index, row) {
      this.$emit('delete-current-row', index, row);
    },
  },
};
