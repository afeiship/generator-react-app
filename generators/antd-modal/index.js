'use strict';
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yosay = require('yosay');
const yoHelper = require('yeoman-generator-helper');
const Generator = require('yeoman-generator');

const MODAL_APP_END = '{/*<MODAL_END />*/}';
const MODAL_END = '/*===modals end===*/';
const MODAL_PATH = './src/components/modals';
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
      name: 'modal_name',
      message: 'Your modal_name?'
    }];

    this.ROOT_PATH = process.cwd();
    return this.prompt(prompts).then( (props) => {
      this.props = props;
    });
  }

  writing () {
    yoHelper.rewriteProps(this.props);
    this._writingJsFile();
    this._writingScssFile();
    this._updateIndexJs();
    this._updateAppsJs();
  }

  _writingJsFile () {
    this.fs.copyTpl(
      this.templatePath('template.js'),
      this.destinationPath(`${MODAL_PATH}/${this.props.modal_name}.js`),
      this.props
    );
  }


  _writingScssFile() {
    this.fs.copyTpl(
      this.templatePath('template.scss'),
      this.destinationPath(`${this.ROOT_PATH}/src/assets/styles/components/${this.props.modal_name}.scss`),
      this.props
    );
  }

  _updateIndexJs() {
    const { modal_name, modalName } = this.props;
    const indexJs = `${this.ROOT_PATH}/src/components/index.js`;
    let fileStr = fs.readFileSync(indexJs, 'utf-8');
    fileStr = fileStr.replace(
      MODAL_END,
      `export const ${nx.camelize('_' + modalName)}Mixin=require('modals/${modal_name}').default;\r\n${MODAL_END}`
    );
    fs.writeFileSync(indexJs, fileStr);
  }


  _updateAppsJs() {
    const { modal_name, ModalName } = this.props;
    const appJs = `${this.ROOT_PATH}/src/app.js`;
    let fileStr = fs.readFileSync(appJs, 'utf-8');
    fileStr = fileStr.replace(
      MODAL_APP_END,
      `<${ModalName} />\r\n${MODAL_APP_END}`
    );
    fs.writeFileSync(appJs, fileStr);
  }
};
