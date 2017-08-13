const db = require('../db.js');

exports.get = function(result) {
	let s_query = `SELECT news.idNew, news.title, news.content, news.date, users.idUser, users.name, users.username, users.isAdmin, news_likes.idNew AS 'like', news_views.idNew AS 'view',
	GROUP_CONCAT(tags.name SEPARATOR ",") AS tags
	FROM news
	INNER JOIN users ON users.idUser = news.idUser
	LEFT JOIN news_tags ON news.idNew = news_tags.idNew
	LEFT JOIN tags ON news_tags.idTag = tags.idTag
	LEFT JOIN news_likes ON (news.idNew = news_likes.idNew AND '`+this.i_id_user+`' = news_likes.idUser)
	LEFT JOIN news_views ON (news.idNew = news_views.idNew AND '`+this.i_id_user+`' = news_views.idUser)`;
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
		WHERE idNew = '`+this.i_id_new+`'
		ORDER BY date DESC`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.addLike = function(result) {
	db.get().query(
		`INSERT INTO news_likes (idNew, idUser) VALUES ('`+this.i_id_new+`', '`+this.i_id_user+`')`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.addView = function(result) {
	db.get().query(
		`INSERT INTO news_views (idNew, idUser) VALUES ('`+this.i_id_new+`', '`+this.i_id_user+`')`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.addComment = function(result) {
	db.get().query(
		`INSERT INTO news_comments (idNew, idUser, content)
 		VALUES ('`+this.i_id_new+`', '`+this.i_id_user+`', '`+this.s_comment+`')`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
