'use strict';
const chalk = require('chalk');
const { resolve } = require('path');
const yosay = require('yosay');
const Generator = require('yeoman-generator');
const remote = require('yeoman-remote');
const glob = require('glob');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this._config = this.config.getAll();
  }

  prompting() {
    // Show Hello message:
    this.log(yosay('Welcome to the striking ' + chalk.red('generator .yo-rc.json') + ' file!'));
  }

  writing() {
    const done = this.async();
    remote('afeiship', 'boilerplate-react-app', (_, cachePath) => {
      // copy files:
      this.fs.copy(glob.sync(resolve(cachePath, 'src/config/.yo-rc.json')), this.destinationPath());
      done();
    });
  }
};
