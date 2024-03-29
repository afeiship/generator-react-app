'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const { resolve } = require('path');
const nx = require('@jswork/next');
const yoHelper = require('@jswork/yeoman-generator-helper');
const Generator = require('yeoman-generator');
const glob = require('glob');
const genp = require('@jswork/generator-prompts');

require('@jswork/next-date');

module.exports = class extends Generator {
  get defaults() {
    return {
      created_at: nx.Date.format(null),
      author: this.user.git.name(),
      email: this.user.git.email()
    };
  }

  get iopts() {
    return this.config.get('hook');
  }

  get cmpOts() {
    return this.config.get('component');
  }

  constructor(args, options) {
    super(args, options);
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
    const { components_dir, export_type, file_type, prefix } = this.cmpOts;
    this.option('components_dir', {
      type: String,
      description: 'Your base dir?',
      default: components_dir || '.'
    });

    this.option('prefix', {
      type: String,
      description: 'Your component prefix',
      default: prefix || ''
    });

    this.option('export_type', {
      type: String,
      description: 'Your exports type(const/default)?',
      default: export_type || 'const'
    });

    this.option('file_type', {
      type: String,
      description: 'Your file type(tsx/jsx/ts/js)?',
      default: file_type || 'tsx'
    });

    const prompts = genp(['hook_name', 'description']);
    return this.prompt(prompts).then((props) => {
      const { prefix } = this.iopts;
      const hook_name = [prefix, props.hook_name].filter(Boolean).join('');
      this.props = { ...props, ...this.defaults, hook_name };
    });
  }

  writing() {
    const ctx = yoHelper.ctx;
    const { hook_name } = this.props;
    const { components_dir, export_type, file_type } = this.iopts;
    const tmplPath = this.templatePath();
    const dest = resolve(components_dir);
    const filename = `${export_type}.${file_type}`;
    const dstFilename = `${hook_name}/index.${file_type}`;

    this.fs.copyTpl(
      glob.sync(resolve(tmplPath, file_type, filename)),
      this.destinationPath(resolve(dest)),
      { ...this.props, ctx }
    );

    this.fs.move(
      resolve(this.destinationPath(dest), filename),
      resolve(this.destinationPath(dest), dstFilename)
    );
  }
};
