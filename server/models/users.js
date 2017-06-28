const db = require('../db.js');

exports.getAll = function(result) {
	db.get().query('SELECT * FROM users', function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.get = function(result) {
	db.get().query(
		`SELECT *
		FROM users
		WHERE idUser = `+this.i_id_user,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
