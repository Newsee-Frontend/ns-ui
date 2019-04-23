/**
 * Compile components
 */
const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');
const compiler = require('@vant/compiler');


const esDir = path.resolve('./es');
const libDir = path.resolve('./lib');
const srcDir = path.resolve('./src');

const compilerOption = {
  babel: {
    configFile: path.resolve(__dirname, '../babel.config/babel.config.js')
  }
};

const isDir = dir => fs.lstatSync(dir).isDirectory();
const isJs = path => /\.js$/.test(path);
const isSfc = path => /\.vue$/.test(path);
const isCode = path => !/(demo|test|\.md)$/.test(path);

function compile(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    // remove unnecessary files
    if (!isCode(file)) {
      return fs.removeSync(filePath);
    }

    // scan dir
    if (isDir(filePath)) {
      return compile(filePath);
    }

    // compile sfc
    if (isSfc(file)) {
      const source = fs.readFileSync(filePath, 'utf-8');
      fs.removeSync(filePath);

      const jsPath = filePath.replace('.vue', '.js');
      const vuePath = filePath + '.js';
      const output = fs.existsSync(jsPath) ? vuePath : jsPath;

      return fs.outputFileSync(output, compiler(source, compilerOption).js);
    }

    // compile js
    if (isJs(file)) {
      const {code} = babel.transformFileSync(filePath, compilerOption.babel);
      fs.outputFileSync(filePath, code);
    }
  });
}

// clear dir
fs.emptyDirSync(esDir);
fs.emptyDirSync(libDir);

// compile es dir
fs.copySync(srcDir, esDir);
compile(esDir);

// compile src dir
process.env.BABEL_MODULE = 'commonjs';
fs.copySync(srcDir, libDir);
compile(libDir);




