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

  constructor(args, options) {
    super(args, options);
    console.log(
      chalk.green(
        figlet.textSync('component', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  }

  prompting() {
    const { components_dir, component_type, export_type, file_type, prefix } = this.config.get(
      'component'
    );

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

    this.option('component_type', {
      type: String,
      description: 'Your component_type(classify/functional)?',
      default: component_type || 'functional'
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

    const prompts = genp(['component_name', 'description']);

    return this.prompt(prompts).then((props) => {
      const { prefix } = this.config.get('component');
      const component_name = [prefix, props.component_name].filter(Boolean).join('');
      this.props = { ...props, ...this.defaults, component_name };
      yoHelper.rewriteProps(this.props, {
        exclude: ['description', 'author', 'email', 'created_at']
      });
    });
  }

  writing() {
    const { component_name } = this.props;
    const { components_dir, component_type, export_type, file_type } = this.config.get('component');
    const tmplPath = this.templatePath();
    const dest = resolve(components_dir);
    const filename = `${component_type}.${export_type}.${file_type}`;
    const dstFilename = `${component_name}/index.${file_type}`;

    this.fs.copyTpl(
      glob.sync(resolve(tmplPath, file_type, filename)),
      this.destinationPath(resolve(dest)),
      this.props
    );

    this.fs.move(
      resolve(this.destinationPath(dest), filename),
      resolve(this.destinationPath(dest), dstFilename)
    );
  }
};
