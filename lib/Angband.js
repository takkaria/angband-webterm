'use strict';

const Term = require('./Term');

function debug(line) {
	console.log(line);
	document.getElementById("debug").innerHTML += line + "<br>";
}

class Angband {
	constructor(id) {
		this.id = id;
		this.funcs = {
			'term-init': this.finit
		}
	}

	finit([ cols, rows ]) {
		cols = parseInt(cols)
		rows = parseInt(rows)

		this.term = new Term(this.id, cols, rows);
	}

	tokenise(line) {
		return line.split(' ');
	}

	process(line) {
		// Split the input by spaces so we can find the dispatching instruction
		let tokens = this.tokenise(line);

		// Get the instruction
		let instruction = tokens.shift();

		// Attempt a vtable lookup
		let fn = this.funcs[instruction];
		if (fn) {
			fn.bind(this)(tokens);
		} else {
			debug('unknown instruction "' + instruction + '"')
		}
	}
}

module.exports = Angband;
