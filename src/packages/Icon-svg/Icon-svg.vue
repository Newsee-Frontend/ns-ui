<template>
  <svg class="ns-svg-icon" aria-hidden="true" @click="click" ref="svg-icon">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
  export default {
    name: 'svg-icon',
    props: {
      iconClass: {
        type: [String],
        required: true,
        default: '',
      },
      color: {},
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass ? this.iconClass : ''}`;
      },
    },
    created() {
      // alert(this.iconClass)
    },
    mounted() {
    },
    beforeUpdate() {
    },
    methods: {
      //click时触发的事件
      click() {
        this.$emit('click');
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
