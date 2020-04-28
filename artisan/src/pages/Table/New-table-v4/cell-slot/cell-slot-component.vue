<template>
  <div class="cell-slot-component">
    <template v-if="isRender">
      <span>{{`${scope.row.customSlot}的插槽 - ${isChk?'偶数行':'奇数行'}` }} </span>
      <ns-button :type="btnType"
                 :icon="isChk?'el-icon-edit':'el-icon-share'"
                 @click="slotClick(scope)"
      >点击
      </ns-button>
    </template>
    <span v-else>我是默认单元格值</span>
  </div>
</template>

<script>
  export default {
    name: 'cell-slot-component',
    props: {
      scope: { Type: Object },
    },
    data() {
      return {
        btnTypeMap: {
          0: 'primary',
          1: 'success',
          2: 'warning',
          3: 'danger',
          4: 'info',
          5: '',
        },
      };
    },
    computed: {
      isRender() {
        return this.scope && this.scope.rendered;
      },
      isChk() {
        return this.scope.rowIndex % 2 === 0;
      },
      btnType() {
        return this.btnTypeMap[this.scope.rowIndex % 6];
      },
    },

    methods: {
      /**
       * 插槽单元格点击事件
       * @param row
       * @param column¬
       * @param data
       * @param columns
       * @param rowIndex
       * @param columnIndex
       */
      slotClick({ row, column, data, columns, rowIndex, columnIndex }) {
        console.log('插槽单元格点击事件 - 插槽单元格点击事件');
        console.log(row);
        console.log(column);
        console.log(data);
        console.log(columns);
        console.log(rowIndex);
        console.log(columnIndex);
      },

    },
  };
</script>

<style scoped>

</style>
