/*
* Created by Broccoli spring( gcx ) on 2018/1/15.
* register data for mock.
*/
import Mock from 'mockjs'
import sw from '@/switch'

Mock.setup({
  timeout: '350-600'
});


import tableHead from './components/tableHead'
import tableData from './components/tableData'


let registerList = [
  {url: /\/system\/column\/list-column/, method: 'get', target: tableHead.tableHead, remarks: 'get table head'},
  {url: /\/table\/tableData\/normal/, method: 'post', target: tableData.normal_tableData, remarks: 'get table data'},
  {url: /\/table\/tableData\/fnsclick/, method: 'post', target: tableData.fnsclick_tableData, remarks: 'get fnsclick table data'},
];


if (sw['local-debug']) {
  registerList.forEach((item, index) => {
    Mock.mock(item.url, item.method, item.target);
  })
}

export default Mock;
