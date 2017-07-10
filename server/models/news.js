const db = require('../db.js');

exports.getAll = function(result) {
	db.get().query(
		`SELECT news.idNew, news.content, news.date, users.idUser, users.name, users.username, GROUP_CONCAT(tags.name SEPARATOR ",") AS tags
		FROM news
		INNER JOIN users ON users.idUser = news.idUser
		LEFT JOIN news_tags ON news.idNew = news_tags.idNew
		LEFT JOIN tags ON news_tags.idTag = tags.idTag`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
