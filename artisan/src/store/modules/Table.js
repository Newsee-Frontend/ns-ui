import { listColumnService, tableDataService } from '../../service/Table';

const Table = {
  state: {
    tableHead: [],
    tableData: [],
  },
  mutations: {
    SET_TABLE_HEAD: (state, data) => {
      state.tableHead = data;
    },

    SET_TABLE_DATA: (state, data) => {
      state.tableData = data;
    },
  },
  actions: {
    generateTableHead({ commit }, query) {
      return listColumnService({ funcId: 'funcId' }, query).then(res => {
        const head = res.resultData.columns || [];
        console.log('请求到的表头数据：');
        console.log(head);
        commit('SET_TABLE_HEAD', head);
      });
    },

    generateTableData({ commit }, data) {
      return tableDataService(data).then(res => {
        const data = res.resultData.list || [];
        console.log('请求到的表格数据：');
        console.log(data);
        commit('SET_TABLE_DATA', data);

      });
    },
  },
};
export default Table;
