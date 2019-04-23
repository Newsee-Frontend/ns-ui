<template>
  <div class="input">
    <span>{{inoutModel || text}}</span>
    <ns-input
      v-model="inoutModel"
      :spec="spec"
      :width="width"
      :height="height"
      :size="size"
    >

    </ns-input>

  </div>
</template>

<script>
  export default {
    name: 'col',
    data() {
      return {
        text: '请输入',
        inoutModel: '',
        spec: 'small',
        width: '300px',
        height: '40px',
        size: 'medium',
      }
    },
    created() {

    }
  };

</script>

<style>

</style>
