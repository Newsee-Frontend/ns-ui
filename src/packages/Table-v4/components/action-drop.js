import draggable from 'vuedraggable';
import keyRefer from '../mixins/keyRefer';
import columntype from '../mixins/columntype';
import IconClass from '../../Icon-class/Icon-class';
import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';

export default {
  name: 'action-drop',
  mixins: [keyRefer, columntype],
  components: {
    draggable,
    Checkbox,
    IconClass,
    Button,
  },
  data() {
    return {
      menuRender: false,
    };
  },
  props: {
    customColumns: { type: Array },
  },
  render(h) {
    return (
      <el-dropdown ref={'column-setting-dropdown'} hide-on-click={false} trigger={'click'}>
        <span class={'el-dropdown-link'} on-click={() => (this.menuRender = true)}>
          <i class={'el-icon-setting'} />
        </span>
        <el-dropdown-menu slot="dropdown" class={'column-setting-drag'}>
          {this.menuRender ? (
            <draggable
              class={'content'}
              value={this.customColumns}
              onInput={event => {
                this.$emit('input', event);
              }}
              options={{ disabled: false }}
              on-start={this.dragHandle}
              on-end={this.dropHandle}
            >
              {this.customColumns.map((item, $index) => {
                const isHide = this.specialColumns.indexOf(item.type) > -1;

                return (
                  <el-dropdown-item key={$index} class={`clear ${isHide ? 'hide' : ''}`}>
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
                      item.title
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
          ) : null}
          {
            <div key={'drop-submit'} class={'submit'} on-click={this.columnSettingSubmit}>
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

    columnSettingSubmit() {
      this.$refs['column-setting-dropdown'].hide();
      this.$emit('column-setting-submit', this.customColumns);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
