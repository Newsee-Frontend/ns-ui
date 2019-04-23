<template>
  <div id="app">
    <TestDemo></TestDemo>
    <div>
      <SelectTree
        :multiple="true"
        :options="options"
        placeholder="Select your favourite(s)..."
        v-model="value"
      />
      <pre class="result">{{ value }}</pre>
    </div>
  </div>
</template>

<script>
  import TestDemo from '../../lib/packages/TestDemo/index'
  import SelectTree from '../../lib/packages/SelectTree/SelectTree'
  export default {
    name: 'App',
    components: {TestDemo,SelectTree},
    data: () => ({
      value: [],
      options: [
        {
          id: 'fruits',
          label: 'Fruits',
          children: [{
            id: 'apple',
            label: 'Apple 🍎',
            isNew: true,
          }, {
            id: 'grapes',
            label: 'Grapes 🍇',
          }, {
            id: 'pear',
            label: 'Pear 🍐',
          }, {
            id: 'strawberry',
            label: 'Strawberry 🍓',
          }, {
            id: 'watermelon',
            label: 'Watermelon 🍉',
          }],
        },
        {
          id: 'vegetables',
          label: 'Vegetables',
          children: [{
            id: 'corn',
            label: 'Corn 🌽',
          }, {
            id: 'carrot',
            label: 'Carrot 🥕',
          }, {
            id: 'eggplant',
            label: 'Eggplant 🍆',
          }, {
            id: 'tomato',
            label: 'Tomato 🍅',
          }],
        }
      ],
    }),
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../lib/packages/TestDemo/index";
  @import "../../lib/packages/TestDemo/index";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
