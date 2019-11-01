/**
 * key refer => normalizer
 */
export default {
  props: {
    placeholder: { type: String },
    options: { type: Array },
    menuHeight: { type: Number, default: 300 },
    /**
     * 下拉菜单打开的方向
     * 默认情况下为 auto
     * 菜单将在控件下方打开。如果没有足够的空间，将自动翻转菜单。
     * 也可以使用其他四个选项之一强制菜单始终打开到指定的方向。
     * "auto", "below", "bottom", "above" or "top"
     */
    menuOpenDirection: { type: String, default: 'auto' },
    isMenuOpened: { type: Boolean, default: false }, //Whether the menu should be always open
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    appendToBody: { type: Boolean, default: false },
    limit: { type: Number }, //多选情况下，在select显示框中显示的个数限制，超出部分以 limitText 设置内容显示
    limitText: { type: Function, default: count => `+ ${count} more` },
  },
  computed: {},
  created() {},
};
