'use strict';

const debug = require('./debug');

let colours = [];

const DEFAULT = '#fff';

const padZero = num => (num < 16 ? '0' : '')
const toHex =   num => padZero(num) + num.toString(16)

function setColour(i, r, g, b) {
	colours[i] = { r, g, b };
}

function getCSSColour(i) {
	if (colours[i]) {
		const c = colours[i]
		return '#' + toHex(c.r) + toHex(c.g) + toHex(c.b);
	} else {
		return '';
	}
}

module.exports = {
	setColour: setColour,
	getCSSColour: getCSSColour
};
