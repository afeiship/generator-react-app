'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const { resolve } = require('path');
const yosay = require('yosay');
const nx = require('@jswork/next');
const yoHelper = require('@jswork/yeoman-generator-helper');
const Generator = require('yeoman-generator');
const remote = require('yeoman-remote');
const replaceInFile = require('replace-in-file');
const glob = require('glob');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this._config = this.config.getAll();
  }

  prompting() {
    // Show Hello message:
    this.log(
      yosay(
        'Welcome to the striking ' +
          chalk.red('generator .yo-rc.json') +
          ' file!'
      )
    );
  }

  writing() {
    const done = this.async();
    remote(
      'afeiship',
      'boilerplate-react-app',
      function(err, cachePath) {
        // copy files:
        this.fs.copy(
          glob.sync(resolve(cachePath, 'src/config/.yo-rc.json')),
          this.destinationPath()
        );
        done();
      }.bind(this)
    );
  }
};
