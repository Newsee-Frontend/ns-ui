<template>
  <ns-checkbox
    v-model="checkModel"
    @input="handleModel"
    @change="modelChange"
    :options="options"
    :type="type"
    :width="width"
    :size="size"
    :fill="fill"
    :textColor="textColor"
    :disabled="disabled"
    :keyRefer="keyRefer"
    :min="min"
    :max="max"
  >
  </ns-checkbox>
</template>

<script>
  import getDynamicOptions from '../../service/Form/requestDictionary';

  export default {
    name: 'ns-radio-dictionary',

    data(){
      return {
        checkModel: this.value,
        options: []
      }
    },

    props: {
      value: Array,
      width: [String, Number],
      type: { type: String, default: 'normal' }, //Radio 类型     normal /  button
      size: { type: String },
      min: { type: Number, default: 0 }, //可被勾选的 checkbox 的最小数量
      max: { type: Number }, //可被勾选的 checkbox 的最大数量
      fill: { type: String, default: '#20a0ff' }, //背景颜色
      textColor: { type: String, default: '#ffffff' }, //按钮：字体颜色
      disabled: { type: Boolean, default: false },
      keyRefer: {
        type: Object,
        default: ()=> ({
          label: 'dictionaryitemItemname',
          value: 'dictionaryitemItemcode'
        })
      },
      dynamicUrl: { type: String, default: '/system/dictionary/list-dictionaryItem' }, //
      dynamicQuery: { type: [Object, String, Array], default: null }, //{'dictionaryGroupId':'','dictionaryitemDictionaryId':''}
    },

    watch: {
      value(val) {
        this.checkModel = val;
      },
    },

    methods: {
      handleModel(e){
        this.$emit('input', e);
      },

      modelChange(e){
        this.$emit('change', e);
      }
    },

    created(){
      getDynamicOptions(this.dynamicUrl, this.dynamicQuery).then((response)=>{
        this.options = response.resultData.list || [];
      })
    }

  }
</script>
