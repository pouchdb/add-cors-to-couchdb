'use strict';
var url = require('url');
var transports = {};
transports.https = require('https');
transports.http = require('http');
module.exports = addCors;
function addCors(inurl, auth, callback) {
  if (typeof auth === 'function') {
    callback = auth;
    auth = void 0;
  }

  var len = todo.length;
  var errored = false;
  function cb(err, resp) {
    if (errored) {
      return;
    }
    if (err) {
      errored = true;
      return callback(err);
    }
    len--;
    if (!len) {
      callback();
    }
  }
  todo.forEach(function (item) {
    var opts = url.parse(inurl + item.path);
    if (auth) {
      opts.auth = auth;
    }
    send(opts, item.value, cb);
  });
}
function formatProtocol(protocol) {
  if (protocol.slice(-1) === ':') {
    protocol = protocol.slice(0, -1);
  }
  return protocol.toLowerCase();
}
function send(opts, data, callback) {
  opts.method = 'PUT';
  var req = transports[formatProtocol(opts.protocol)].request(opts, function(res) {
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
  req.write(data);
  req.end();
}
var todo = [
  {
    path: '/_config/httpd/enable_cors',
    value: '"true"'
  },
  {
    path: '/_config/cors/origins',
    value: '"*"'
  },
  {
    path: '/_config/cors/credentials',
    value: '"true"'
  },
  {
    path: '/_config/cors/methods',
    value: '"GET, PUT, POST, HEAD, DELETE"'
  },
  {
    path: '/_config/cors/headers',
    value: '"accept, authorization, content-type, origin, referer, x-csrf-token"'
  }
];
