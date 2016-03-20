#!/usr/bin/env node
'use strict';
var addCorsToCouch = require('./');
var yargs = require('yargs')
  .alias('p', 'password')
  .describe('p', 'your password')
  .alias('u', 'username')
  .describe('u', 'your username')
  .alias('h', 'help')
  .describe('h', 'this help')
  .version(require('./package.json').version, 'v')
  .alias('v', 'version')
  .usage('\nUsage:\n  $0 [url] [options]')
  .example('$0', 'update couch at http://127.0.0.1:5984')
  .example('$0 http://example.com -u username -p password', 'update with auth');
var argv = yargs.argv;
if (argv.h) {
  yargs.showHelp();
  return process.exit(0);
}

var auth;
if (argv.p && argv.u) {
  auth = argv.u + ':' + argv.p;
}
var url = argv._[0] || 'http://127.0.0.1:5984';
addCorsToCouch(url, auth).then(function () {
  console.log('success');
  process.exit(0);
}).catch(function (err) {
  console.log(err);
  process.exit(1);
});