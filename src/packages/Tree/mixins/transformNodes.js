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
    transformKeyFun: function(list){
       list.forEach((item) => {
        //设置树对应的字段
        Object.keys(this.keyRefer).forEach( key => {
          let hitKey = this.keyRefer[key];
          this.$set(item, key, item[hitKey]);
        });

         //默认全部节点展开的情况
         if(this.expandAllNodes){
           item.expanded = true;
         }

        if(item.children.length > 0){
          this.transformKeyFun(item.children)
        }

        //树的懒加载
        else if(this.lazy && item.isHasChild){
          this.$set(item, 'async', true)
        }
      })
    }
  },

  watch: {
    data(list){
      this.transformKeyFun(list);
      return list
    },
  }
}
