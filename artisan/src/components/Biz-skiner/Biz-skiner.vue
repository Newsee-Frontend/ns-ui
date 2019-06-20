<template>
  <ns-skiner v-model="skinerModel"
             :color-format="colorFormat"
             @change-theme="changeTheme"
             @show="show"
             @after-enter="afterEnter"
             @hide="hide"
             @after-leave="afterLeave"
  ></ns-skiner>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Biz-skiner',
    data() {
      return {
        skinerModel: '#252836',
        colorFormat: 'hax',
      };
    },
    watch: {
      skinerModel(val) {
        console.log('skinerModel - 变化了 ');
        console.log(val);

      },
    },
    computed: {
      ...mapGetters(['theme']),
    },
    methods: {
      changeTheme(key) {
        console.log('换肤改变');
        console.log(key);
      },

      show() {
        console.log('换肤打开');
      },
      afterEnter() {
        console.log('换肤打开-动画播放完毕后触发');
      },
      hide() {
        console.log('换肤关闭');
      },
      afterLeave() {
        console.log('换肤关闭-动画播放完毕后触发');
      },
    },
  };

</script>
<style rel="stylesheet/scss" lang="scss">

</style>
