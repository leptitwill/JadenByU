const db = require('../db.js');

exports.getIdChat = function(result) {
	db.get().query(
		`SELECT idChat
		FROM chat
		WHERE idUser = '`+this.i_id_user+`' AND idFriend = '`+this.i_id_friend+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.get = function(result) {
	db.get().query(
		`SELECT *
		FROM chat_message
		WHERE idChat = '`+this.i_id_chat+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.send = function(result) {
	db.get().query(
		`INSERT INTO chat_message (idChat, idUser, content)
 		VALUES ('`+this.i_id_chat+`', '`+this.i_id_user+`', '`+this.s_message+`')`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
