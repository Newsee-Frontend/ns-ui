import cloneDeep from 'lodash/cloneDeep'
export default {
  data() {
    return {
      forMenuConfig: {
        body: {
          options: [
            [
              { code: 'fillSelect', name: '按所选值向下填充', visible: true, disabled: false },
            ],
          ],
        },
        visibleMethod: this.visibleMethod
      },

      renderColInclude: [
        'input',
        'select',
        'inputNumber',
        'checkbutton',
        'radiobutton',
        'date',
        'time',
        'datetime',
        'slot',
      ],
    };
  },

  computed: {
    menuConfig() {
      return this.isHugeData ? {} : this.forMenuConfig;
    },
  },


  methods: {
    /**
     * 权限控制
     * @param options
     * @param column
     */
    visibleMethod( {options, column})  {
      let editConfig = column?.editRender?.props?.column['cell-Config'] || {}
      let slotConfig = column.params?.['slot-Config'] || {}
      let config = {...editConfig, ...slotConfig}
      options.flat().forEach( i => {
        if(i.code === "fillSelect"){
          i.visible = this.renderColInclude.includes(editConfig.type) && !config.disabled
        }
      })

      return true
    },

    /**
     * 当点击快捷菜单时会触发该事件
     * @param menu
     * @param row
     * @param column
     */
    menuClick({ menu, row, column }){
      switch (menu.code){
        case "fillSelect": {
          let startIndex = this.data.findIndex( i => i._XID === row._XID)
          for (let i = startIndex + 1 ; i < this.data.length; i++){
            this.data[i][column.property] = cloneDeep( row[column.property])
          }
          break
        }
        default:
          break
      }
      console.log( menu, row, column)
    }
  },
};
