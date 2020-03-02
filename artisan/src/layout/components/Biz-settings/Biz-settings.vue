<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">页面设置</h3>

      <div class="drawer-item">
        <p>菜单栏类型：</p>
        <ns-select v-model="menuNavType" size="mini" placeholder="请选择类型" :options="menuNavTypeOptions"></ns-select>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    data() {
      return {
        menuNavTypeOptions: [
          { label: '两级菜单', value: 'second' },
          { label: '多级菜单', value: 'multiple' },
        ],
      };
    },
    computed: {
      ...mapGetters(['navMenuType']),
      menuNavType: {
        get() {
          return this.$store.state.NavMenu.navMenuType;
        },
        set(value) {
          this.$store.dispatch('toggleNavMenuType', value);
        },
      },
    },
    methods: {},
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .drawer-container {
    padding: 15px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, .85);
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
    }

    .drawer-item {
      color: rgba(0, 0, 0, .65);
      font-size: 12px;
      padding: 12px 0;
      p {
        margin: 5px 0;
      }
    }

    .drawer-switch {
      float: right
    }
  }
</style>
