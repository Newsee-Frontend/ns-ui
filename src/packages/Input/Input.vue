<!-- 输入框 input -->
<template>
  <el-input
    :class="recls([size])"
    v-model="childIpt"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    :minlength="minlength"
    :maxlength="maxlength"
    :autofocus="autofocus"
    :readonly="readonly"
    :clearable="clearable"
    @change="change"
    @blur="blur"
    @focus="focus"
    :style="{ width: width, height: height }"
  >
  </el-input>
</template>
<script>
import create from '../../utils/create';

import { sizeValidator } from '../../utils/props/validator';

export default create({
  name: 'input',
  data() {
    return {
      childIpt: '',
    };
  },
  created() {
    const disabled = true;
    console.log(11111111111);
    console.log(this.recls('mini'));
    console.log(this.recls(['mini']));
    console.log(this.recls(['disabled', 'primary']));
    console.log(this.recls('text', { disabled }));

    this.childIpt = this.fatherIpt;
  },
  model: {
    prop: 'fatherIpt',
    event: 'input',
  },
  watch: {
    childIpt() {
      this.$emit('input', this.childIpt);
    },
    fatherIpt() {
      this.childIpt = this.fatherIpt;
    },
  },
  computed: {},
  props: {
    fatherIpt: [String, Number],
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    name: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    size: {
      type: String,
      default: 'normal',
      validator: s => sizeValidator(s),
    },
    'prefix-icon': { type: String }, //输入框头部图标
    'suffix-icon': { type: String }, //输入框尾部图标
    customIcon: { type: String },
    rows: { type: Number, default: 3 },
    minlength: { type: [Number, String] }, //最小输入长度
    maxlength: { type: [Number, String], default: 300 }, //最大输入长度
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
  },
  methods: {
    /**
     * change
     * @param value
     */
    change(value) {
      this.$emit('change', value);
    },
    /**
     * blur
     * @param value
     */
    blur(value) {
      this.$emit('blur', value);
    },
    /**
     * focus
     * @param value
     */
    focus(value) {
      this.$emit('focus', value);
    },
    /**
     * icon-click
     * @param value
     */
    iconClick(value) {
      this.$emit('iconClick', value);
    },
  },
});
</script>
<style rel="stylesheet/scss" lang="scss"></style>
