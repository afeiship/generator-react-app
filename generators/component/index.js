'use strict';
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yosay = require('yosay');
const yoHelper = require('yeoman-generator-helper');
const Generator = require('yeoman-generator');

const COMPONENTS_END = '/*===components end===*/';
const COMPONENT_PATH = './src/components';

module.exports = class extends Generator {
  prompting(){
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-fei-nodejs') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'component_name',
      message: 'Your component_name?'
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
  }

  _writingJsFile () {
    this.fs.copyTpl(
      this.templatePath('template.js'),
      this.destinationPath(`${COMPONENT_PATH}/scripts/${this.props.component_name}.js`),
      this.props
    );
  }

  _writingScssFile () {
    this.fs.copyTpl(
      this.templatePath('template.scss'),
      this.destinationPath(`${COMPONENT_PATH}/styles/components/${this.props.component_name}.scss`),
      this.props
    );
  }

  _updateIndexJs(){
    const {component_name,ComponentName} = this.props;
    const indexJs = `${this.ROOT_PATH}/src/components/scripts/index.js`;
    let fileStr = fs.readFileSync(indexJs,'utf-8');
    fileStr = fileStr.replace(
      COMPONENTS_END,
      `export const ${ComponentName}=require('./${component_name}').default;\r\n${COMPONENTS_END}`
    );
    fs.writeFileSync(indexJs,fileStr);
  }

  install () {
    console.log('Use `yarn install`');
  }
};
