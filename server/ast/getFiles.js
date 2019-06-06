const glob = require('glob');
const traverseFiles = require('./traverseFiles');

glob('../samples/todo/?(App.js)', astInit);

function astInit(err, files) {
  files.forEach(file => {
    traverseFiles(file);
  });
}