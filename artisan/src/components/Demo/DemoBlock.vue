<template>
  <div class="demo-block">
    <h1>
      <slot name="title"></slot>
    </h1>
    <p class="describe">
      <slot name="describe"></slot>
    </p>
    <div class="demo-block-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'demo-block',
    data() {
      return {};
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  .demo-block {
    /*overflow: hidden;*/
    padding: 5px;
    h1 {
      font-weight: 400;
      color: #1f2f3d;
      margin: 20px 0 10px;
    }
    h2 {
      color: #2a3f52;
      margin: 10px 0 5px;
    }
    .describe {
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
      margin: 5px 0;
    }
    .demo-block-content {
      padding: 18px;
      .gap {
        margin-top: 20px;
      }

      .control-block {
        margin: 10px 0;
        span {
          font-size: 14px;
          color: #505c6e;
          margin: 0 1px 0 8px;
        }
      }
      .form-block-line {
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
