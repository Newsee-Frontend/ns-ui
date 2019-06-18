<template>
    <ns-select
      v-model="selectModel"
      @input="handlerModel"
      @change="change"
      :width="width"
      :height="height"
      :options="options"
      :loading="loading"
      :keyRefer="keyRefer"
      :disabled="disabled"
      remote
      :remoteMethod="remoteMethodFun"
      filterable
      :placeholder="placeholder"
    >

    </ns-select>
</template>

<script>
  export default {
    name: 'ns-select-remote',

    data(){
      return {
        selectModel: this.value,
        options: [],
        loading: false
      }
    },

    watch: {
      value(val){
        this.remoteMethodFun(val)
      }
    },

    props: {
      value: [Array, String, Number],
      width: [String, Number],
      height: [String, Number],
      disabled: { type: Boolean, default: false },
      dynamicUrl: String,
      dynamicQuery: Object,
      dynamicKeyName: {
        type: String,
        default: 'key'
      } , //搜索时键值作为传参的name
      keyRefer: {
        type: Object,
        default: ()=> ({
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        })
      },
      placeholder: {
        type: String,
        default: '渐进式查询'
      },
      errorText: {
        type: String,
        default: '请稍后重试'
      },
      emptyText: {
        type: String,
        default: '暂无数据'
      },
    },

    methods: {
      remoteMethodFun: function(val){
        if(this.loading) return
        if(!val) return
        this.loading = true;
        this.$store.dispatch('getOptionRemote', {key:val}).then((data)=>{
          this.loading = false;
          this.options = data.resultData || [];
          this.options.length === 0 && (this.noMatchText = this.emptyText)
        }, ()=>{
          this.loading = false;
          this.noMatchText = this.errorText;
        })
      },

      handlerModel: function(e){
        this.selectModel = e;
        this.$emit('input', e);
      },

      change: function(e){
        this.$emit('change', e);
      }
    },

    created(){
      this.remoteMethodFun(this.selectModel)
    }

  };
</script>

