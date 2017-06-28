const mysql = require('mysql')
const async = require('async')

const state = {
	pool: null,
	mode: null,
}

exports.connect = function(mode, done) {
	state.pool = mysql.createPool({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'JadenByU'
	})

	state.mode = mode
	done()
}

exports.get = function() {
	return state.pool
}

exports.fixtures = function(data) {
	let pool = state.pool
	if (!pool) return done(new Error('Missing database connection.'))

	let names = Object.keys(data.tables)
	async.each(names, function(name, cb) {
		async.each(data.tables[name], function(row, cb) {
			let keys = Object.keys(row)
			, values = keys.map(function(key) { return "'" + row[key] + "'" })

			pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
		}, cb)
	}, done)
}

exports.drop = function(tables, done) {
	let pool = state.pool
	if (!pool) return done(new Error('Missing database connection.'))

	async.each(tables, function(name, cb) {
		pool.query('DELETE * FROM ' + name, cb)
	}, done)
}
