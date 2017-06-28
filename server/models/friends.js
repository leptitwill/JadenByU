const db = require('../db.js');

exports.getAll = function(result) {
	let query = `
		SELECT users.idUser, users.name, users.username, users_friends.idFriend, users_friends.date
		FROM users
		LEFT JOIN users_friends ON users_friends.idFriend = users.idUser`;
	if (this.b_friend) {
		query += `
		WHERE users_friends.idUser = '`+this.i_id_user+`'
		ORDER BY users_friends.date DESC`;
	}
	else {
		query += `
		WHERE users_friends.idUser != '`+this.i_id_user+`'
		OR users_friends.idUser IS NULL
		AND users.idUser != '`+this.i_id_user+`'
		ORDER BY rand()
		LIMIT 5`;
	}
	db.get().query(
		query,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.add = function(result) {
	db.get().query(
		`INSERT INTO users_friends (idUser, idFriend) VALUES ('`+this.i_id_user+`', '`+this.i_id_friend+`')`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.delete = function(result) {
	db.get().query(
		`DELETE FROM users_friends
		WHERE users_friends.idUser = '`+this.i_id_user+`'
		AND users_friends.idFriend = '`+this.i_id_friend+`'
		`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
