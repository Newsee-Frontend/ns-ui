// user drop down in header
import create from '../../utils/create';

export default create({
  name: 'user-dropdown',
  data() {
    return {
      isopen: false,
    };
  },
  props: {
    userName: { type: [String, Number], default: '用户' },
    abbreviation: { type: Boolean, default: false },
    avator: {
      type: String,
      default: '\'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif\'',
    },
    trigger: String,
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    simple() {
      return this.userName.substring(this.userName.length - 1, this.userName.length);
    },
  },
  render(h) {
    return (
      <el-dropdown
        class={this.recls()}
        trigger={this.trigger}
        on-visible-change={this.visibleChange}>
        {
          <section>
            {
              this.abbreviation ?
                <div class={'user-abbreviation'}>{this.simple}</div> :
                (
                  this.avator ?
                    <img class={'user-avatar'} src={this.avator}/> : null
                )
            }
            <span class={'hello'}>{this.userName}</span>
            <icon-class icon-class={this.isopen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'}/>
          </section>
        }
        {
          <el-dropdown-menu class={this.recls('menu')} slot={'dropdown'}>
            {
              this.options.map(
                (opt, index) => [
                  <el-dropdown-item
                    key={index}
                    nativeOnClick={this.click.bind(this, opt.value, index)}
                  >
                    {opt.label}
                  </el-dropdown-item>,
                ],
              )
            }
          </el-dropdown-menu>
        }
      </el-dropdown>
    );
  },
  methods: {
    visibleChange(state) {
      this.isopen = state;
    },
    click(value, index) {
      this.$emit('click', value, index);
    },
  },
});

