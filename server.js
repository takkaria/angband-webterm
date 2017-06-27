#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const cwd = '/Users/takkaria/Projects/angband';
const executable = '/Users/takkaria/Projects/angband/angband';

const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

// Set up a static server for files
app.use(express.static(path.join(__dirname, 'public')));

// Add a dynamic WebSocket for the game
app.ws('/game', function(ws, req) {
	const game = spawn(executable, { cwd });
	const { stdout, stdin } = game;

	console.log('new game started');

	stdout.on('data', data => {
		console.log('--- ' + data.toString());
		ws.send(data.toString(), function(err) {
			if (err) {
				console.log('Problem sending: ');
				console.error(err);
			}
		});
 	});

	ws.on('message', data => {
		console.log('+++ ' + data.toString());
		stdin.write(data.toString());
	});

	ws.on('close', () => {
		game.kill();
	})
});

// Add an error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		message: err.message,
		error: err
	});
});

// Start up the app
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on:');
  console.log(`  http://127.0.0.1:${app.get('port')}/`);
});
