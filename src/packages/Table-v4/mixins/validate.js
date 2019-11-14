export default {
  props: {
    rulesConfig: { type: Array },
  },
  data() {
    return {};
  },
  computed: {
    validRules() {
      const obj = {};

      this.head
        .filter(column => column[this.headRefer['cell-Config']])
        .forEach(col => {
          const formConfig = col[this.headRefer['cell-Config']];
          const label = col[this.headRefer['label']];
          const modelCode = col[this.headRefer['model-key']];

          if (formConfig.require) {
            obj[modelCode] = [{ required: true, message: `请输入/选择${label}` }];
          }

          if (formConfig.validateRule) {
            //生成正则
            const pattern = this.getPattern(formConfig.validateRule, this.rulesConfig);

            const config = {
              message: formConfig.errorMsg,
              trigger: 'change',
            };

            if (pattern) {
              config.pattern = pattern;
            }

            if (obj[modelCode]) {
              obj[modelCode].push(config);
            } else {
              obj[modelCode] = [config];
            }
          }
        });

      return obj;
    },
  },
  methods: {
    getPattern(type, rules = []) {
      if (!rules || !rules.length) return '';
      if (!type) return '';
      const target = this.rulesConfig.filter(rule => rule.type === type);
      if (target && target.length) {
        return target[0].ruleReg;
      }

      return '';
    },
  },
};
