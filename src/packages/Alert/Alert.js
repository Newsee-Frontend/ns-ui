import create from '../../utils/create';

export default create({
  name: 'alert',

  data() {
    return {
      childCascader: false,
    };
  },
  props: {
    //类型
    type: {
      type: String,
      default: 'info',
    },
    //标题
    title: {
      type: String,
      default: '',
    },
    //是否可关闭
    closable: {
      type: Boolean,
      default: true,
    },
    //辅助性描述文字,也可通过默认 slot 传入
    description: {
      type: String,
      default: null,
    },
    //是否显示图标
    showIcon: {
      type: Boolean,
      default: false,
    },
    //关闭按钮自定义文本
    closeText: {
      type: String,
      default: '',
    },
  },

  computed: {},

  watch: {},

  render(h) {
    let {
      title,
      type,
      closable,
      description,
      showIcon,
      closeText,
    } = this;
    return (
      <el-alert
        class={ this.recls()}
        title={title}
        type={type}
        closable={closable}
        description={description}
        showIcon={showIcon}
        closeText={closeText}
        onClose={this.close.bind(this)}
      >
      </el-alert>
    );
  },

  methods: {
    //关闭alert时触发的事件
    close() {
      this.$emit('close');
    },
  },

  created() {
  },

  mounted() {
  },
});
