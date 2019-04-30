<template>
  <ns-select
    v-model="selectModel"
    :options="options"></ns-select>
</template>

<script>
  import getDynamicOptions from './requestDictionary';

  export default {
    name: 'ns-select-dictionary',

    data(){
      return {
        selectModel: 1,
        options: []
      }
    },

    props: {
      dynamicUrl: { type: String, default: '/system/dictionary/list-dictionaryItem' }, //
      dynamicQuery: { type: [Object, String, Array], default: null }, //{'dictionaryGroupId':'','dictionaryitemDictionaryId':''}
    },

    methods: {
      getOptions(){
        this.loading = true
        getDynamicOptions(this.dynamicUrl, this.dynamicQuery).then((response)=>{
          let list = response.resultData.list;
          this.options = list;
        }, (err)=>{
        })
      }
    },

    created(){
      this.getOptions()
    }
  };
</script>

<style scoped>

</style>
