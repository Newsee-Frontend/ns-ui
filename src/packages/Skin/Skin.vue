<template>
  <el-popover
    placement="bottom"
    :width="popoverWidth"
    trigger="click"
    class="change-theme"
  >
    <div class="change-theme-container clear">
      <p>设置主题</p>

      <div class="fl theme-cycle"
           v-for="(opt, index) in themeOptions"
           :key="index"
           :index="index"
           :style="{ 'background-color': opt.color }"
           @click="changeTheme(opt.key,index )"
      >
        <i class="el-icon-check" v-show="index === activeIndex "></i>
      </div>
    </div>
    <icon-svg slot="reference" icon-class="pifu"></icon-svg>
  </el-popover>

</template>

<script>
  import iconSvg from '../Icon-svg/Icon-svg'

  export default {
    name: 'change-theme',
    components: {iconSvg},
    data() {
      return {
        themeprefix: 'theme-',
        popoverWidth: '140px',
        activeIndex: 4,
        themeOptions: [
          {key: 'blue', color: '#0A7AF8'},
          {key: 'green', color: '#4CA770'},
          {key: 'red', color: '#E24C57'},
          {key: 'purple', color: '#8352AF'},
          {key: 'black', color: '#252836'},
        ]
      }
    },
    mounted() {

    },
    methods: {
      changeTheme(key, index) {
        this.activeIndex = index;
        const Layout = document.getElementById('layout');
        Array.prototype.slice.call(Layout.classList).forEach(
          cls => {
            if (cls.includes(this.themeprefix)) {
              Layout.classList.remove(cls);
            }
          }
        );
        Layout.classList.add(`${this.themeprefix}${key}`);
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
