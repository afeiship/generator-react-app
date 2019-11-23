'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const { resolve } = require('path');
const yosay = require('yosay');
const nx = require('@feizheng/next-js-core2');
const yoHelper = require('@feizheng/yeoman-generator-helper');
const Generator = require('yeoman-generator');
const remote = require('yeoman-remote');
const replaceInFile = require('replace-in-file');
const glob = require('glob');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this._config = this.config.getAll();

    // Show Hello message:
    console.log(
      chalk.green(
        figlet.textSync('service', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  }

  prompting() {
    const directory = nx.get(this._config, 'dirs.services');
    // Have Yeoman greet the user.
    this.option('dir', {
      type: String,
      alias: 'd',
      description: 'Your service base dir',
      default: directory || './src/components/services'
    });

    const prompts = [
      {
        type: 'input',
        name: 'service_name',
        message: 'Your service_name?'
      }
    ];

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
        const dest = resolve(this.options.dir);
        yoHelper.rename(this, 'index', this.props.service_name);
        this.fs.copy(
          glob.sync(resolve(cachePath, 'src/service/index.js')),
          this.destinationPath(resolve(dest))
        );
        done();
      }.bind(this)
    );
  }
};
