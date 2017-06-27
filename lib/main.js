'use strict';

const Angband = require('./Angband');
const debug = require('./debug');

const term = new Angband('term-0');

const socket = new WebSocket('ws://127.0.0.1:3000/game');

socket.addEventListener('open', function (event) {
	debug('connection opened');
});

socket.addEventListener('close', function (event) {
	debug('connection closed');
});

socket.addEventListener('message', msg => {
	let msgs = msg.data.toString().split('\n');
	for (let msg of msgs) {
		if (msg) {
			term.process(msg);
		}
	}
});

let elems = document.querySelectorAll('.input')

for (let button of elems) {
	button.addEventListener('click', function(event) {
		console.log(event);
		socket.send('keypress ' + event.target.dataset.input + '\n');
	});
}
