'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const { resolve } = require('path');
const yosay = require('yosay');
const nx = require('next-js-core2');
const yoHelper = require('yeoman-generator-helper');
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
    console.log(
      chalk.green(
        figlet.textSync('config', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
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
