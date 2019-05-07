<template>
  <div class="demo-block">
    <h1>
      <slot name="title"></slot>
    </h1>
    <p>
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
    overflow: hidden;
    padding: 5px;
    h1 {
      font-weight: 400;
      color: #1f2f3d;
      margin: 25px 0 15px;
    }

    p {
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
    }
    .demo-block-content {
      padding: 24px;

      .gap {
        margin-top: 20px;
      }
    }
  }
</style>
