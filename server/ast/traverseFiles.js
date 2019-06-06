const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  traverseElements = require('./traverseElements'),
  htmlElementsToIgnore = require('./util/htmlElements');

let apolloClientVar;

const appData = [];

// const filePath = path.join(__dirname, '..', 'samples', 'todo', 'App.js');
// const filePath = path.join(__dirname, '..', 'samples', 'todo', 'index.js');

const getFilePromisified = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) reject(err);
      resolve(file);
    });
  });
};

const reactComponents = [];

const traverseFiles = {
  default() {
    return async function findContent(file) {
      // search for ApolloClient declaration and copy body to apolloClientVar
      // first look for REACTDOM import to find if we're in the index.js file
      // first find the file that we want so we can read it
      const data = await getFilePromisified(file);
      const ast = parser.parse(data, {
        sourceType: 'module',
        plugins: [ 'jsx' ]
      });
      // findQuery(ast);
      findComponents(ast);

    };
  }
};

const findComponents = ast => {
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(path.node, {
        JSXElement(path) {
          if (!htmlElementsToIgnore[ path.node.openingElement.name.name ] && path.parent.type !== 'CallExpression') {
            // reactComponents.push(path.node.openingElement.name.name);
            reactComponents.push(path.node);
          }
        }
      }, path.scope, path.parent);
    }
  });
};

const findQueries = ast => {
  traverse(ast, {

  })
};

module.exports = traverseFiles.default();