import Vue from 'vue'
//grid operation
import bussinessGrid from "./bussiness-grid/bussiness-grid";


const components = [
  //bussiness grid
  bussinessGrid,
];

//binding component
components.map((component, index) => {
  Vue.component(component.name, component)
});
