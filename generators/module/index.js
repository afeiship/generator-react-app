'use strict';
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yosay = require('yosay');
const yoHelper = require('yeoman-generator-helper');
const Generator = require('yeoman-generator');

const MODULE_PATH = './src/modules';
const HTMLWEBPACKPLUGIN_VENDORS = '<%= htmlWebpackPlugin.options.data.vendors %>';
module.exports = class extends Generator {
  prompting(){
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-fei-nodejs') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'module_name',
      message: 'Your module_name?'
    }];

    this.ROOT_PATH = process.cwd();
    return this.prompt(prompts).then( (props) => {
      this.props = props;
    });
  }

  writing () {
    yoHelper.rewriteProps(this.props);
    this.props.HTMLWEBPACKPLUGIN_VENDORS = HTMLWEBPACKPLUGIN_VENDORS;
    this._writingFiles();
  }

  _writingFiles () {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(`${MODULE_PATH}/${this.props.module_name}/`),
      this.props
    );
  }

  install () {
    console.log('Use `yarn install`');
  }
};
