'use strict';
var url = require('url');
var https = require('https');
module.exports = addCors;
function addCors(url) {

}

function send(url, data, callback) {
  var opts = url.parse(url);
  opts.method = 'PUT';
  var req = https.request(opts, function(res) {
    var output = '';
    if (res.statusCode !== 200) {
      callback(new Error('got a ' + res.statusCode + ' code'));
      res.on('data', function () {});
      return;
    }
    res.on('data', function (chunk) {
      output += chunk.toString();
    }).on('error', callback).on('end', function () {
      callback(null, output);
    });
  });
}