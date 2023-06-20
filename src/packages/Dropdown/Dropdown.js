import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'dropdown',

  data() {
    return {};
  },
  props: {
    /**
     * 下拉选项
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * 下拉触发元素呈现为按钮组
     */
    splitButton: {
      type: Boolean,
      default: false,
    },

    /**
     * 下拉触发元素呈现为按钮组时 按钮的type
     */
    type: {
      type: String,
    },

    /**
     * 菜单尺寸，在split-button为 true 的情况下也对触发按钮生效
     * @values 'medium','small','mini'
     */
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    /**
     * 菜单弹出位置
     */
    placement: {
      type: String,
      default: 'bottom-end',
    },

    /**
     * 触发下拉的行为
     */
    trigger: {
      type: String,
      default: 'hover',
    },

    /**
     * 是否在点击菜单项后隐藏菜单
     */
    hideOnClick: {
      type: Boolean,
      default: true,
    },

    /**
     * Dropdown 组件的 tabindex
     */
    tabindex: {
      type: Number,
      default: 0,
    },

    /**
     * 键值映射
     */
    keyRefer: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled',
          divided: 'divided',
          children: 'children',
        };
      },
    },
  },

  computed: {},

  watch: {},

  render(h) {
    let { label, value, disabled, divided, children } = this.keyRefer;
    const itemMenuRender = item => {
      let itemNode = (
        <el-dropdown-item disabled={item[disabled]} divided={item[divided]} command={item[value]}>
          {item[label]}
        </el-dropdown-item>
      );

      let childrenNode = null;

      if (item[children] && item[children].length > 0) {
        childrenNode = item[children].map(childItem => {
          return (
            <el-dropdown-item
              disabled={childItem[disabled]}
              divided={childItem[divided]}
              command={childItem[value]}
            >
              <icon-class icon-class="dian" class="sub-menu-icon" />
              {childItem[label]}
            </el-dropdown-item>
          );
        });
      }

      return [itemNode, childrenNode];
    };

    return (
      <el-dropdown
        class={this.recls([this.formsize])}
        splitButton={this.splitButton}
        type={this.type}
        size={this.size}
        placement={this.placement}
        trigger={this.trigger}
        hideOnClick={this.hideOnClick}
        tabindex={this.tabindex}
        on-command={this.command.bind(this)}
        on-click={this.click.bind(this)}
        on-visible-change={this.visibleChange.bind(this)}
      >
        {this.$slots.default}
        <el-dropdown-menu slot="dropdown">
          {this.options.map(item => {
            return itemMenuRender(item);
          })}
        </el-dropdown-menu>
      </el-dropdown>
    );
  },

  methods: {
    command(val) {
      /**
       * 点击菜单项触发的事件回调
       * @event visibleChange 
       * @property {String} val  下拉选中的值 
       */
      this.$emit('command', val);
    },

    click(val) {
      /**
       * split-button 为 true 时，点击左侧按钮的回调
       * @event click 
       */
      this.$emit('click', val);
    },

    visibleChange(val) {
      /**
       * 下拉框出现/隐藏时触发
       * @event visibleChange 
       * @property {Boolean} val  出现则为 true，隐藏则为 false
       */
      this.$emit('visibleChange', val);
    },
  },

  created() {},

  mounted() {},
});
