<!--顶部栏目 右侧 头像操作模块-->
<template>
  <el-dropdown class="user-dropdown" :trigger="trigger" @visible-change="visibleChange">
    <section>
      <div class="user-abbreviation" v-if="abbreviation">{{simple}}</div>
      <img class="user-avatar" :src="avator" v-if="avator && !abbreviation"/>
      <span class="hello">{{ userName }}</span>
      <i :class="isopen?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
    </section>

    <el-dropdown-menu class="user-dropdown" slot="dropdown">

      <el-dropdown-item v-for="(opt, index) in options"
                        :key="index"
                        @click.native="click(opt.value,index)">
        {{opt.label}}
      </el-dropdown-item>

    </el-dropdown-menu>

  </el-dropdown>
</template>
<script>

  export default {
    name: 'user-dropdown',
    props: {
      userName: {type: [String, Number], default: '用户'},
      abbreviation: {type: Boolean, default: false},
      avator: {
        type: String,
        default: "'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'",
      },
      trigger: String,
      options: {
        type: Array, default() {
          return [];
        }
      },
    },
    computed: {
      simple() {
        return this.userName.substring(this.userName.length - 1, this.userName.length);
      }
    },
    data() {
      return {
        isopen: false,
      };
    },
    methods: {
      visibleChange(state) {
        this.isopen = state;
      },
      click(value, index) {
        this.$emit('click', value, index);
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
