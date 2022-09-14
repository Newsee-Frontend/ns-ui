import draggable from 'vuedraggable';
import columntype from '../mixins/columntype';
import IconClass from '../../Icon-class/Icon-class';
import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

export default {
  name: 'action-drop',
  mixins: [columntype],
  components: {
    draggable,
    Checkbox,
    IconClass,
    Button,
    Input,
  },
  data() {
    return {
      menuRender: false,
      filterModel: '', //列表设置筛选搜索model
    };
  },
  props: {
    customColumns: { type: Array },
  },
  render(h) {
    return (
      <el-dropdown
        ref={'column-setting-dropdown'}
        hide-on-click={false}
        trigger={'click'}
        on-visible-change={this.visibleChange}
      >
        <span class={'el-dropdown-link'} on-click={() => (this.menuRender = true)}>
          <i class={'el-icon-setting'} />
        </span>
        <el-dropdown-menu slot="dropdown" class={'column-setting-drag'}>
          {
            <div class={'column-setting-head'}>
              {/*<span>{this.filterModel || '请输入'}</span>*/}
              <Input
                class={'column-setting-filter'}
                value={this.filterModel}
                onInput={value => {
                  this.filterModel = value;

                  this.setSpecialColumnsByFilter(this.filterModel);

                  this.$emit('input', value);
                }}
                clearable={true}
                size={'small'}
                placeholder={'请搜索查询'}
                width={'100%'}
              />
              <p class={'column-setting-reset'} on-click={this.columnSettingReset}>
                {'恢复系统默认'}
              </p>
            </div>
          }
          {this.menuRender ? (
            this.customColumns && !this.customColumns.every(col => col.hideInDrop) ? (
              <draggable
                class={'column-setting-content'}
                value={this.customColumns}
                onInput={event => {
                  this.$emit('input', event);
                }}
                options={{ disabled: false }}
                on-start={this.dragHandle}
                on-end={this.dropHandle}
              >
                {this.customColumns.map((item, $index) => {
                  this.filterFn(item, this.filterModel);

                  return (
                    <el-dropdown-item key={$index} class={`clear ${item.hideInDrop ? 'hide' : ''}`}>
                      {h(
                        'Checkbox',
                        {
                          class: 'fl',
                          props: {
                            value: item.visible,
                            isGroup: false,
                          },
                          on: {
                            input: event => {
                              this.$emit('input', event);
                            },

                            change: value => {
                              item.visible = value;
                              this.$emit('sync-column-render', {
                                event: 'change',
                                customColumns: this.customColumns,
                              });
                            },
                          },
                        },
                        item.title +
                          (item.params && item.params.subTitle ? `(${item.params.subTitle})` : '')
                      )}
                      {h('Icon-class', {
                        class: `fr ${item.fixed === 'left' ? 'locked' : ''}`,
                        props: {
                          'icon-class': item.fixed === 'left' ? 'lock ' : 'unlock',
                        },
                        on: {
                          click: _ => this.dropLock($index),
                        },
                      })}
                    </el-dropdown-item>
                  );
                })}
              </draggable>
            ) : (
              <el-dropdown-item>{'没有匹配的'}</el-dropdown-item>
            )
          ) : null}
          {
            <div
              key={'drop-submit'}
              class={'column-setting-submit'}
              on-click={this.columnSettingSubmit}
            >
              <Button type={'primary'}>确定</Button>
            </div>
          }
        </el-dropdown-menu>
      </el-dropdown>
    );
  },
  methods: {
    dragHandle() {
      // console.log('dragHandle');
    },

    dropHandle(evt) {
      // console.log('dropHandle');
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;

      const target = this.customColumns[oldIndex];
      this.reSortList(target, oldIndex, newIndex);

      // console.log('拖动前的索引 :' + oldIndex);
      // console.log('拖动后的索引 :' + newIndex);

      this.$emit('sync-column-render', {
        event: 'drop',
        customColumns: this.customColumns,
      });
    },

    /**
     * re-sort List
     * @param target
     * @param oldIndex
     * @param newIndex
     */
    reSortList(target, oldIndex, newIndex) {
      if (oldIndex <= newIndex) {
        // this.$set(this.columnsSetting,newIndex,target)
        this.customColumns.splice(newIndex + 1, 0, target);
        this.customColumns.splice(oldIndex, 1);
      } else {
        this.customColumns.splice(newIndex, 0, target);
        this.customColumns.splice(oldIndex + 1, 1);
      }
    },

    /**
     * drop lock event
     * @param $index
     */
    dropLock($index) {
      const key = 'fixed';
      const fixedType = this.customColumns[$index][key];
      const len = this.customColumns.length;
      //修改前为锁定 true
      if (fixedType === 'left') {
        this.customColumns[$index][key] = false;

        for (let i = $index; i < len; i++) {
          const col = this.customColumns[i];
          if (this.specialColumns.indexOf(col.type) === -1) {
            col[key] = false;
          }
        }
      }
      //修改前为未锁定 false
      else {
        for (let i = 0; i <= $index; i++) {
          this.customColumns[i][key] = 'left';
        }
      }

      this.$emit('sync-column-render', {
        event: 'lock',
        customColumns: this.customColumns,
      });
    },

    //列表设置提交
    columnSettingSubmit() {
      this.$refs['column-setting-dropdown'].hide();
      this.$emit('column-setting-submit', this.customColumns);
    },

    //列表设置恢复默认
    columnSettingReset() {
      this.$emit('column-setting-reset', this.customColumns);
    },

    /**
     * 筛选操作方法
     * @param colItem
     * @param queryString
     */
    filterFn(colItem, queryString) {
      colItem.hideInDrop =
        this.specialColumns.indexOf(colItem.type) === -1
          ? queryString
            ? colItem.title.toLowerCase().indexOf(queryString.toLowerCase()) === -1
            : false
          : true;
    },

    /**
     * 根据 输入'filterModel' 重置设置 specialColumns；
     * @param queryString
     */
    setSpecialColumnsByFilter(queryString) {
      this.customColumns.forEach(colItem => {
        this.filterFn(colItem, queryString);
      });
    },

    /**
     * drop down 下拉框出现/隐藏时触发
     * @param state
     */
    visibleChange(state) {
      //关闭且筛选框内有值的情况下，才需要重置
      if (!state && this.filterModel) {
        this.filterModel = '';
        //根据 输入'filterModel' 重置 specialColumns；
        this.setSpecialColumnsByFilter(this.filterModel);
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
};
