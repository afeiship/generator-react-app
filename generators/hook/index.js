'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const { resolve } = require('path');
const nx = require('@jswork/next');
const yoHelper = require('@jswork/yeoman-generator-helper');
const Generator = require('yeoman-generator');
const remote = require('yeoman-remote');
const glob = require('glob');

require('@jswork/next-date');
require('@jswork/next-join');

module.exports = class extends Generator {
  get defaults() {
    return {
      created_at: nx.Date.format(null),
      author: this.user.git.name(),
      email: this.user.git.email()
    };
  }

  constructor(args, options) {
    super(args, options);
    this._config = this.config.getAll();
    console.log(
      chalk.green(
        figlet.textSync('hook', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  }

  prompting() {
    const { components_dir, export_type, file_type, prefix } = this._config.component;

    this.option('components_dir', {
      type: String,
      description: 'Your base dir?',
      default: components_dir || '.'
    });

    this.option('prefix', {
      type: String,
      description: 'Your component prefix',
      default: prefix
    });

    this.option('export_type', {
      type: String,
      description: 'Your exports type(const/default)?',
      default: export_type || 'const.'
    });

    this.option('file_type', {
      type: String,
      description: 'Your file type(tsx/jsx/ts/js)?',
      default: file_type || 'tsx.'
    });

    const prompts = [
      {
        type: 'input',
        name: 'hook_name',
        message: 'Your hook_name(ng-button)?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your description?'
      }
    ];

    return this.prompt(prompts).then((props) => {
      const { prefix } = this._config.hook;
      const hook_name = nx.join([prefix, props.hook_name], '');
      this.props = { ...props, ...this.defaults, hook_name };
      yoHelper.rewriteProps(this.props, {
        exclude: ['description', 'author', 'email', 'created_at']
      });
    });
  }

  writing() {
    const done = this.async();
    const { hook_name } = this.props;
    const { components_dir, export_type, file_type } = this._config.hook;
    remote('afeiship', 'boilerplate-react-app', async (_, cachePath) => {
      const dest = resolve(components_dir);
      const filename = `${export_type}.${file_type}`;
      const dstFilename = `${hook_name}/index.${file_type}`;

      this.fs.copyTpl(
        glob.sync(resolve(cachePath, `src/hook/${file_type}`, filename)),
        this.destinationPath(resolve(dest)),
        this.props
      );

      this.fs.move(
        resolve(this.destinationPath(dest), filename),
        resolve(this.destinationPath(dest), dstFilename)
      );

      done();
    });
  }
};
