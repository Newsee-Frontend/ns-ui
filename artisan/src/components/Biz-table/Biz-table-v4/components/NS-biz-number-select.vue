<!--用于筛选器的金额选择控件-->
<!--model值 lg： { EQUAL：100 }  等于100 -->
<!--model值 lg： { GREATER_EQUAL_THAN： 100， LESS_EQUAL_THAN： 200}  100~200 中间 -->
<template>
  <el-input v-model="inputValue" class="input-with-select" size="small" :style="{width: width + 'px'}"
            @blur="focusing = false"
            @focus="focusing = true"
            @change="changeVal"
            :placeholder="numberPlaceholder"
            :class="{
             'focus-select': focusing,
              'hasAppend': isBetween
             }"
  >
    <ns-select
      :width="40" :clearable="false" @change="changeComparision"
      v-model="comparision" slot="prepend" :options="options"></ns-select>

    <div slot="append" v-if="isBetween">
      <span>~</span>
      <ns-input
        style="height: 30px; line-height: inherit"
        @change="changeVal"
        :placeholder="numberPlaceholder"
        @blur="focusing = false"
        @focus="focusing = true"
        v-model="inputINValue" :width="appendWidth" class="append-input"></ns-input>
    </div>
  </el-input>
</template>

<script>
  export default {
    name: 'NS-biz-number-select',

    props: {
      value: String,

      placeholder: String,

      width: {
        type: Number,
        default: 200,
      },
    },

    data() {
      return {
        options: [
          { value: 'GREATER_THAN', label: '>' },
          { value: 'GREATER_EQUAL_THAN', label: '>=' },
          { value: 'EQUAL', label: '=' },
          { value: 'LESS_THAN', label: '<' },
          { value: 'LESS_EQUAL_THAN', label: '<=' },
          { value: 'BETWEEN', label: '介于' },  //BETWEEN  是 GREATER_EQUAL_THAN and LESS_EQUAL_THAN 的组合
        ],

        focusing: false,

        comparision: 'BETWEEN',
        inputValue: '',
        inputINValue: '',  //IN的情况下有两个
      };
    },

    watch: {
      value: {
        handler(val) {
          if (val) {
            //初始化 解析value值
            let obj = JSON.parse(val) || {};
            let length = Object.keys(obj).length;
            Object.keys(obj).forEach((key, index) => {
              if (index === 0) {
                length === 1 && (this.comparision = key);
                this.inputValue = obj[key];
              }

              if (index === 1) {
                this.comparision = 'BETWEEN';
                this.inputINValue = obj[key];
              }
            });
          } else {
            this.comparision = 'BETWEEN';
            this.inputValue = '';
            this.inputINValue = '';  //IN的情况下有两个
          }
        },
        immediate: true,
      },
    },

    computed: {
      //是否是介于状态
      isBetween() {
        return this.comparision === 'BETWEEN';
      },

      appendWidth() {
        return (this.width - 40 - 10) / 2;
      },

      //文本框太小 保留主要文字
      numberPlaceholder() {
        return this.isBetween ? this.placeholder.replace('请输入', '') : this.placeholder;
      },
    },

    methods: {
      //change input
      changeVal() {
        //数字格式正确
        this.inputValue && (this.inputValue = this.inputValue.replace(/[^-\d.]/g, ''));
        this.inputINValue && (this.inputINValue = this.inputINValue.replace(/[^-\d.]/g, ''));

        //组装返回结构体
        let obj = this.isBetween ? {
          'GREATER_EQUAL_THAN': this.inputValue,
          'LESS_EQUAL_THAN': this.inputINValue,
        } : {
          [this.comparision]: this.inputValue,
        };

        this.$emit('input', JSON.stringify(obj));
        this.$emit('change', JSON.stringify(obj));
      },

      //change select
      changeComparision() {
        // this.inputValue = ''
        // this.inputINValue = ''  //IN的情况下有两个
        this.changeVal();
      },
    },
  };

</script>

<style scoped lang="scss">
  .input-with-select {
    &.hasAppend /deep/ {
      > .el-input__inner {
        border-right: none;
      }
    }

    /deep/ .el-input__suffix {
      display: none;
    }

    /deep/ .el-input--suffix .el-input__inner {
      padding: 0;
      text-align: center;
    }

    /deep/ .el-input-group__append {
      padding: 0;
      background-color: #fff;
    }

    .append-input.ns-input /deep/ .el-input__inner {
      height: 30px;
      border: none;
      border-radius: 5px;
    }

    &:hover /deep/, &.focus-select /deep/ {
      .el-input-group__append, > .el-input__inner {
        border-color: #0a7af8;
      }
    }
  }
</style>
