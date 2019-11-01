import create from '../../create/create';
import ColorPicker from '../ColorPicker/ColorPicker';
import palette from './palette';
import innerCode from './template';
import { colorRGBtoHex, colorHexToRgba } from '../../utils/color';

export default create({
  name: 'skiner',
  components: { ColorPicker },
  data() {
    return {
      childSkiner: this.value,
      popoverWidth: '150px',
      colorPickerActive: false,
      palette,
    };
  },
  props: {
    value: [String],
    colorFormat: {
      type: String,
      default: 'rgb',
      validate: f => {
        return ['hax', 'rgb'].indexOf(f) > -1;
      },
    },
  },
  watch: {
    value(val) {
      this.childSkiner = val;
    },
  },
  render(h) {
    const cycleRender = (theme, index) => {
      return theme.key === 'custom' ? (
        <ColorPicker
          class={this.colorPickerActive ? 'active' : ''}
          color-format={'hex'}
          predefine={this.palette.predefine}
          on-change={this.changeTheme}
          value={this.childSkiner}
        />
      ) : (
        <li
          class={'fl theme-cycle'}
          key={index}
          style={{ 'background-color': theme.color }}
          on-click={this.changeTheme.bind(this, theme.color, theme.key)}
        >
          {theme.color === this.childSkiner ? <i class={'el-icon-check'} /> : null}
        </li>
      );
    };

    return (
      <el-popover
        class={this.recls()}
        placement={'bottom'}
        width={this.popoverWidth}
        trigger={'click'}
        on-show={this.show}
        on-hide={this.hide}
        on-after-enter={this.afterEnter}
        on-after-leave={this.afterLeave}
      >
        <div class={`${this.recls('container')} clear`}>
          {<p>设置主题</p>}
          {<ul>{this.palette.commons.map((theme, index) => cycleRender(theme, index))}</ul>}
        </div>
        <icon-class slot="reference" icon-class={'skin'} />
      </el-popover>
    );
  },
  methods: {
    /**
     * toggle theme by change className
     * @param key
     */
    toggleByAddClassName(key) {
      const themeprefix = 'theme-';
      const Layout = document.getElementById('layout');
      if (!Layout) return;
      Array.prototype.slice.call(Layout.classList).forEach(cls => {
        if (cls.includes(themeprefix)) {
          Layout.classList.remove(cls);
        }
      });
      Layout.classList.add(`${themeprefix}${key}`);
    },

    /**
     * toggle theme by insert style tags in the Head
     * @param key
     */
    toggleByInline(key) {
      const mark = `${this.recls()}-inline`;
      const targetList = document.getElementsByTagName('style');
      //remove the same tag
      Array.prototype.slice.apply(targetList).forEach(item => {
        if (item.id === mark && item.title) {
          item.remove();
        }
      });
      const styleTag = document.createElement('style');
      styleTag.setAttribute('id', mark);
      styleTag.setAttribute('title', mark);
      document.head.appendChild(styleTag);
      styleTag.innerText = innerCode(key);
    },
    /**
     * change theme
     * @param value   hax / rgb
     * @param key
     */
    changeTheme(value, key) {
      this.colorPickerActive = !Boolean(key);
      const color = this.toggleFormat(value);
      this.childSkiner = color;
      this.$emit('input', color);
      this.toggleByInline(color);
      this.$emit('change-theme', color);
    },

    /**
     * Togglr color format from hax <=> rgba
     * @param color
     * @returns {*}
     */
    toggleFormat(color) {
      if (this.colorFormat === 'rgb' && color.indexOf('rgb') === -1) {
        return colorHexToRgba(color).rgba;
      } else if (this.colorFormat === 'hax' && color.indexOf('#') === -1) {
        return colorRGBtoHex(color);
      }
      return color;
    },
    show() {
      this.$emit('show');
    },
    hide() {
      this.$emit('hide');
    },
    afterEnter() {
      this.$emit('after-enter');
    },
    afterLeave() {
      this.$emit('after-leave');
    },
  },
  created() {
    this.toggleByInline(this.toggleFormat(this.childSkiner));
  },
});
