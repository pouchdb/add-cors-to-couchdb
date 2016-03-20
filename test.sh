#!/usr/bin/env bash

# run wget https://raw.github.com/lehmannro/assert.sh/v1.1/assert.sh
# to get this

. assert.sh

# CouchDB 1

assert "./bin.js http://127.0.0.1:3000" "success"
assert "curl http://127.0.0.1:3000/_config/cors/credentials" '"true"'
assert "curl http://127.0.0.1:3000/_config/cors/origins" '"*"'

# CouchDB 2

assert "./bin.js http://127.0.0.1:3001" "success"
assert "curl http://127.0.0.1:3001/_node/node1@127.0.0.1/_config/cors/credentials" '"true"'
assert "curl http://127.0.0.1:3001/_node/node1@127.0.0.1/_config/cors/origins" '"*"'

assert_end suite