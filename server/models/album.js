const db = require('../db.js');

exports.getAll = function(result) {
	let s_query = `SELECT pictures.idPicture, users.idUser, tags_boxs.name as tag_box, tags_sizes.name as tag_size
	FROM pictures
	INNER JOIN users ON users.idUser = pictures.idUser
	INNER JOIN tags_boxs ON tags_boxs.idTagBox = pictures.idTagBox
	INNER JOIN tags_sizes ON tags_sizes.idTagSize = pictures.idTagSize`;
	if (this.i_id_user) {
		s_query += ` WHERE pictures.idUser = '`+this.i_id_user+`'`;
	}
	db.get().query(
		s_query,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
