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
      Object.assign(keyRefer, this.keyRefer)
      list.forEach((item) => {
        //设置树对应的字段
        Object.keys(keyRefer).forEach( key => {
          let hitKey = keyRefer[key];
          this.$set(item, key, item[hitKey]);
        });

        //增加 checked  halfcheck 属性
         this.$set(item, 'checked', false);
         this.$set(item, 'halfcheck', false);

         //默认全部节点展开的情况
         if(this.expandAllNodes){
           this.$set(item, 'expanded',true);
         }

        if(item.children && item.children.length > 0){
          this.transformKeyFun(item.children)
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
