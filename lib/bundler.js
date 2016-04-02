const ccs = require('closure-compiler-service');
const github = require('octonode');
const client = github.client();

const bundler = {

  repo: 'googlei18n/libphonenumber',

  files: ['asyoutypeformatter', 'metadata', 'phonemetadata.pb', 'phonenumber.pb', 'phonenumberutil'],

  getFileList(tagName) {
    return this.files.map((file) => this.getLink(tagName, file));
  },

  getLink(tagName, filename) {
    return `https://raw.githubusercontent.com/googlei18n/libphonenumber/${tagName}/javascript/i18n/phonenumbers/${filename}.js`;
  },

  getTags() {
    return new Promise((resolve, reject) => {
     const ghrepo = client.repo(this.repo);
     ghrepo.tags((error, tags) => {
      if(error) {
        reject(error);
      } else {
        resolve(tags);
      }
    });
   });
  },

  findTag(tagName, tags) {
    tagName = isNaN(parseInt(tagName[0])) ? tagName : `libphonenumber-${tagName}`;
    const tagsFound = tags.filter((t) => t.name == tagName);
    return tagsFound.length > 0 && tagsFound[0].name;
  },

  getLatestTag(tags) {
    return tags && tags.length > 0 && tags[0].name;
  },

  compileVersion(tagName) {
    return new Promise((resolve, reject) => {
      ccs.compile(null, {
        use_closure_library: true,
        code_url: this.getFileList(tagName)
      }, function(errs, warns, code) {
        if(errs) {
          reject(errs);
        } else {
          resolve(code);
        }
      });
    });
  },

  getVersionInfo(tagName) {
    return `// Bundled libphonenumber [${tagName}] - Generated at ${new Date().toUTCString()}\n`
  }
};

module.exports = bundler;