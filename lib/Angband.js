'use strict';

const Term = require('./Term');
const debug = require('./debug');

const actions = {
	'term-init': function init(angband, params) {
		debug('init ' + params)

		const args = params.match(/(\d+) (\d+)/);
		const cols = parseInt(args[1])
		const rows = parseInt(args[2])

		angband.term = new Term(angband.id, cols, rows);
		angband.term.render();
	},

	'term-text': function text(angband, params) {
		debug('text ' + params)

		const args = params.match(/(\d+) (\d+) (\d+) (\d+) '(.*)'/);
		const x = parseInt(args[1])
		const y = parseInt(args[2])
		const len = parseInt(args[3])
		const attr = parseInt(args[4])
		const str = args[5]

		angband.term.write({ x, y, len, attr, str });
		angband.term.render();
	}
};

class Angband {
	constructor(id) {
		this.id = id;
	}

	process(line) {
		// Get the instruction
		let instruction = line.match(/([a-z\-]+)/)[1];
		let params = line.substr(instruction.length + 1);

		// Attempt a vtable lookup
		let fn = actions[instruction];
		if (fn) {
			fn(this, params);
		} else {
			debug('unknown instruction "' + instruction + '"')
		}
	}
}

module.exports = Angband;
