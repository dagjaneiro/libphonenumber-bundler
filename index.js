var path = require('path');
var program = require('commander');
var pkg = require( path.join(__dirname, 'package.json') );
var request = require('request');

var lpnRepository = {
  tagsUrl: 'https://api.github.com/repos/googlei18n/libphonenumber/tags',
  rawUrl: 'https://raw.githubusercontent.com/googlei18n/libphonenumber/{tag_name}/javascript/i18n/phonenumbers/{filename}.js',
  files: ['asyoutypeformatter', 'metadata', 'phonemetadata.pb', 'phonenumber.pb', 'phonenumberutil'],
  tag: 'master'
};

lpnRepository.prototype.getFileList = function () {
  var links = "";
  files.forEach(function (filename) {
    links += rawUrl.replace('{tag_name}', this.tag).replace('{filename}', filename) + '\n';
  });
};


program.version(pkg.version);

program
  .command('list')
  .description('List all libphonenumber versions')
  .action(function () {

    request({
      method: 'GET',
      headers: {
        'User-Agent': 'request'
      },
      url: 'https://api.github.com/repos/googlei18n/libphonenumber/tags',
}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        result.forEach(function (item) {
          console.log(item.name);
        });
      } else {
        console.log(response.statusCode);
      }
    });
  });



program.parse(process.argv);