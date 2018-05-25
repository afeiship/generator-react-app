'use strict';
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yosay = require('yosay');
const yoHelper = require('yeoman-generator-helper');
const Generator = require('yeoman-generator');

const MIXIN_END = '/*===mixins end===*/';
const MIXIN_PATH = './src/components/mixins';
const nx = require('next-js-core2');
require('next-camelize');

module.exports = class extends Generator {
  prompting(){
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-fei-nodejs') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'mixin_name',
      message: 'Your mixin_name?'
    }];

    this.ROOT_PATH = process.cwd();
    return this.prompt(prompts).then( (props) => {
      this.props = props;
    });
  }

  writing () {
    yoHelper.rewriteProps(this.props);
    this._writingJsFile();
    // this._updateIndexJs();
  }

  _writingJsFile () {
    this.fs.copyTpl(
      this.templatePath('template.js'),
      this.destinationPath(`${MIXIN_PATH}/${this.props.mixin_name}.js`),
      this.props
    );
  }

  _updateIndexJs(){
    const {mixin_name,mixinName} = this.props;
    const indexJs = `${this.ROOT_PATH}/src/components/scripts/index.js`;
    let fileStr = fs.readFileSync(indexJs,'utf-8');
    fileStr = fileStr.replace(
      MIXIN_END,
      `export const ${nx.camelize('_' + mixinName)}Mixin=require('mixins/${mixin_name}').default;\r\n${MIXIN_END}`
    );
    fs.writeFileSync(indexJs,fileStr);
  }
};
