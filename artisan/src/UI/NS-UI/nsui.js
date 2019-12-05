/*
 * load NS-UI basic components library
 * created: 2019/11/13.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2019 Broccoli spring( gcx )
 */

import Vue from 'vue';

import nsui from 'neap-ui/lib/ns-ui';
import 'neap-ui/lib/index.css';

Vue.use(nsui, {
  prefix: 'ns', //stage name
  tie: '-',
  log: false, //show log information
  type: 'globle',
});
