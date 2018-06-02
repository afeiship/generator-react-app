'use strict';
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yosay = require('yosay');
const yoHelper = require('yeoman-generator-helper');
const Generator = require('yeoman-generator');

const SERVICE_END = '/*===services end===*/';
const SERVICE_PATH = './src/components/services';

module.exports = class extends Generator {
  prompting(){
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-fei-nodejs') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'service_name',
      message: 'Your service_name?'
    }];

    this.ROOT_PATH = process.cwd();
    return this.prompt(prompts).then( (props) => {
      this.props = props;
    });
  }

  writing () {
    yoHelper.rewriteProps(this.props);
    console.log(this.props);
    this._writingJsFile();
    this._updateIndexJs();
  }

  _writingJsFile () {
    this.fs.copyTpl(
      this.templatePath('template.js'),
      this.destinationPath(`${SERVICE_PATH}/${this.props.service_name}.js`),
      this.props
    );
  }

  _updateIndexJs(){
    const {service_name,serviceName} = this.props;
    const indexJs = `${this.ROOT_PATH}/src/components/index.js`;
    let fileStr = fs.readFileSync(indexJs,'utf-8');
    fileStr = fileStr.replace(
      SERVICE_END,
      `export const $${serviceName}=require('services/${service_name}').default;\r\n${SERVICE_END}`
    );
    fs.writeFileSync(indexJs,fileStr);
  }
};
