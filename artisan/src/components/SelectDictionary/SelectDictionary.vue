<template>
  <ns-select
    v-model="selectModel"
    @input="handleModel"
    @change="modelChange"
    @clear="modelClear"
    :options="options"
    :keyRefer="keyRefer"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    :collapseTags="collapseTags"
    :loading="loading"
    :noMatchText="noMatchText"
    :width="width"
    :height="height"
    :name="name"
    :disabled="disabled"
    :size="size"
  ></ns-select>
</template>

<script>
  import getDynamicOptions from '../../service/Form/requestDictionary';

  export default {
    name: 'ns-select-dictionary',

    data(){
      return {
        selectModel: this.value,
        options: [],
        noMatchText: this.emptyText
      }
    },

    props: {
      value: [Array, String, Number],
      width: [String, Number],
      height: [String, Number],
      size:  String,
      name: { type: String },
      disabled: { type: Boolean, default: false },
      dynamicUrl: { type: String, default: '/system/dictionary/list-dictionaryItem' }, //
      dynamicQuery: { type: [Object, String, Array], default: null }, //{'dictionaryGroupId':'','dictionaryitemDictionaryId':''}
      placeholder: { type: String, default: '请输入' },
      clearable: {type: Boolean, default: false},
      multiple: { type: Boolean, default: false },
      multipleLimit: { type: Number, default: 0 },
      collapseTags: { type: Boolean, default: false },//多选时是否将选中值按文字的形式展示
      errorText: {
        type: String,
        default: '请稍后重试'
      },
      emptyText: {
        type: String,
        default: '暂无数据'
      },
      keyRefer: {
        type: Object,
        default: ()=> ({
          label: 'dictionaryitemItemname',
          value: 'dictionaryitemItemcode'
        })
      }
    },

    watch: {
      value(val) {
        this.selectModel = val;
      },
    },

    methods: {
      getOptions(){
        this.loading = true;
        getDynamicOptions(this.dynamicUrl, this.dynamicQuery).then((response)=>{
          this.loading = false;
          this.options = response.resultData.list || [];
        }, (err)=>{
          this.loading = false;
          this.noMatchText = this.errorText;
        })
      },


      handleModel(e){
        this.$emit('input', e);
      },

      modelChange(e){
        this.$emit('change', e);
      },

      modelClear(){
        this.$emit('clear')
      }
    },

    created(){
      this.getOptions()
    }
  };
</script>

<style scoped>

</style>
