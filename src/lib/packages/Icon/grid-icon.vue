<template>
  <svg class="grid-icon" aria-hidden="true" @click="click" ref="grid-icon">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
  export default {
    name: 'grid-icon',
    props: {
      iconClass: {
        type: [String],
        required: true,
        default: '',
      },
      color: {}
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass ? this.iconClass : ''}`
      }
    },
    methods: {
      click() {
        this.$emit('click');
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*iconfont 图标*/
  .grid-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    color: #bfcbd9;
    fill: currentColor;
    overflow: hidden;
    padding: 0 5px;
  }
</style>
