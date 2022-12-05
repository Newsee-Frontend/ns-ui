<template>
   <div class="filter-container">

     <template v-if="$scopedSlots[column.field]">
       <slot :name="column.field"></slot>
     </template>

     <!--文本-->
     <template v-if="['input', 'text'].includes(filterConfig.type)">
       <ns-input  :placeholder="'按回车确认搜索'"  v-bind="$attrs" v-on="$listeners" @keyup.enter.native="$panel.confirmFilter()"></ns-input>
     </template>

     <!--数字-->
     <template v-else-if="filterConfig.type === 'number'">
       <ns-biz-number-select :placeholder="`请输入`" v-bind="$attrs" v-on="$listeners" @keyup.enter.native="$panel.confirmFilter()"></ns-biz-number-select>
     </template>

     <!--下拉-->
     <template v-else-if="filterConfig.type === 'select'">
       <ns-biz-select-all v-bind="$attrs" v-on="$listeners" :options="filterConfig.options"></ns-biz-select-all>
     </template>

     <template v-else-if="filterConfig.type === 'date'">
       <ns-biz-time-select v-bind="$attrs" v-on="$listeners"
                           :placeholder="'请选择' + column.title" @change="$panel.confirmFilter()"
                           :config="filterConfig"></ns-biz-time-select>
<!--       <select-all v-bind="$attrs" v-on="$listeners" :options="filterConfig.options"></select-all>-->
     </template>

   </div>
</template>

<script>
import nsBizSelectAll from './NS-biz-select-all';
import nsBizNumberSelect from './NS-biz-number-select'
import nsBizTimeSelect from './NS-biz-time-select'
export default {
  name: 'filter-components',

  components: {
    nsBizSelectAll,
    nsBizNumberSelect,
    nsBizTimeSelect
  },

  props: {
    // 列实体类
    $panel: {
      type: Object
    },

    // column 列信息
    column: {
      type: Object,
      default: ()=>{}
    }
  },

  computed: {
    // filter config 信息
    filterConfig(){
      return this.column.params['filter-Config'] || {}
    }
  }
};
</script>

<style scoped>

</style>
