const db = require('../db.js');

exports.getAll = function(result) {
	db.get().query('SELECT * FROM users', function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.get = function(result) {
	db.get().query(
	`SELECT users.idUser, users.name, users.username, users.description, users.tag, users_friends.idFriend
	FROM users
	LEFT JOIN users_friends ON users_friends.idUser = '`+this.i_id_actual_user+`'
	AND users_friends.idFriend = '`+this.i_id_user+`'
	WHERE users.idUser = '`+this.i_id_user+`'`,
	function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
