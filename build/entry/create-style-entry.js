const fs = require('fs-extra');
const path = require('path');
const uppercamelize = require('uppercamelcase');
const Components = require('../components/get-components')();
const packageJson = require('../../package.json');
const utils = require('../utils/index');

const version = process.env.VERSION || packageJson.version;

const tips = `/*
 * style entry for UI
 * created: ${utils.sysdate()}.
 * version: ${version}.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) Broccoli spring( gcx )
 * ------------------------------------------
 */
`;

/**
 * build all components style entry file
 */
function buildAllComponentsStyleEntry(ext = '') {
  const uninstallComponents = [
    'Lazyload',
    '.DS_Store',
  ];

  const needIntallList = Components.filter(name => !~uninstallComponents.indexOf(uppercamelize(name)));

  //import list template
  const base = `@import './style/base.scss';`;

  //import list template
  const importList = needIntallList.map(name => `@import './packages/${name}/style/index.css';`);


  const content = `${tips}
  
/**
 * Entry of all component's style
 */
${base}

${importList.join('\n')}
`;
  //write to file ，and create style entry file
  fs.writeFileSync(path.resolve(`./src/index${ext}`), content);
}

buildAllComponentsStyleEntry('.scss');
