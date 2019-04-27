import create from '../../utils/create';
import sidebarBubble from './theme/bubble/sidebar-bubble';
import sidebarCollapse from './theme/collapse/sidebar-collapse';
// import sidebarPush from './theme/push/sidebar-push';

export default create({
    name: 'sidebar',

    components: { sidebarCollapse, sidebarBubble },

    data() {
      return {};
    },
    props: {
      type: { type: String, default: 'collapse' }, //'bubble','push','collapse'
      data: { type: Array },
      jumpByNavEmpty: { type: Boolean },
      showTimeout: { type: Number },
      hideTimeout: { type: Number },
      keyRefer: {
        type: Object,
        default() {
          return {
            funcId: 'funcId', //func-ID
            menuLabel: 'menuMenuname', //显示名称
            menuRouter: 'menuMenusubname', //路径符号
            menuIcon: 'menuIconcls', //图标
            menuIconRight: 'menuIconRight', //图标
            menuIndex: 'syOrderindex', //序号
            childMenus: 'childMenus', //子集菜单
          };
        },
      },
    },
    computed: {
      currentType() {
        return 'sidebar-' + this.type;
      },
    },
    render(h) {
      // const props = {
      //   id="Sidebar"
      //   class={`${this.recls()} ${this.recls(this.type)}`}
      // s={this.currentType}
      // data={this.data}
      // keyRefer={this.keyRefer}
      // jumpByNavEmpty={this.jumpByNavEmpty}
      // showTimeout={this.showTimeout}
      // hideTimeout={this.hideTimeout}
      // on-first-nav-click={this.firstNavClick}
      // on-mouse-enter={this.mouseEnter}
      // on-mouse-leave={this.mouseLeave}
      // }
      const props = {
        data: this.data,
        keyRefer: this.keyRefer,
        jumpByNavEmpty: this.jumpByNavEmpty,
        showTimeout: this.showTimeout,
        hideTimeout: this.hideTimeout,
      };

      console.log(88888888);
      console.log(props);
      const siderender = () => {

        switch (this.type) {
          case 'collapse':
            return (
              <sidebar-collapse
                class={`${this.recls()} ${this.recls(this.type)}`}
                {...{ props }}
                on-first-nav-click={this.firstNavClick}
                on-mouse-enter={this.mouseEnter}
                on-mouse-leave={this.mouseLeave}
              >
                  <span slot={'firstNav0'}>
                    {
                      this.$slots.firstNav0
                    }
                  </span>
              </sidebar-collapse>
            );
          case 'bubble':
            return (
              <sidebar-bubble
                {...{ props }}
                on-first-nav-click={this.firstNavClick}
                on-mouse-enter={this.mouseEnter}
                on-mouse-leave={this.mouseLeave}
              >
                  <span slot={'firstNav0'}>
                    {
                      this.$slots.firstNav0
                    }
                  </span>
              </sidebar-bubble>
            );
          default:
            return null;
        }
      };
      return (
        siderender()
      );
    },
    methods: {
      /**
       * first nav click handle
       * @param index
       * @param item
       */
      firstNavClick(index, item) {
        this.$emit('first-nav-click', index, item);
      },
      /**
       * nav mouse event
       * @param index
       * @param item
       */
      mouseEnter(index, item) {
        this.$emit('mouse-enter', index, item);
      },
      /**
       * nav mouse event
       * @param index
       * @param item
       */
      mouseLeave(index, item) {
        this.$emit('mouse-leave', index, item);
      },
    },
  },
);
