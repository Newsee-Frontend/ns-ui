<!--UI 组件库 - Select-tree loadOptions - 页面测试-->
<template>
  <demo-block>
    <template slot="title">loadOptions 事件示例用法</template>
    <template slot="describe">涉及到 1、下拉获取数据, 2、按需获取子节点数据 3、异步搜索生成数据 三种事件状态</template>
    <template slot="content">
      <!--1、下拉菜单后请求-->
      <h2>1、Load root options 下拉菜单后，再操作获取options数据</h2>
      <p class="describe">
        使用需要注意以下几点：<br/>
        1、options属性的值初始必须为null.<br/>
        2、auto-load-root-options 属性必须设置为 false.<br/>
        3、绑定对应的函数进行操作<br/>
        4、返回回调callback()
      </p>
      <ns-select-tree
        v-model="selectTreeModel1"
        :options="initOptions"
        size="medium"
        :multiple="true"
        :auto-load-root-options="autoLoadRootOptions"
        @load-root-options='loadRootOptions'
      >
      </ns-select-tree>

      <!--2、Delayed Loading 延迟加载-->
      <h2>2、Delayed Loading 延迟加载获取数据</h2>
      <p class="describe">
        使用需要注意以下几点：<br/>
        1、options中按需加载的节点其 children 子节点属性的值初始必须为null。<br/>
        2、绑定对应的函数进行操作。<br/>
        3、可获取 parentNode 信息，根据信息内容进行相关操作。<br/>
        4、成功返回回调callback()，失败回调 callback(new Error('msg')); 其中 msg 文字报错内容可自行确定，将会显示在按需加载的节点下方。<br/>
      </p>
      <ns-select-tree
        v-model="selectTreeModel2"
        :options="selectTreeOptions"
        size="medium"
        :multiple="true"
        @load-children-options='loadChildrenOptions'
      >
      </ns-select-tree>

      <!--3、异步搜索-->
      <h2>3、Async Searching 异步搜索 - 生成options</h2>
      <p class="describe">
        使用需要注意以下几点：<br/>
        1、async属性的值初始必须为 true.<br/>
        2、searchable属性的值初始必须为 true.<br/>
        3、绑定对应的函数进行操作<br/>
        3、返回回调 callback(null, options);
      </p>
      <ns-select-tree
        v-model="selectTreeModel3"
        size="medium"
        :multiple="true"
        :async="true"
        :searchable="true"
        @async-search="asyncSearch"
      >
      </ns-select-tree>

    </template>
  </demo-block>
</template>

<script>
  import { mapGetters } from 'vuex';

  const AsyncOperation = fn => {
    setTimeout(fn, 2000);
  };

  export default {
    name: 'select-tree-demo-loadOptions',
    data() {
      return {
        selectTreeModel1: [],
        selectTreeModel2: [],
        selectTreeModel3: [],
        autoLoadRootOptions: false,
        initOptions: null,
      };
    },
    computed: {
      ...mapGetters(['selectTreeOptions']),
    },
    methods: {
      /**
       * 下拉菜单后，再操作获取options数据
       * @param callback
       */
      loadRootOptions({ callback }) {
        AsyncOperation(() => {
          this.initOptions = this.selectTreeOptions;
          callback();
        });
      },

      /**
       * Delayed Loading 延迟加载获取数据
       * @param parentNode
       * @param callback
       */
      loadChildrenOptions({ parentNode, callback }) {
        console.log(parentNode);
        if (parentNode.id === 'person-5') {
          AsyncOperation(() => {
            parentNode.children = [
              { id: 'person-5-1', label: 'Person 5-1 👳' },
              { id: 'person-5-2', label: 'Person 5-2 👧' },
              { id: 'person-5-3', label: 'Person 5-3 👳' },
              { id: 'person-5-4', label: 'Person 5-4 👧' },
            ];
            callback();
          });
        }
        else {
          AsyncOperation(() => {
            callback(new Error('Failed to load options: network error.'));
          });
        }
      },
      /**
       * 异步搜索 - 生成options
       * @param searchQuery
       * @param callback
       */
      asyncSearch({ searchQuery, callback }) {
        AsyncOperation(() => {
          const options = [1, 2, 3, 4, 5].map(i => ({
            id: `${searchQuery}-${i}`,
            label: `${searchQuery}-${i}`,
          }));
          callback(null, options);
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
