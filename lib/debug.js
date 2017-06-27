'use strict';

function debug(line) {
	console.log(line);
	document.getElementById("debug").innerHTML += line + "<br>";
}

module.exports = debug;
