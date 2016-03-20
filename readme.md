Add CORS to CouchDB [![Build Status](https://travis-ci.org/pouchdb/add-cors-to-couchdb.svg?branch=master)](https://travis-ci.org/pouchdb/add-cors-to-couchdb)
====

#### Summary

CouchDB doesn't come with [CORS](https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) enabled by default. This is a problem for libraries like [PouchDB](http://pouchdb.com), which depend on being able to access CouchDB no matter what URL it's being served from. This script fixes that.

#### Usage

You need to have [Node.js and NPM](https://nodejs.org) installed. Then do:

```
npm install -g add-cors-to-couchdb
add-cors-to-couchdb
```

Or if it is a remote database:

```
add-cors-to-couchdb http://me.iriscouch.com -u myusername -p mypassword
```

##### Ubuntu - special instructions

On Ubuntu the default Node.js library is called `nodejs` instead of `node` due to a naming conflict. To run on Ubuntu, you'll need to do:

```
sudo apt-get install nodejs-legacy
```

#### What it does

This script will simply add some generic CORS configuration to your CouchDB. You could also do it yourself trivially using `curl`:

```bash
HOST=http://adminname:password@localhost:5984 # or whatever you got

curl -X PUT $HOST/_config/httpd/enable_cors -d '"true"'
curl -X PUT $HOST/_config/cors/origins -d '"*"'
curl -X PUT $HOST/_config/cors/credentials -d '"true"'
curl -X PUT $HOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $HOST/_config/cors/headers -d '"accept, authorization, content-type, origin, referer, x-csrf-token"'
```

You can always change the configuration later by simply going to [http://localhost:5984/_utils/config.html](http://localhost:5984/_utils/config.html) and updating the values. However, these default options are good for getting up and running.

#### CouchDB 2.0+ instructions

This modules automatically detects CouchDB 2.0 and should do the right thing. But in case
you need to configure CORS on a per-node basis, do:

```bash
curl -X GET $HOST/_membership
```

to see the list of available nodes, then do e.g.:

```bash
curl -X PUT $HOST/_node/node1@127.0.0.1/_config/httpd/enable_cors -d '"true"'
curl -X PUT $HOST/_node/node1@127.0.0.1/_config/cors/origins -d '"*"'
curl -X PUT $HOST/_node/node1@127.0.0.1/_config/cors/credentials -d '"true"'
curl -X PUT $HOST/_node/node1@127.0.0.1/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $HOST/_node/node1@127.0.0.1/_config/cors/headers -d '"accept, authorization, content-type, origin, referer, x-csrf-token"'
```
