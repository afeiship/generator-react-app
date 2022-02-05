'use strict';
const chalk = require('chalk');
const yosay = require('yosay');
const Generator = require('yeoman-generator');
const globby = require('globby');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this._config = this.config.getAll();
  }

  prompting() {
    this.log(yosay('Welcome to the striking ' + chalk.red('generator .yo-rc.json') + ' file!'));
  }

  writing() {
    const srcFiles = globby.sync(this.templatePath('**'), { dot: true });
    const dstPath = this.destinationPath();
    this.fs.copy(srcFiles, dstPath);
  }
};
