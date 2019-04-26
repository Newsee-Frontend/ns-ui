<template>
  <el-popover placement="bottom" :width="popoverWidth" trigger="click" class="change-theme">
    <div class="change-theme-container clear">
      <p>设置主题</p>

      <div
        class="fl theme-cycle"
        v-for="(opt, index) in palette"
        :key="index"
        :index="index"
        :style="{ 'background-color': opt.color }"
        @click="changeTheme(opt.key, index)"
      >
        <i class="el-icon-check" v-show="index === activeIndex"></i>
      </div>
    </div>
    <icon-svg slot="reference" icon-class="pifu"></icon-svg>
  </el-popover>
</template>

<script>
  import palette from './palette';
  import iconSvg from '../Icon-svg/Icon-svg';

  export default {
    name: 'change-theme',
    components: { iconSvg },
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
    mounted() {
      this.toggle(this.initTheme);
    },
    methods: {
      toggle(key) {
        const Layout = document.getElementById('layout');
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
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
