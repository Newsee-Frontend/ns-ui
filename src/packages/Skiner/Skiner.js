import create from '../../utils/create';
import palette from './palette';


export default create({
  name: 'skiner',
  data() {
    return {
      themeprefix: 'theme-',
      popoverWidth: '140px',
      activeIndex: 4,
      palette: palette,
    };
  },
  props: {
    initTheme: {
      type: String, default: 'black', validator: t => {
        return palette.some(theme => {
          return theme.key === t;
        });
      },
    },
  },
  render(h) {
    return (
      <el-popover
        class={this.recls()}
        placement={'bottom'}
        width={this.popoverWidth}
        trigger={'click'}
      >
        <div class={`${this.recls('container')} clear`}>
          {
            <p>设置主题</p>
          }
          {
            this.palette.map(
              (theme, index) => [
                <div
                  class={'fl theme-cycle'}
                  key={index}
                  style={{ 'background-color': theme.color }}
                  on-click={this.changeTheme.bind(this, theme.key, index)}
                >
                  {
                    index === this.activeIndex ? <i className="el-icon-check"/> : null
                  }
                </div>,
              ])
          }
        </div>
        <icon-svg slot="reference" icon-class={'pifu'}/>
      </el-popover>
    );
  },
  methods: {
    toggle(key) {
      const Layout = document.getElementById('layout');
      if (!Layout) return;
      Array.prototype.slice.call(Layout.classList).forEach(cls => {
        if (cls.includes(this.themeprefix)) {
          Layout.classList.remove(cls);
        }
      });
      Layout.classList.add(`${this.themeprefix}${key}`);
    },
    changeTheme(key, index) {
      this.activeIndex = index;
      this.toggle(key);
      this.$emit('change-theme', key);
    },
  },
  mounted() {
    this.toggle(this.initTheme);
  },
});

