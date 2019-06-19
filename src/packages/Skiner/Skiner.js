import create from '../../create/create';
import ColorPicker from '../ColorPicker/ColorPicker';
import palette from './palette';
import innerCode from './template';

export default create({
  name: 'skiner',
  components: { ColorPicker },
  data() {
    return {
      childSkiner: this.value,
      themeprefix: 'theme-',
      popoverWidth: '140px',
      palette: palette,
    };
  },
  props: {
    value: [String],
    initTheme: {
      type: String, default: 'black', validator: t => {
        return palette.some(theme => {
          return theme.key === t;
        });
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
      return theme.key === 'custom' ?
        <ColorPicker
          showAlpha
          color-format={'hex'}
          on-change={this.changeTheme}
          value={this.childSkiner}
        /> :
        <div
          class={'fl theme-cycle'}
          key={index}
          style={{ 'background-color': theme.color }}
          on-click={this.changeTheme.bind(this, theme.key, index)}
        >
          {
            theme.key === this.childSkiner ? <icon-class class={'el-icon-check'}/> : null
          }
        </div>;
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
          {
            <p>设置主题</p>
          }
          {
            this.palette.map(
              (theme, index) => cycleRender(theme, index))
          }
        </div>
        <icon-svg slot="reference" icon-class={'pifu'}/>
      </el-popover>
    );
  },
  methods: {
    toggleByAddClassName(key) {
      const Layout = document.getElementById('layout');
      if (!Layout) return;
      Array.prototype.slice.call(Layout.classList).forEach(cls => {
        if (cls.includes(this.themeprefix)) {
          Layout.classList.remove(cls);
        }
      });
      Layout.classList.add(`${this.themeprefix}${key}`);
    },
    toggleByInline(key) {
      const mark = `${this.recls()}-inline`;
      const targetList = document.getElementsByTagName('style');
      //remove the same tag
      Array.prototype.slice.apply(targetList).forEach(item => {
        if (item.id === mark && item.title) {
          console.log(33333);
          console.log(item);
          item.remove();
        }
      });
      const styleTag = document.createElement('style');
      styleTag.setAttribute('id', mark);
      styleTag.setAttribute('title', mark);
      document.head.appendChild(styleTag);
      styleTag.innerText = innerCode(key);
    },
    changeTheme(key, index) {
      console.log('changeTheme');
      console.log(key);
      this.childSkiner = key;
      this.$emit('input', key);
      this.toggleByInline(key);
      this.$emit('change-theme', key);
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

  },
  mounted() {

  },
});

