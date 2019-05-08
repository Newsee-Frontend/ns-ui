<!--UI 组件库 - Popover - 页面测试-->
<template>
  <div class="popover-wrapper">
    <demo-block>
      <template slot="title">基础用法</template>
      <template slot="describe">激活方式不同（列举click）,触发 show, hide, after-leave, after-enter事件</template>
      <template slot="content">
        <div class="gap">
          <ns-popover
            v-model="showPopover"
            placement="top-start"
            title="标题"
            width="600"
            trigger="click"
            @show="show"
            @hide="hide"
            @after-leave="afterLeave"
            @after-enter="afterEnter"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <el-button slot="reference">click 激活</el-button>
          </ns-popover>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">嵌套信息</template>
      <template slot="describe">嵌套操作</template>
      <template slot="content">
        <ns-popover
          placement="top"
          width="160"
          v-model="showPopover1">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="showPopover1 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="showPopover1 = false">确定</el-button>
          </div>
          <el-button slot="reference">删除</el-button>
        </ns-popover>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        showPopover: false,
        showPopover1: false
      };
    },
    computed: {},
    created() {

    },
    methods: {
      show: function(){
        console.log('show')
      },
      hide: function(){
        console.log('hide')
      },
      afterLeave: function(){
        console.log('afterLeave')
      },
      afterEnter: function(){
        console.log('afterEnter')

      }

    },
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
