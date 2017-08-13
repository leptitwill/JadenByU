const db = require('../db.js');

exports.getAll = function(result) {
	let s_query=`
		SELECT posts.idPost, title, content, date, users.idUser, users.name, username
		FROM posts
		INNER JOIN users ON posts.idUser = users.idUser`;
	if (this.b_user) {
		s_query += `WHERE posts.idUser = '`+this.i_id_user+`'`;
	}
	s_query += `
		GROUP BY posts.idPost
		ORDER BY posts.date DESC`;
	db.get().query(
		s_query,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.get = function(result) {
	let s_query=`
		SELECT posts.idPost, title, content, date, users.idUser, users.name, username
		FROM posts
		INNER JOIN users ON posts.idUser = users.idUser
		WHERE posts.idPost = '`+this.i_id_post+`'`;
	db.get().query(
		s_query,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.countPost = function(result) {
	db.get().query(
		`SELECT COUNT(idPost) as nbPosts
		FROM posts
		WHERE idUser = '`+this.i_id_user+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.countComment = function(result) {
	db.get().query(
		`SELECT COUNT(idPost) as nbComments
		FROM posts_comments
		WHERE idPost = '`+this.i_id_post+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.getComments = function(result) {
	db.get().query(
		`SELECT *
		FROM posts_comments
		WHERE idPost = '`+this.i_id_post+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}

exports.addComment = function(result) {
	db.get().query(
		`INSERT INTO posts_comments (idPost, idUser, content)
 		VALUES ('`+this.i_id_post+`', '`+this.i_id_user+`', '`+this.s_comment+`')`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
