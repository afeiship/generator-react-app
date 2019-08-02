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
    // Have Yeoman greet the user.
    this.option('dir', {
      type: String,
      alias: 'd',
      description: 'Your component base dir',
      default: viewsDir || './src/components/views'
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
    remote(
      'afeiship',
      'boilerplate-react-app',
      function(err, cachePath) {
        // copy files:
        const dest = resolve(this.options.dir, this.props.component_name);
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
    const files = glob.sync(resolve(this.destinationPath(), '{**,.*}'));

    replaceInFile.sync({
      files,
      from: [/component-name/g],
      to: [component_name]
    });
  }
};
