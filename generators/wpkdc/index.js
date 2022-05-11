'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const globby = require('globby');
const yoHelper = require('@jswork/yeoman-generator-helper');
const getp = require('@jswork/generator-prompts');
const prompts = getp(['project_name']);
const ctx = yoHelper.ctx;

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the stunning 'oclif-single' generator!`));
    this.props = await this.prompt(prompts);
  }

  writing() {
    const srcFiles = globby.sync(this.templatePath('**'), { dot: true });
    const dst = this.destinationPath();
    this.fs.copyTpl(srcFiles, dst, { ...this.props, ctx });
    this.__extendJSON();
  }

  install() {
    console.log('ignore installing.');
  }

  __extendJSON() {
    const pkgJson = {
      scripts: {
        'wpkdc:js': 'wpkdc',
        'wpkdc:css': 'wpkdc -t=css'
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    console.log('\nnpm i -D @jswork/craco-plugin-dll-refs');
  }
};
