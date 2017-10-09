#!/usr/bin/env node

const server = require('../src/server')

const ARGV = process.argv
const filename = ARGV[2]

let port = 8080
let host = '0.0.0.0'

for(let i = 3; i < ARGV.length; i++) {
	if( ARGV[i] === '-p' || ARGV[i] === '--port' )
		port = parseInt(ARGV[++i])
	else if( ARGV[i] === '-h' || ARGV[i] === '--host' )
		host = ARGV[++i]
}

server.startServer(filename, port, host)
