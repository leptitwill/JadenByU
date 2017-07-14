// Listes des dépendances
const express    = require('express');
const path       = require('path');
const http       = require('http');
const bodyParser = require('body-parser');

// Listes des routes
const db      = require('./server/db')
const users   = require('./server/routes/users');
const posts   = require('./server/routes/posts');
const news    = require('./server/routes/news');
const friends = require('./server/routes/friends');
const chat    = require('./server/routes/chat');
const album   = require('./server/routes/album');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/news', news);
app.use('/api/friends', friends);
app.use('/api/chat', chat);
app.use('/api/album', album);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '3000';
app.set('port', port);

/**
* Create HTTP server.
*/
const server = http.createServer(app);

/**
* Connect to MySQL on start
*/
db.connect(db, function(err) {
	if (err) {
		console.log('Unable to connect to MySQL.')
		process.exit(1)
	} else {
		server.listen(port, function() {
			console.log('Listening on port 3000...')
		})
	}
})
