const fs = require('fs-extra');
const path = require('path');
const uppercamelize = require('uppercamelcase');
const utils = require('../utils/index');
const Components = require('../components/get-components')();
const packageJson = require('../../package.json');

/**
 * build component entry file
 * @param component
 * @param dir
 */
function baseCompile(component, dir) {

  const importVueTemp = () => `import _${uppercamelize(component)} from './${component}';`;
  const importStyleTemp = () => `import './style/index.css';`;
  const exportTemp = () => `export default _${uppercamelize(component)};`;

  const content = `${utils.tips(packageJson.author)}
  
${importVueTemp()}

${importStyleTemp()}

${exportTemp()}`;

  fs.writeFileSync(path.resolve(

    `./${dir}/packages/${component}/index.js`),

    content
  );
}


/**
 * build every component entry file
 * @param dir
 */
function buildComponentEntry(dir) {

  Components.forEach(component => {

    //build every component entry file
    baseCompile(component, dir);

  });
}

// compile components entry file by src dir
buildComponentEntry('lib');

buildComponentEntry('es');
