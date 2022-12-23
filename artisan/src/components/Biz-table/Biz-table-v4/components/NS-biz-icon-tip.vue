<!--用于各类说明控件-->
<template>
  <span>dwdwedwe</span>
</template>

<script>
export default {
  name: 'ns-biz-icon-tip',
  props: ['info', 'isExample', 'icon'],

  mounted() {
    console.log('ns-biz-icon-tip mounted');
  }
};
</script>

<style lang="scss" scoped>
$icon_color: #a7a7ad;
.icon-tip{
  cursor: pointer;
  color: $icon_color;
  padding: 0;
  &:hover{
    color: darken($icon_color, 50%);
  }
}

.icon-tip-container{
  max-width: 400px;
  word-break: break-all;
}

.primary-to-link{
  cursor: pointer;
  margin-left: 6px;
  color: #0A7AF8;
}
</style>

<style lang="scss">
$border-color: #ebeef5;
$border-shadow-color: #0000001f;
.icon-tip-popper{
  line-height: 1.4;
  &.is-light{
    border: 1px solid $border-color;
    box-shadow: 0 2px 12px 0 $border-shadow-color;
    color: #606266;
    &[x-placement^=top] {
      .popper__arrow{
        border-top-color: #fff;
        &::after{
          border-color:   transparent;
        }
      }
    }
  }
}
</style>
