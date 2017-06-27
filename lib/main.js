'use strict';

const Angband = require('./Angband');

const term = new Angband('term-0');

term.process("term-init 80 24");
term.process("term-text 25 23 22 0 ' [Loading basic pref f'");
term.process("term-text 0 0 22 0 ' [Loading basic pref f'");
