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

    // Show Hello message:
    console.log(
      chalk.green(
        figlet.textSync('mixin', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  }

  prompting() {
    const directory = nx.get(this._config, 'dirs.mixins');
    // Have Yeoman greet the user.
    this.option('dir', {
      type: String,
      alias: 'd',
      description: 'Your mixin base dir',
      default: directory || './src/components/mixins'
    });

    const prompts = [
      {
        type: 'input',
        name: 'mixin_name',
        message: 'Your mixin_name?'
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
        yoHelper.rename(this, 'index', this.props.mixin_name);
        this.fs.copy(
          glob.sync(resolve(cachePath, 'src/mixin/index.js')),
          this.destinationPath(resolve(dest))
        );
        done();
      }.bind(this)
    );
  }
};
