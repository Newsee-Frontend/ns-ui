<template>
  <ns-platform-dialog
    class="ns-biz-platform-dialog"
    ref="ns-biz-platform-dialog"

    :visible.sync="showDialog"

    :title="title"
    :modal="modal"
    :closeOnClickModal="closeOnClickModal"

    left="50px"
    right="0"
    top="87px"
    bottom="0"

    :domsToClose="domsToClose"

    @close="platformDialogClose"
    :beforeClose="platformDialogClose"
  >

    <div class="platform-header clear">
      <div class="platform-header_title fl">
        {{title}}
      </div>


      <div class="platform-header_close fr" @click="platformDialogClose">
        <i class="el-icon-close"></i>
      </div>

      <div class="platform-header_action fr">
        <slot name="header"></slot>
      </div>

    </div>

    <div class="platform-body">
      <div class="platform-body_container">
        <slot name="body"></slot>
      </div>

    </div>

    <div class="platform-footer">
      <div class="platform-footer_container clear">
        <slot name="footer"></slot>
      </div>
    </div>

  </ns-platform-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'NS-biz-platform-dialog',

    props: {
      visible: {
        type: Boolean,
        default: false,
      },

      title: {
        type: String,
      },
      modal: { type: Boolean, default: false }, //是否需要遮罩层
      closeOnClickModal: { type: Boolean, default: false }, //是否可以通过点击 modal 关闭
      domsToClose: {
        type: [Array, null], default() {
          return ['header-wrapper', 'sidebar-wrapper', 'page-tabs-wrapper'];
        },
      },
    },

    data() {
      return {
        showDialog: false,
      };
    },

    computed: {
      ...mapGetters(['isInIframe']),

      position() {
        return {
          left: this.isInIframe ? '0px' : '50px',
          right: '0px',
          bottom: '0px',
          top: this.isInIframe ? '0px' : '88px',
        };
      },
    },

    watch: {
      visible: {
        handler(newVal, oldVal) {
          this.showDialog = newVal;
          if (!newVal) {
            this.platformDialogClose();
          }
        },
        immediate: true,
      },
    },

    methods: {
      /**
       * 关闭
       */
      platformDialogClose() {
        this.showDialog = false;
        this.$emit('update:visible', false);
        this.$emit('close');
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./style/index";
</style>
