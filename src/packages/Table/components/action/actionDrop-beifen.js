import draggable from 'vuedraggable';
import iconSvg from '../../../Icon-svg/Icon-svg';
import column from '../../mixins/column';
import { addEventHandler, removeEventHandler, stopPropagation } from '../../../../utils/event';
import { hasClass } from '../../../../utils/class-handle';

export default {
  name: 'action-drop',
  mixins: [column],
  components: { draggable, iconSvg },
  data() {
    return {
      isLocked: false,//是否锁着
    };
  },
  props: {
    value: [Boolean],
    headSetSw: {
      type: Object, default: function() {
        return {
          set: false,
          search: false,
        };
      },
    },
    headList: { type: Array, default: [] },
    headRefer: { type: Object },
  },
  computed: {
    ssss() {
      // if (this.headList instanceof Array) {
      //   const k = this.headRefer['xtype'];
      //   return this.headList.filter(item => this.specialColInclude.indexOf(item[k]) === -1);
      // }
      // else {
      //   return [];
      // }
      return this.headList;
    },
  },
  watch: {},
  render(h) {

    const a = (item) => {
      return h('el-checkbox', {
        domProps: {
          value: this.value,
        },
        props: {
          'class-name': 'header-drag_checkbox fl',
          value: item[this.headRefer['hidden']],
        },
        on: {
          input: (event) => {
            this.$emit('input', event);
          },
          change: (event) => {
            console.log(2222);
            console.log(event);
            console.log(this.headList);
            item[this.headRefer['hidden']] = event;
          },
        },
      }, item[this.headRefer['label']]);
    };


    return (
      <div id={'header-drag'} class={{ 'opened': this.headSetSw.set }} on-click={($event) => this.dragClick($event)}>
        <draggable className="header-drag_content" v-model={this.headList} options={{ disabled: this.isLocked }}
                   on-start={this.dragHandle} on-end={this.dropHandle}>
          {
            this.headList.map((item, $index) =>
              [
                this.specialColInclude.indexOf(item[this.headRefer['xtype']]) === -1 ?
                  <li>
                    {
                      a(item)
                    }
                    <icon-svg
                      className={['header-drag_svg fr', { 'suo': item[this.headRefer['fixed']] === 'left' }]}
                      icon-class={item[this.headRefer['fixed']] === 'left' ? 'suo ' : 'suoopen'}
                      on-click={this.dropLock.bind(this, $index)}>
                    </icon-svg>
                  </li> : null,
              ],
            )
          }
        </draggable>
        <div className="header-drag_submit">
          <el-button type={'primary'} size={'small'} on-click={this.setHeadSubmit}>确定</el-button>
        </div>
      </div>
    );
  },
  methods: {
    //drop modules click event
    listenDropClickEvent() {
      const headerDrag = document.getElementById('header-drag');
      const isOpened = hasClass(headerDrag, 'opened');
      if (isOpened && this.headSetSw) {
        this.headSetSw.set = false;//close header-drag modules
      }
      return false;
    },

    //表头设置（排序/显隐操作 ）- 点击提交
    setHeadSubmit() {
      console.log('setHeadSubmit - 表头设置（排序/显隐操作 ）- 点击提交');
      console.log(this.headList);
      this.$emit('setting-submit', this.headList);
      this.headSetSw.set = false;//close header-drag modules
    },

    /**
     * drop lock event
     * @param $index
     */
    dropLock($index) {
      console.log('dropLock');
      const key = this.headRefer['fixed'];
      const fixedType = this.headList[$index][key];
      const len = this.headList.length;
      //修改前为锁定 true
      if (fixedType === 'left') {
        this.headList[$index][key] = false;//去反
        for (let i = $index; i < len; i++) {
          this.headList[i][key] = false;
        }
      }
      //修改前为未锁定 false
      else {
        for (let i = 0; i <= $index; i++) {
          this.headList[i][key] = 'left';
        }
      }
      console.log(2222222222)
      console.log(this.headList)
    },

    dragClick(e) {
      stopPropagation(e);
    },

    dragHandle() {
      console.log('dragHandle');
    },
    dropHandle(evt) {
      console.log('dropHandle');
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      console.log('拖动前的索引 :' + oldIndex);
      console.log('拖动后的索引 :' + newIndex);
    },
  },
  beforeDestroy() {
    //remove event Listener
    removeEventHandler(document.body, 'click', this.listenDropClickEvent);
  },
  created() {

  },
  mounted() {
    //listen drop modules click event
    addEventHandler(document.body, 'click', this.listenDropClickEvent);
  },
};
