const db = require('../db.js');

exports.get = function(result) {
	let s_query = `SELECT news.idNew, news.title, news.content, news.date, users.idUser, users.name, users.username, users.isAdmin,
	GROUP_CONCAT(tags.name SEPARATOR ",") AS tags
	FROM news
	INNER JOIN users ON users.idUser = news.idUser
	LEFT JOIN news_tags ON news.idNew = news_tags.idNew
	LEFT JOIN tags ON news_tags.idTag = tags.idTag`;
	if (this.i_id_new) {
		s_query += ` WHERE news.idNew = '`+this.i_id_new+`'`;
	}
	s_query += ` GROUP BY news.idNew`;
	db.get().query(
		s_query,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.getLikes = function(result) {
	db.get().query(
		`SELECT COUNT(news_likes.idNew) as nbLikes
		FROM news_likes
		WHERE idNew = '`+this.i_id_new+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.getViews = function(result) {
	db.get().query(
		`SELECT COUNT(news_views.idNew) as nbViews
		FROM news_views
		WHERE idNew = '`+this.i_id_new+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.getComments = function(result) {
	db.get().query(
		`SELECT *
		FROM news_comments
		WHERE idNew = '`+this.i_id_new+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
