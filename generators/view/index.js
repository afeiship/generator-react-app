'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const { join, resolve } = require('path');
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
        figlet.textSync('view', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  }

  prompting() {
    const viewsDir = nx.get(this._config, 'dirs.views');
    const prefix = nx.get(this._config, 'prefix');
    // Have Yeoman greet the user.
    this.option('dir', {
      type: String,
      alias: 'd',
      description: 'Your component base dir',
      default: viewsDir || './src/components/views'
    });

    this.option('prefix', {
      type: String,
      alias: 'p',
      description: 'Your component prefix',
      default: prefix || ''
    });

    const prompts = [
      {
        type: 'input',
        name: 'component_name',
        message: 'Your component_name?'
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    const done = this.async();
    const prefix = this.options.prefix;
    remote(
      'afeiship',
      'boilerplate-react-app',
      function(err, cachePath) {
        // copy files:
        const dest = resolve(
          this.options.dir,
          prefix + this.props.component_name
        );
        this.fs.copy(
          glob.sync(resolve(cachePath, 'src/view/*')),
          this.destinationPath(dest)
        );
        done();
      }.bind(this)
    );
  }

  end() {
    const { component_name } = this.props;
    const viewsDir = this.options.dir;
    const prefix = this.options.prefix;
    const files = glob.sync(join(this.destinationPath(), viewsDir, '{**,.*}'));
    replaceInFile.sync({
      files,
      from: [/component-name/g],
      to: [prefix + component_name]
    });
  }
};
