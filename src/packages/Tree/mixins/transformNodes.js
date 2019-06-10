const keyRefer = {
  id: 'id',
  children: 'children',
  title: 'title',
  disabled: 'disabled',
  isHasChild: 'isHasChild',
  expanded: 'expanded'
};



export default {
  props: {
    keyRefer: {
      type: Object,
      default: function(){
        return keyRefer;
      }
    }
  },

  methods: {
    /**
     * 转化数组 为树节点
     * @param list 原始数据
     * @param index  展开层级
     * @returns {*}  树节点数据
     */
    transformKeyFun: function(list, index){
      Object.assign(keyRefer, this.keyRefer);
      list.forEach((item) => {

        //设置树对应的字段
        Object.keys(keyRefer).forEach( key => {
          let hitKey = keyRefer[key];
          this.$set(item, key, item[hitKey]);
        });


         //默认全部节点展开的情况
         if(this.expandAllNodes){
           this.$set(item, 'expanded',true);
         }

         else if(index > 0 && !(this.lazy && item.isHasChild && item.children.length === 0)){
           index--;
           this.$set(item, 'expanded',true);
         }

        if(item.children && item.children.length > 0){
          this.transformKeyFun(item.children, index);
        }

        //树的懒加载
        else if(this.lazy && item.isHasChild){
          this.$set(item, 'async', true)
        }
      })
      return list;
    }
  }
}
