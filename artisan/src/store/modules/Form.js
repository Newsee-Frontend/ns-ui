import { optionsDataTemplateService } from '../../service/Form/options-data-template';

const Form = {
  state: {
    optionsDataTemplate: [],
  },
  mutations: {
    SET_OPTIONS_DATA_TEMPLATE: (state, data) => {
      state.optionsDataTemplate = data;
    },
  },
  actions: {
    generateOptionsDataTemplate({ commit }, data) {
      optionsDataTemplateService({ query: data }).then(res => {
        const options = res.resultData || [];
        commit('SET_OPTIONS_DATA_TEMPLATE', options);
      });
    },
  },
};
export default Form;
