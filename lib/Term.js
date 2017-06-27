'use strict';

const debug = require('./debug');

const snabbdom = require('snabbdom');
const patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
]);
const h = require('snabbdom/h').default; // helper function for creating vnodes

// Display an individual cell.
// XXX Just monochrome at the moment.
const Cell =
	(cell) => h('span.cell', {}, cell);

// Display a row.
// This is made up of cells.
const Row =
	(index, cells) =>
		h(`div.row`,
			{},
			cells.map(cell => Cell(cell))
		);

// Turn a terminal structure into a virtual DOM
// Suitable for use by snabbdom.
const TermToVDOM =
	term =>
		h('div.term',
			{},
			term.map((cells, index) => Row(index, cells))
		);

class Term {
	constructor(id, cols, rows) {
		this.id = id;
		this.rows = rows;
		this.cols = cols;
		this.elem = document.getElementById(id);

		debug('hi');

		// Generate the array of cells
		this.term = [];
		for (let row = 0; row < this.rows; row++) {
			this.term[row] = [];
			for (let col = 0; col < this.cols; col++) {
				this.term[row][col] = 'x';
			}
		}

		console.log(this.term);
	}

	render() {
		patch(this.elem, TermToVDOM(this.term));
	}
}

module.exports = Term;
