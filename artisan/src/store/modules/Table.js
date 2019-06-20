import { listColumnService } from '../../service/Table';

const Table = {
  state: {
    tableHead: [],
  },
  mutations: {
    SET_TABLE_HEAD: (state, data) => {
      state.tableHead = data;
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
  },
};
export default Table;
