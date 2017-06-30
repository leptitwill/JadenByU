const db = require('../db.js');

exports.getAll = function(result) {
	let s_query=`
		SELECT posts.idPost, content, date, users.idUser, users.name, username, posts.picture, posts_likes.idPost AS 'like',
		GROUP_CONCAT(tags.name SEPARATOR ",") AS tags
		FROM posts
		INNER JOIN users ON posts.idUser = users.idUser
		LEFT JOIN posts_tags ON posts.idPost = posts_tags.idPost
		LEFT JOIN tags ON posts_tags.idTag = tags.idTag
		LEFT JOIN posts_likes ON (posts.idPost = posts_likes.idPost AND '`+this.i_id_user+`' = posts_likes.idUser)`;
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

exports.countLike = function(result) {
	db.get().query(
		`SELECT COUNT(idPost) as nbLikes
		FROM posts_likes
		WHERE idUser = '`+this.i_id_user+`'`,
		function (err, rows) {
		if (err) return result(err);
		return result(rows);
	})
}
