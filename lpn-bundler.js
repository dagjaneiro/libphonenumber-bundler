#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const program = require('commander');
const pkg = require( path.join(__dirname, 'package.json') );
const promisify = require('es6-promisify');
const bundler = require('./lib/bundler');
const writeFile = promisify(fs.writeFile);
const stdout = process.stdout;


program
  .version(pkg.version)
  .option('-t, --tag <tag>', 'The tag version you want to bundle')
  .option('-o, --output <file>', 'The output file');

program
  .command('list')
  .description('List all libphonenumber versions')
  .action(() => {
    stdout.write('fetching tags...');
    bundler.getTags().then((tags) => {
      stdout.write('done\n\n');
      console.log('Versions available for bundling:\n');
      for(let t of tags) {
        console.log('  - ' + t.name);
      }
    });
  });

program
  .command('bundle')
  .description('[-t -o] Bundles a specific version of libphonenumber')
  .action(() => {
    let file;
    let tagName;
    stdout.write('fetching tags...');

    bundler.getTags().then((tags) => {
      stdout.write('done\n');
      tagName = program.tag ? bundler.findTag(program.tag, tags) : bundler.getLatestTag(tags);

      if(tagName) {
        stdout.write(`matched: [${tagName}]\n`);
        stdout.write('compiling code...');
        return bundler.compileVersion(tagName);
      } else {
        return Promise.reject('tag not found.');
      }

    }).then((code) => {
      stdout.write('done\n');
      stdout.write('saving file...');
      code = bundler.getVersionInfo(tagName) + code;
      file = program.output || 'libphonenumber-bundle.js';
      file = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
      return writeFile(file, code);
    }).then(() => {
      stdout.write('done\n');
      stdout.write(`file saved to ${file}\n`);
    }).catch((error) => {
      stdout.write(`${error}\n`);
    });
  });

program.parse(process.argv);
