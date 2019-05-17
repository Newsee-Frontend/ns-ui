<!--UI 组件库 - Form - 页面测试-->
<template>
  <div class="form-wrapper">
    <demo-block>
      <template slot="title">
        典型表单
      </template>
      <template slot="describe">
        包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。
      </template>
      <template slot="content">
        <ns-form
          style="width: 600px"
          label-width="100px"
          ref="checkForm"
          :model="formData"
        >
          <ns-form-item label="姓名" prop="name">
            <ns-input v-model="formData.name" clearable size="medium"></ns-input>
          </ns-form-item>

          <ns-form-item label="性别：" prop="sex">
            <ns-switch
              v-model="formData.sex"
              onText="女"
              offText="男"
            ></ns-switch>
          </ns-form-item>

          <ns-form-item label="活动日期：" prop="date">
            <ns-date-picker v-model="formData.date" size="medium"></ns-date-picker>
          </ns-form-item>

          <ns-form-item label="活动时间：" prop="time">
            <ns-time-picker v-model="formData.time" size="medium"></ns-time-picker>
          </ns-form-item>

          <ns-form-item label="兴趣爱好：" prop="interest">
            <ns-checkbox v-model="formData.interest" :options="iOptions" size="medium"></ns-checkbox>
          </ns-form-item>

          <ns-form-item label="部门：" prop="belong">
            <ns-radio v-model="formData.belong" :options="bOptions" size="medium"></ns-radio>
          </ns-form-item>

          <ns-form-item label="籍贯：" prop="zone">
            <ns-select :options="sOptions" v-model="formData.zone" size="medium"></ns-select>
          </ns-form-item>

          <ns-form-item label="所属地区：" prop="area">
            <ns-cascader v-model="formData.area" :options="options" size="medium"></ns-cascader>
          </ns-form-item>
        </ns-form>
      </template>
    </demo-block>
    <demo-block>
      <template slot="title">
        校验表单
      </template>
      <template slot="describe">
        表单校验
      </template>
      <template slot="content">
        <ns-form
          style="width: 600px"
          label-width="100px"
          :model="formVData"
          :rules="rules"
          ref="checkVForm"
        >
          <ns-form-item label="姓名" prop="name">
            <ns-input
              v-model="formVData.name"
              clearable
              size="medium"
            ></ns-input>
          </ns-form-item>
          <ns-form-item label="年龄" prop="age">
            <ns-input v-model="formVData.age" clearable size="medium"></ns-input>
          </ns-form-item>
          <ns-form-item label="部门：" prop="belong">
            <ns-radio v-model="formVData.belong" :options="bOptions" size="medium"></ns-radio>
          </ns-form-item>
          <ns-form-item>
            <ns-button @click="submit" type="primary">submit</ns-button>
            <ns-button @click="reset">reset</ns-button>
            <ns-button @click="clear">clear</ns-button>
          </ns-form-item>
        </ns-form>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      let checkAge = function(rule, value, callback) {
        let reg = /^\d+$/;
        if (!reg.test(value)) {
          callback(new Error('错了错了'));
        } else {
          callback();
        }
      };

      return {
        formData: {
          name: '周霞',  //input
          sex: 1,   //switch
          date: '2019-4-44', //datepicker
          time: '12:00:00',  //timepicker
          interest: ['1'],   // checkbox
          belong: '3',  //radio
          zone: '130000',  //select
          area: [1, 11, 111], //cascader
        },
        formVData: {
          name: '',
          age: '1',
          belong: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],

          age: [
            { validator: checkAge, trigger: 'blur' },
          ],

          belong: [
            { required: true, message: '请选择部门', trigger: 'change' },
          ],
        },
        iOptions: [
          { value: '1', label: '打球' },
          { value: '2', label: '看球' },
          { value: '3', label: '飞球' },
          { value: '4', label: '飞飞球' },
          { value: '5', label: '飞飞飞飞球' },
          { value: '6', label: '飞飞飞飞飞飞球' },
          { value: '7', label: '飞飞飞飞飞飞飞飞球' },
        ],
        bOptions: [
          { value: '1', label: '财务部' },
          { value: '2', label: '总裁办' },
          { value: '3', label: '研发中心' },
        ],
        sOptions: [
          { value: '130000', label: '浙江' },
          { value: '140000', label: '浙1江' },
          { value: '150000', label: '浙江1' },
        ],
        options: [
          {
            label: '浙江', value: 1, children: [
              {
                label: '杭州', value: 11, children: [
                  { label: '滨江区', value: 111 },
                  { label: '下城区', value: 112 },
                  { label: '江干区', value: 113 },
                ],
              },
            ],
          },
        ],
      };
    },
    computed: {},
    created() {

    },
    methods: {
      reset: function() {
        this.$refs.checkVForm.resetFields();
      },

      submit: function() {
        this.$refs.checkVForm.validate(validate => {
          console.log('form-validate', validate);
        });
      },

      clear: function() {
        this.$refs.checkVForm.clearValidate();
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
