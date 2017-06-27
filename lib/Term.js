'use strict';

const Sequence =
	n =>
		Array(n).keys()

const Cell =
	(row, col) =>
		`<span class="cell" id="c-${row}-${col}">x</span>`;

const Row =
	(row, cols) =>
		`<div class="row row-${row}">
			${[...Sequence(cols)].map(col => Cell(row, col)).join('')}
		</div>`

const Grid =
	(rows, cols) =>
		[...Sequence(rows)].map(row => Row(row, cols)).join('')


class Term {
	constructor(id, cols, rows) {
		this.id = id;
		this.rows = rows;
		this.cols = cols;
		this.elem = document.getElementById(id);

		this.elem.innerHTML = `<div class="term">${Grid(rows, cols)}</div>`;
	}
}

module.exports = Term;
