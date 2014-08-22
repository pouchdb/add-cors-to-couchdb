add cors to couchdb
====

#### Summary

CouchDB doesn't come with [CORS](https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) enabled by default. This is a problem for libraries like [PouchDB](http://pouchdb.com), which depend on being able to access CouchDB no matter what URL it's being served from.

This script fixes that.

#### Usage

```
npm install -g add-cors-to-couchdb
add-cors-to-couchdb
```

or if it is a remote database:

```
add-cors-to-couchdb http://me.iriscouch.com -u myusername -p mypassword
```

#### What it does

This script will simply add the following configuration to your CouchDB:

```js
[
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
    value: '"accept, authorization, content-type, origin, referer"'
  }
]
```

You can always change the configuration later by simply going to [http://localhost:5984/_config](http://localhost:5984/_config) and updating the values. However, these default options are good for getting up and running.
