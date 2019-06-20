import draggable from 'vuedraggable';
import IconSvg from '../../../Icon-svg/Icon-svg';
import Checkbox from '../../../Checkbox/Checkbox';
import Button from '../../../Button/Button';
import column from '../../mixins/column';
import { addEventHandler, removeEventHandler, stopPropagation } from '../../../../utils/event';
import { hasClass } from '../../../../utils/class-handle';

export default {
  name: 'action-drop',
  mixins: [column],
  components: { draggable, Checkbox, IconSvg, Button },
  data() {
    return {
      isLocked: false,//是否锁着
    };
  },
  props: {
    value: [Boolean],
    settingState: { type: Object },
    dropList: {
      type: Array, default() {
        return [];
      },
    },
    headRefer: { type: Object },
  },
  render(h) {

    const liRender = (item, $index) => {

      const checkRender = h('Checkbox', {
        domProps: {
          value: this.value,
        },
        props: {
          value: !item[this.headRefer['hidden']],
          isGroup: false,
        },
        on: {
          input: (event) => {
            this.$emit('input', event);
          },
          change: (event) => {
            item[this.headRefer['hidden']] = !event;
          },
        },
      }, item[this.headRefer['label']]);

      const icoRender = <IconSvg
        class={['fr', { 'locked': item[this.headRefer['fixed']] === 'left' }]}
        icon-class={item[this.headRefer['fixed']] === 'left' ? 'suo ' : 'suoopen'}
        on-click={this.dropLock.bind(this, $index)}>
      </IconSvg>;

      const isHide = [...this.specialColInclude, ...this.actionColInclude].indexOf(item[this.headRefer['xtype']]) > -1;

      return h('li',
        {
          'class': `${ isHide ? 'hide' : '' }`,
        },
        [checkRender, icoRender]);
    };


    return (
      <div id={'head-setting-drag'}
           class={{ 'opened': this.settingState.setting }}
           on-click={($event) => this.dragClick($event)}>
        <draggable class={'content'}
                   value={this.dropList}
                   onInput={event => {
                     this.$emit('input', event);
                   }}
                   options={{ disabled: this.isLocked }}
                   on-start={this.dragHandle} on-end={this.dropHandle}>
          {
            this.dropList.map((item, $index) => liRender(item, $index))
          }
        </draggable>
        <div class={'submit'}>
          <Button type={'primary'} on-click={this.setHeadSubmit}>确定</Button>
        </div>
      </div>
    );
  },
  methods: {
    //表头设置（排序/显隐操作 ）- 点击提交
    setHeadSubmit() {
      console.log('setHeadSubmit - 表头设置（排序/显隐操作 ）- 点击提交');
      console.log(this.dropList);
      this.$emit('setting-submit', this.dropList);
      this.settingState.setting = false;//close head-setting-drag modules
    },

    //drop modules click event
    listenDropClickEvent() {
      const headerDrag = document.getElementById('head-setting-drag');
      const isOpened = hasClass(headerDrag, 'opened');
      if (isOpened && this.settingState) {
        this.settingState.setting = false;//close head-setting-drag modules
      }
      return false;
    },

    /**
     * drop lock event
     * @param $index
     */
    dropLock($index) {
      console.log('dropLock');
      const key = this.headRefer['fixed'];
      const fixedType = this.dropList[$index][key];
      const len = this.dropList.length;
      //修改前为锁定 true
      if (fixedType === 'left') {
        this.$set(this.dropList[$index], [key], false);//去反
        // this.dropList[$index][key] = false;
        for (let i = $index; i < len; i++) {
          // this.dropList[i][key] = false;
          this.$set(this.dropList[i], [key], false);
        }
      }
      //修改前为未锁定 false
      else {
        for (let i = 0; i <= $index; i++) {
          this.$set(this.dropList[i], [key], 'left');
          // this.dropList[i][key] = 'left';
        }
      }
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

      const target = this.dropList[oldIndex];
      this.reSortList(target, oldIndex, newIndex);

      console.log('拖动前的索引 :' + oldIndex);
      console.log('拖动后的索引 :' + newIndex);
    },

    /**
     * re-sort List
     * @param target
     * @param oldIndex
     * @param newIndex
     */
    reSortList(target, oldIndex, newIndex) {
      if (oldIndex <= newIndex) {
        this.dropList.splice(newIndex + 1, 0, target);
        this.dropList.splice(oldIndex, 1);
      }
      else {
        this.dropList.splice(newIndex, 0, target);
        this.dropList.splice(oldIndex + 1, 1);
      }
    },

  },
  beforeDestroy() {
    //remove event Listener
    removeEventHandler(document.body, 'click', this.listenDropClickEvent);
  },
  mounted() {
    //listen drop modules click event
    addEventHandler(document.body, 'click', this.listenDropClickEvent);
  },
};
