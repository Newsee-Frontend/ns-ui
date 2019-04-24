<template>
  <el-date-picker
    class="date-picker"
    :class="className"
    v-model="childDataPicker"
    :type="type"
    :readonly="readonly"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :format="format"
    :value-format="valueFormat"
    :align="align"
    :popper-class="popperClass"
    :picker-options="pickerOptions"
    :range-separator="rangeSeparator"
    :default-time="defaultTime"
    @change="change"
    @onPick="onPick"
    :style="{ width: datePicker_width, height: datePicker_height }"
  >
  </el-date-picker>
</template>
<script>
  import create from '../../utils/create';
  export default create({
    name: 'date-picker',
    data() {
      return {
        childDataPicker: ''
      };
    },
    created() {
      this.childDataPicker = this.fatherDataPicker;
    },
    model: {
      prop: 'fatherDataPicker',
      event: 'change',
    },
    watch: {
      childDataPicker() {
        this.$emit('change', this.childDataPicker);
      },
      fatherDataPicker() {
        this.childDataPicker = this.fatherDataPicker;
      },
    },
    computed: {
      datePicker_width() {
        /*
           有 spec 属性则采用 spec 的值所对应的宽度作为宽度值， 否则采用 width 属性值。
           如果spec有值，请注意值是否正确（small，medium，normal，large），可以为 null。
          */
        if (this.spec) {
          return this.sizeMap[this.spec];
        }
        return this.width;
      },
      datePicker_height() {
        return this.height;
      },

      sizeName() {
        return {
          mini: this.p('input--mini'),
          small: this.p('input--small'),
          medium: this.p('input--medium'),
          large: this.p('input--large')
        }[this.size];
      },
      className() {
        return [this.p('input'), this.sizeName]
      },
    },
    props: {
      fatherDataPicker: [Date, Array, String, Number],
      width: { type: [String, Number], default: '200px' },
      height: { type: [String, Number], default: '32px' },
      readonly: { type: Boolean, default: false }, //完全只读
      disabled: { type: Boolean, default: false }, //禁用
      editable: { type: Boolean, default: false }, //文本框可输入
      clearable: { type: Boolean, default: true }, //是否显示清除按钮
      size: { type: String }, //尺寸
      spec: { type: String }, //宽度size尺寸值（small，medium，normal，large,adapt）
      placeholder: { type: String }, //占位内容
      startPlaceholder: { type: String }, //占位内容
      endPlaceholder: { type: String }, //占位内容
      type: { type: String, default: 'data' }, //显示类型
      format: { type: String, default: 'yyyy-MM-dd' }, //显示在输入框中的格式
      valueFormat: { type: String }, //时间日期绑定值格式，不指定则绑定Data对象
      align: { type: String, default: 'left' }, //对齐方式
      popperClass: { type: String }, //DateTimePicker 下拉框的类名
      rangeSeparator: { type: String, default: ' - ' }, //选择范围时的分隔符
      defaultTime: { type: [String, Array] }, //可选，选择器打开时默认显示的时间
      //当前时间日期选择器特有的选项参考下表
      pickerOptions: {
        type: Object,
        default: function() {
          return {};
        },
      },
    },
    methods: {
      change(value) {
        this.$emit('change', value);
      },
      //选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效
      onPick({ maxDate, minDate }) {
        this.$emit('onPick', { maxDate, minDate });
      },
    },
  });
</script>
