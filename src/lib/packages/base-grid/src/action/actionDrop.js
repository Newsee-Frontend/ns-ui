import draggable from 'vuedraggable';
import gridIcon from '../../../Icon/grid-icon';
import {hasClass, stopPropagation, addEventHandler} from '../../../../utils/index';

export default {
  name: 'action-drop',
  components: {
    draggable, gridIcon
  },
  data() {
    return {
      isLocked: false,//是否锁着
      dropList: [],//下拉数据列表
    };
  },
  props: {
    headList: {type: Array, default: []},
    headSetSw: {
      type: Object, default: function () {
        return {
          set: false,
          search: false
        }
      }
    },
    keyRefer: {
      type: Object, default() {
        return {}
      }
    },//指代属性
  },
  computed: {
    headRefer() {
      return this.keyRefer.head;
    }
  },
  render(h) {
    return (
      <div id={"header-drag"} class={{"opened": this.headSetSw.set}} on-click={($event) => this.dragClick($event)}>
        <draggable class="header-drag_content" v-model={this.dropList} options={{disabled: this.isLocked}}
                   on-start={this.dragHandle} on-end={this.dropHandle}>
          {
            this.dropList.map((item, $index) =>
              [
                <li>
                  <el-checkbox class="header-drag_checkbox fl"
                               v-model={item[this.headRefer['hidden']]}>{item[this.headRefer['label']]}</el-checkbox>
                  <grid-icon
                    class={['header-drag_svg fr', {'suo': item[this.headRefer['fixed']] === 'left'}]}
                    icon-class={item[this.headRefer['fixed']] === 'left' ? 'suo ' : 'suoopen'}
                    on-click={this.dropLock.bind(this, $index)}>
                  </grid-icon>
                </li>
              ]
            )
          }
        </draggable>
        <div class="header-drag_submit">
          <el-button type={'primary'} size={'small'} on-click={this.setHeadSubmit}>确定</el-button>
        </div>
      </div>
    )
  },
  watch: {
    //监听下拉模块开关值，如发生变化（开 / 闭），则重置渲染的下拉列表数据
    headSetSw: {
      handler: function (val, oldVal) {
        this.init();
      },
      deep: true
    },
    //监听表头数据，实时绑定表头数据和下拉列表数据
    headList(value) {
      if (Array.isArray(value)) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    //listen drop modules click event
    addEventHandler(document.body, 'click', this.listenDropClickEvent)
  },
  beforeDestroy() {
    //remove event Listener
    document.body.removeEventListener('click', this.listenDropClickEvent);
  },
  methods: {
    init() {
      this.dropList = JSON.parse(JSON.stringify(this.headList));
      this.toggleHiden(this.dropList);//toggle property hiden
    },
    /**
     * toggle property hiden
     * @param dropList
     */
    toggleHiden(dropList) {
      const hidden = this.headRefer['hidden'];
      dropList.forEach(item => {
        item[hidden] = !item[hidden];
      });
    },
    //表头设置（排序/显隐操作 ）- 点击提交
    setHeadSubmit() {
      console.log('setHeadSubmit - 表头设置（排序/显隐操作 ）- 点击提交');
      console.log(this.dropList);
      this.toggleHiden(this.dropList);//toggle property hiden
      const query = JSON.parse(JSON.stringify(this.dropList));
      this.$emit("setting-submit", query);
      this.headSetSw.set = false;//close header-drag modules
    },

    //drop modules click event
    listenDropClickEvent() {
      const headerDrag = document.getElementById('header-drag');
      const isOpened = hasClass(headerDrag, 'opened');
      if (isOpened && this.headSetSw) {
        this.headSetSw.set = false;//close header-drag modules
      }
      return false;
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
    dragClick(e) {
      stopPropagation(e);
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
      //修改前为true
      if (fixedType === 'left') {
        this.dropList[$index][key] = false;//去反
        for (let i = $index; i < len; i++) {
          this.dropList[i][key] = false;
        }
      }
      //修改前为false
      else {
        for (let i = 0; i <= $index; i++) {
          this.dropList[i][key] = 'left';
        }
      }
    },
  }
};
