import create from '../../create/create';

export default create({
  name: 'page-tabs',
  data() {
    return {};
  },
  props: {
    data: { type: Array },
    limit: { type: Number, default: 6 },
    autoJump: { type: Boolean, default: true },
    activeRule: { type: Function },
  },
  computed: {
    curPath() {
      return this.$route.path;
    },
    visitedView() {
      // console.log('* ============================= *');
      // console.log('上方显示历史访问tab标签列表如下：');
      // console.log(this.data.slice(-this.limit));
      // console.log('* ============================= *');

      //select the first 6 objects in the visited-views array
      return this.data.slice(-this.limit);
    },
  },
  render(h) {
    return (
      <ul class={this.recls({ show: this.visitedView.length })}>

        {Array.from(this.visitedView).map((tag, i) => [
          <li class={['tab-tag', { 'tag-active': this.isActive(tag.path) }]} key={tag.path}>
            <el-tag
              closable
              on-close={this.closeViewTabs.bind(this, tag)}
              on-click={this.tabsjump.bind(this, tag)}
            >
              {
                <img
                  src={
                    this.isActive(tag.path)
                      ? require('../../assets/pageTabs-active@3x.png')
                      : require('../../assets/pageTabs@3x.png')
                  }
                />
              }
              <span class={'el-tag-text'}> {tag.name}</span>
            </el-tag>
          </li>,
        ])}

        {
          <div class={'operate-slot'}>
            {
              this.$slots['operate'] ?
                <div slot="operate">{this.$slots['operate']}</div> :
                this.visitedView.length ? (
                  <icon-class icon-class={'close-all'} class={'operate-slot-icon'} on-click={this.closeAllViewTabs}/>
                ) : null
            }
          </div>
        }
      </ul>
    );
  },
  methods: {
    //close this tab
    closeViewTabs(view, $event) {
      $event.preventDefault();
      this.$emit('close-view-tabs', view);
    },
    //close all tabs
    closeAllViewTabs() {
      this.$emit('close-all-view-tabs', this.visitedView);
    },
    //judge tab is active or not
    isActive(path) {
      if (this.activeRule) {
        return this.activeRule(path);
      }
      return path === this.curPath;
    },
    //click tab jump
    tabsjump(tag) {
      if (this.autoJump) {
        this.$router.push({ path: tag.path });
      }
      else {
        this.$emit('click-view-tabs', tag);
      }
    },
  },
  created() {

  },
});
